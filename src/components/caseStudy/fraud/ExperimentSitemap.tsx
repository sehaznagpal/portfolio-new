import styles from './ExperimentSitemap.module.css';

const GROUPS = [
  { label: 'Control Group', tone: styles.groupControl },
  { label: 'Warning Group', tone: styles.groupWarning },
  { label: 'CTA Group', tone: styles.groupCta },
];

const SCENARIOS = [
  { bias: 'Authority Bias', detail: 'Fake "Delhi Traffic Police" SMS demanding immediate fine' },
  { bias: 'Urgency Bias', detail: 'Unknown number requesting urgent transfer' },
  { bias: 'Social Proof Bias', detail: 'Instagram listing with glowing comments + countdown' },
];

/* Visual 2: the participant's path through the experiment, from landing on
   the study link to the final dataset, including the per-scenario loop. */
export default function ExperimentSitemap() {
  return (
    <div className={styles.flow}>
      <div className={styles.node}>Participant Lands on Study Link</div>
      <div className={styles.connector} />
      <div className={styles.node}>Instructions + Consent Page</div>
      <div className={styles.connector} />
      <div className={`${styles.node} ${styles.nodeAccent}`}>
        Random Group Assignment
        <span className={styles.note}>(backend JS randomisation, undisclosed to participant)</span>
      </div>

      <div className={styles.split}>
        {GROUPS.map((group) => (
          <div key={group.label} className={`${styles.groupNode} ${group.tone}`}>
            {group.label}
          </div>
        ))}
      </div>
      <div className={styles.connector} />

      <div className={styles.loopRegion}>
        <div className={styles.subgraph}>
          <p className={styles.subgraphLabel}>Scenario Sequence (order randomised per participant)</p>
          <div className={styles.scenarioRow}>
            {SCENARIOS.map((scenario) => (
              <div key={scenario.bias} className={styles.scenarioNode}>
                Scenario: {scenario.bias}
                <span className={styles.note}>{scenario.detail}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.connector} />
        <div className={`${styles.node} ${styles.nodeAccent}`}>
          Payment Decision per Scenario
          <span className={styles.note}>(Cancel / Proceed)</span>
        </div>
        <div className={styles.connector} />
        <div className={`${styles.node} ${styles.nodeAccent}`}>
          Post-Scenario Confidence Rating
          <span className={styles.note}>(1 to 5 Likert scale)</span>
        </div>
        <div className={styles.connector} />
        <div className={styles.diamond}>
          <span className={styles.diamondText}>All 3 scenarios completed?</span>
        </div>

        <div className={styles.loopLine} aria-hidden="true" />
      </div>

      <p className={styles.branchLabel}>No: next scenario, loops back to the scenario sequence</p>
      <p className={styles.branchLabel}>Yes ↓</p>
      <div className={styles.connector} />

      <div className={styles.node}>Post-Experiment Survey (UPI usage habits)</div>
      <div className={styles.connector} />
      <div className={styles.node}>Data Logged to Google Sheets via Apps Script Backend</div>
      <div className={styles.connector} />
      <div className={styles.node}>
        Session Validity Check
        <span className={styles.note}>(exclude &lt;30s completions, incomplete sessions, duplicate entries)</span>
      </div>
      <div className={styles.connector} />
      <div className={`${styles.node} ${styles.nodeFinal}`}>
        Final Dataset
        <span className={styles.note}>N = 116 participants, 348 scenario-level observations</span>
      </div>
    </div>
  );
}
