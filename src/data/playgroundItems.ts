import { LINKS } from './links';
import photobooth from '../assets/images/playground/thumbs/photobooth.webp';
import motion from '../assets/images/playground/thumbs/motion.webp';
import rewired from '../assets/images/playground/thumbs/rewired.webp';
import sip from '../assets/images/playground/thumbs/sip.webp';
import extras from '../assets/images/playground/thumbs/extras.webp';
import amora from '../assets/images/playground/thumbs/amora.webp';
import worktape from '../assets/images/playground/thumbs/worktape.webp';
import me from '../assets/images/playground/me.webp';

export type PlaygroundModalId = 'photobooth' | 'motionDemo' | 'sipStudio' | 'extras' | 'worktape';
export type PlaygroundAction = { modal: PlaygroundModalId } | { href: string };
/* Text cards that render their own content in place of a thumbnail. */
export type PlaygroundNote = 'intro' | 'letter' | 'contact';

export interface PlaygroundItem {
  id: string;
  title: string;
  /* Shown in the caption: "title · type". */
  type: string;
  year?: number;
  thumbnail?: { src: string; width: number; height: number };
  action?: PlaygroundAction;
  note?: PlaygroundNote;
  /* Centre of the item on the canvas world, in px. Unpinned items are
     auto-placed in `order` (see placeItems). */
  pinned?: { x: number; y: number };
  order: number;
}

/* The one list both the canvas and the grid render. Adding, removing or
   reordering an item is an edit here only. */
const ITEMS: PlaygroundItem[] = [
  { id: 'intro', title: 'More from my Drafts', type: 'note', note: 'intro', pinned: { x: 2160, y: 1350 }, order: 0 },
  {
    id: 'photobooth',
    title: 'Photobooth',
    type: 'app',
    thumbnail: { src: photobooth, width: 735, height: 518 },
    action: { modal: 'photobooth' },
    order: 1,
  },
  {
    id: 'motion',
    title: 'Motion Graphic Demo',
    type: 'motion',
    thumbnail: { src: motion, width: 562, height: 529 },
    action: { modal: 'motionDemo' },
    order: 2,
  },
  {
    id: 'rewired',
    title: 're-wired website',
    type: 'website',
    thumbnail: { src: rewired, width: 545, height: 546 },
    action: { href: LINKS.rewired },
    order: 3,
  },
  {
    id: 'sip',
    title: 'SiP Studio',
    type: 'branding',
    thumbnail: { src: sip, width: 592, height: 576 },
    action: { modal: 'sipStudio' },
    order: 4,
  },
  {
    id: 'extras',
    title: 'Extras',
    type: 'illustration',
    thumbnail: { src: extras, width: 609, height: 722 },
    action: { modal: 'extras' },
    order: 5,
  },
  {
    id: 'amora',
    title: 'Website for Virtual Try-on',
    type: 'website',
    thumbnail: { src: amora, width: 382, height: 497 },
    action: { href: LINKS.amora },
    order: 6,
  },
  {
    id: 'worktape',
    title: 'Worktape',
    type: 'app',
    thumbnail: { src: worktape, width: 892, height: 542 },
    action: { modal: 'worktape' },
    order: 7,
  },
  { id: 'letter', title: 'Letter', type: 'note', note: 'letter', order: 8 },
  { id: 'me', title: 'Sehaz', type: 'photo', thumbnail: { src: me, width: 884, height: 884 }, order: 9 },
  { id: 'hello', title: 'Say hello', type: 'contact', note: 'contact', order: 10 },
];

export const PLAYGROUND_ITEMS = [...ITEMS].sort((a, b) => a.order - b.order);
