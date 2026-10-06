import styles from './ResearchStructure.module.css';

const DIMENSIONS = ['Literacy Access', 'Typological Fit', 'Authority Dynamics', 'Linguistic Reach'];

/* Visual 1: how the dissertation splits into two branches. The experiment
   branch (this case study) is highlighted; the case study analysis is muted. */
export default function ResearchStructure() {
  return (
    <div className={styles.chart}>
      <div className={`${styles.node} ${styles.anchor}`}>
        <span className={styles.kicker}>Research question</span>
        Do international anti-fraud designs transfer to India?
      </div>

      <div className={styles.branches}>
        <ol className={`${styles.branch} ${styles.muted}`}>
          <li className={styles.node}>Case study analysis</li>
          <li className={styles.node}>6 international cases</li>
          <li className={styles.node}>
            4 dimensions
            <ul className={styles.dimensions}>
              {DIMENSIONS.map((dimension) => (
                <li key={dimension}>{dimension}</li>
              ))}
            </ul>
          </li>
        </ol>

        <div className={styles.highlightWrap}>
          <p className={styles.badge}>This case study</p>
          <ol className={`${styles.branch} ${styles.highlight}`}>
            <li className={styles.node}>Experiment</li>
            <li className={styles.node}>116 participants</li>
            <li className={styles.node}>3 designs × 3 fraud types</li>
          </ol>
        </div>
      </div>

      <div className={`${styles.node} ${styles.anchor}`}>Findings and implications</div>
    </div>
  );
}
