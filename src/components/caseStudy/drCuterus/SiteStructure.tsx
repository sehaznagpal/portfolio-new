import captionStyles from './ImageSet.module.css';
import styles from './SiteStructure.module.css';

export interface SiteStructureData {
  pages: { name: string; sections: string[] }[];
  cut: { name: string; label: string };
  caption: string;
}

/* The site map as markup, in the style of the dissertation's Research
   Structure chart: each page heads a column of its sections, and the page
   that was cut sits beside them, struck through. */
export default function SiteStructure({ pages, cut, caption }: SiteStructureData) {
  return (
    <figure className={styles.chart}>
      <div className={styles.pages}>
        {pages.map((page) => (
          <ol key={page.name} className={styles.page} aria-label={page.name}>
            <li className={`${styles.node} ${styles.pageNode}`}>{page.name}</li>
            {page.sections.map((section) => (
              <li key={section} className={styles.node}>
                {section}
              </li>
            ))}
          </ol>
        ))}
      </div>

      <div className={styles.cut}>
        <p className={`${styles.node} ${styles.cutNode}`}>
          <del>{cut.name}</del>
        </p>
        <p className={styles.cutLabel}>{cut.label}</p>
      </div>

      <figcaption className={captionStyles.caption}>{caption}</figcaption>
    </figure>
  );
}
