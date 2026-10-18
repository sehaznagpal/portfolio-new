import type { ReactNode } from 'react';
import Body from './Body';
import Callout from './Callout';
import ComparisonTable from './ComparisonTable';
import DecisionCards from './DecisionCard';
import DotGrid from './DotGrid';
import Eyebrow from './Eyebrow';
import FindingRows from './FindingRow';
import HighlightLine from './HighlightLine';
import InfoCard from './InfoCard';
import InsightCards from './InsightCard';
import JourneyCompare from './JourneyCompare';
import MiniCards from './MiniCards';
import Note from './Note';
import NumberedStep from './NumberedStep';
import OptionsCompare from './OptionsCompare';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import ScopeList from './ScopeList';
import StatBlock from './StatBlock';
import Swatches from './Swatches';
import type { StoryBlock, StorySectionData } from './types';
import VisualFrame from './VisualFrame';
import styles from './StorySection.module.css';

interface Visuals {
  /* Big visual ids (in VisualFrames) to their components. */
  frames: Record<string, ReactNode>;
  /* Mini illustration ids to their components. */
  minis: Record<string, ReactNode>;
}

function Block({ block, visuals }: { block: StoryBlock; visuals: Visuals }) {
  switch (block.type) {
    case 'body':
      return <Body paragraphs={block.paragraphs} />;
    case 'infoCard':
      return <InfoCard items={block.items} />;
    case 'callout':
      return <Callout icon={block.icon} label={block.label} text={block.text} />;
    case 'stats':
      return <StatBlock stats={block.stats} bars={block.bars} />;
    case 'dotGrid':
      return <DotGrid groups={block.groups} />;
    case 'insights':
      return <InsightCards label={block.label} cards={block.cards} minis={visuals.minis} compact={block.compact} />;
    case 'comparison':
      return <ComparisonTable table={block.table} caption={block.caption} />;
    case 'journey':
      return <JourneyCompare journeys={block.journeys} caption={block.caption} />;
    case 'decisions':
      return <DecisionCards label={block.label} items={block.items} minis={visuals.minis} />;
    case 'options':
      return <OptionsCompare items={block.items} minis={visuals.minis} />;
    case 'scope':
      return <ScopeList inScope={block.inScope} outOfScope={block.outOfScope} />;
    case 'swatches':
      return <Swatches swatches={block.swatches} caption={block.caption} />;
    case 'miniCards':
      return <MiniCards cards={block.cards} minis={visuals.minis} />;
    case 'illustration':
      return (
        <Reveal>
          <figure className={styles.illustration} aria-label={block.label}>
            {visuals.minis[block.id]}
          </figure>
        </Reveal>
      );
    case 'step':
      return (
        <NumberedStep number={block.number} title={block.title} text={block.text}>
          {block.blocks?.map((child, i) => <Block key={i} block={child} visuals={visuals} />)}
        </NumberedStep>
      );
    case 'list':
      return (
        <ol className={styles.list}>
          {block.items.map((item, i) => (
            <li key={item.title} className={styles.listItem}>
              <span className={styles.listNumber} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className={styles.listText}>
                <strong className={styles.listTitle}>{item.title}</strong> {item.text}
              </p>
            </li>
          ))}
        </ol>
      );
    case 'note':
      return <Note lead={block.lead} text={block.text} />;
    case 'highlight':
      return <HighlightLine text={block.text} />;
    case 'findings':
      return <FindingRows label={block.label} items={block.items} />;
    case 'subsection':
      return (
        <div className={styles.subsection}>
          <h3 className={styles.subheading}>{block.title}</h3>
          <Body paragraphs={block.paragraphs} />
        </div>
      );
    case 'footnote':
      return <p className={styles.footnote}>{block.text}</p>;
    case 'frame':
      return (
        <VisualFrame title={block.title} caption={block.caption}>
          {visuals.frames[block.id]}
        </VisualFrame>
      );
  }
}

/* One section of a story case study, in the centred column. Spacing comes
   only from gaps: the lead (eyebrow, heading and an opening paragraph
   group) is tight, and every block after it sits --space-md apart. */
export default function StorySection({ section, visuals }: { section: StorySectionData; visuals: Visuals }) {
  const headingId = `${section.id}-heading`;
  const [first, ...rest] = section.blocks;
  const opensWithBody = first?.type === 'body';
  const blocks = opensWithBody ? rest : section.blocks;

  return (
    <section id={section.id} className={styles.section} aria-labelledby={headingId}>
      <div className={styles.lead}>
        <header className={styles.header}>
          <Eyebrow>{section.eyebrow}</Eyebrow>
          {section.heading ? (
            <SectionHeading id={headingId}>{section.heading}</SectionHeading>
          ) : (
            <h2 id={headingId} className={styles.visuallyHidden}>
              {section.eyebrow}
            </h2>
          )}
        </header>
        {opensWithBody && <Block block={first} visuals={visuals} />}
      </div>

      {blocks.map((block, i) => (
        <Block key={i} block={block} visuals={visuals} />
      ))}
    </section>
  );
}
