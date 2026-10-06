import ResultsChart, { type BarGroup } from './ResultsChart';
import styles from './ResultsGraphs.module.css';

/* Values match the tables in section 04 of the fraud article. */
const BY_GROUP: BarGroup[] = [
  {
    bars: [
      { label: 'Control', value: 36.4, tone: 'control' },
      { label: 'Warning', value: 47.2, tone: 'warning' },
      { label: 'CTA', value: 68.5, tone: 'cta' },
    ],
  },
];

function biasGroup(label: string, control: number, warning: number, cta: number): BarGroup {
  return {
    label,
    bars: [
      { label: 'Control', value: control, tone: 'control' },
      { label: 'Warning', value: warning, tone: 'warning' },
      { label: 'CTA', value: cta, tone: 'cta' },
    ],
  };
}

const BY_BIAS: BarGroup[] = [
  biasGroup('Authority', 40.9, 52.8, 77.8),
  biasGroup('Urgency', 31.8, 52.8, 75.0),
  biasGroup('Social proof', 36.4, 36.1, 52.8),
];

/* Visuals 4 and 5; the bias breakdown gets the larger share of the band. */
export default function ResultsGraphs() {
  return (
    <div className={styles.grid}>
      <ResultsChart
        title="Cancellation rate by treatment group"
        groups={BY_GROUP}
        interpretation="People who saw the cancel button (CTA) stopped the fraudulent payment far more often than people who got a warning or nothing at all. The warning barely did better than doing nothing."
      />
      <ResultsChart
        title="Cancellation rate by treatment group and bias type"
        groups={BY_BIAS}
        interpretation="The cancel button worked really well against authority and urgency scams, nearly doubling how often people stopped the payment. But against social proof scams, like fake reviews and countdown offers, it barely helped."
      />
    </div>
  );
}
