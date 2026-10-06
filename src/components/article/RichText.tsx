import type { RichText as RichTextValue } from './types';

export default function RichText({ value }: { value: RichTextValue }) {
  if (typeof value === 'string') return value;
  return value.map((run, i) =>
    typeof run === 'string' ? run : <strong key={i}>{run.bold}</strong>,
  );
}
