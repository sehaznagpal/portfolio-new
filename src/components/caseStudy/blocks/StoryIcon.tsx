import { Compass, Crosshair, Gauge, Hand, Scale, type LucideIcon } from 'lucide-react';
import type { StoryIcon as StoryIconName } from './types';

const ICONS: Record<StoryIconName, LucideIcon> = {
  compass: Compass,
  hand: Hand,
  crosshair: Crosshair,
  gauge: Gauge,
  scale: Scale,
};

/* A small line icon for callouts and cards, in the current text colour. */
export default function StoryIcon({ name, className }: { name: StoryIconName; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} size={22} strokeWidth={1.6} aria-hidden="true" />;
}
