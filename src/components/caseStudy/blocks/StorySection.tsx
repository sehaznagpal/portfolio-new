import type { ReactNode } from 'react';
import VisualBand from '../../article/VisualBand';
import Body from './Body';
import Callout from './Callout';
import DotGrid from './DotGrid';
import Eyebrow from './Eyebrow';
import FindingRows from './FindingRow';
import HighlightLine from './HighlightLine';
import InfoCard from './InfoCard';
import InsightCards from './InsightCard';
import MiniCards from './MiniCards';
import Note from './Note';
import NumberedStep from './NumberedStep';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import StatBlock from './StatBlock';
import type { StoryBlock, StorySectionData } from './types';
import styles from './StorySection.module.css';

interface Visuals {
  /* Visual band ids to their components. */
  bands: Record<string, ReactNode>;
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
      return <InsightCards label={block.label} cards={block.cards} minis={visuals.minis} />;
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
    case 'band':
      return null;
  }
}

/* One section of a story case study: its eyebrow and takeaway heading,
   then its blocks in the centred column. Visual bands sit between them at
   their own width, like the article layout's. */
export default function StorySection({ section, visuals }: { section: StorySectionData; visuals: Visuals }) {
  const headingId = `${section.id}-heading`;

  return (
    <section id={section.id} className={styles.section} aria-labelledby={headingId}>
      <header className={`${styles.column} ${styles.header}`}>
        <Eyebrow>{section.eyebrow}</Eyebrow>
        {section.heading ? (
          <SectionHeading id={headingId}>{section.heading}</SectionHeading>
        ) : (
          <h2 id={headingId} className={styles.visuallyHidden}>
            {section.eyebrow}
          </h2>
        )}
      </header>

      {section.blocks.map((block, i) =>
        block.type === 'band' ? (
          <VisualBand key={i} heading={block.heading} tone={block.tone} caption={block.caption}>
            {visuals.bands[block.id]}
          </VisualBand>
        ) : (
          <div key={i} className={styles.column}>
            <Block block={block} visuals={visuals} />
          </div>
        ),
      )}
    </section>
  );
}
