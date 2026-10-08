import type { ReactNode } from 'react';
import DataTable from './DataTable';
import PullQuote from './PullQuote';
import RichText from './RichText';
import VisualBand from './VisualBand';
import type { ArticleSectionData, ContentBlock } from './types';
import styles from './ArticleSection.module.css';

function Content({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className={styles.paragraph}>
          <RichText value={block.text} />
        </p>
      );
    case 'list':
      return (
        <ul className={styles.list}>
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText value={item} />
            </li>
          ))}
        </ul>
      );
    case 'table':
      return <DataTable label={block.label} columns={block.columns} rows={block.rows} />;
  }
}

/* One numbered article section. Each paragraph group is its own grid row,
   so its pull quote always lines up with the top of the group it
   introduces. A section with no pull quotes at all drops the quote column
   and runs its body the full width of the article column. Visual bands
   break out to full width between groups; `visuals` maps each band's id to
   the component that fills its box. */
export default function ArticleSection({
  section,
  visuals = {},
}: {
  section: ArticleSectionData;
  visuals?: Record<string, ReactNode>;
}) {
  const headingId = `section-${section.number}`;
  const hasQuotes = section.blocks.some((block) => block.type === 'group' && block.quote);

  return (
    <section className={styles.section} aria-labelledby={headingId} data-quotes={hasQuotes}>
      <h2 id={headingId} className={`${styles.column} ${styles.title}`}>
        {section.number} {section.title}
      </h2>

      {section.blocks.map((block, i) =>
        block.type === 'visual' ? (
          <VisualBand key={i} heading={block.heading} tone={block.tone}>
            {visuals[block.id]}
          </VisualBand>
        ) : (
          <div key={i} className={`${styles.column} ${styles.group}`}>
            {block.quote && (
              <div className={styles.quote}>
                <PullQuote text={block.quote} />
              </div>
            )}
            <div className={styles.body}>
              {block.content.map((content, j) => (
                <Content key={j} block={content} />
              ))}
            </div>
          </div>
        ),
      )}
    </section>
  );
}
