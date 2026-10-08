import type { RichText as RichTextValue } from './types';

export default function RichText({ value }: { value: RichTextValue }) {
  if (typeof value === 'string') return value;
  return value.map((run, i) => {
    if (typeof run === 'string') return run;
    return 'bold' in run ? <strong key={i}>{run.bold}</strong> : <em key={i}>{run.italic}</em>;
  });
}
