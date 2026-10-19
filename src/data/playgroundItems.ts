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
  /* Canvas position: the item's centre, in px from the centre of the
     "More from my Drafts" card (which sits at the centre of the world).
     Move a group by editing its numbers. */
  pinned: { x: number; y: number };
  /* Grid order: by group, so pairs stay side by side. */
  order: number;
}

/* The one list both the canvas and the grid render. Groups on the canvas:
   websites top-right, vibe-coded left, motion top-centre, graphic design
   bottom-left, me + say hello bottom-centre, the letter on its own right. */
const ITEMS: PlaygroundItem[] = [
  { id: 'intro', title: 'More from my Drafts', type: 'note', note: 'intro', pinned: { x: 0, y: 0 }, order: 0 },
  // Websites, top-right
  {
    id: 'rewired',
    title: 're-wired website',
    type: 'website',
    thumbnail: { src: rewired, width: 545, height: 546 },
    action: { href: LINKS.rewired },
    pinned: { x: 560, y: -300 },
    order: 1,
  },
  {
    id: 'amora',
    title: 'Website for Virtual Try-on',
    type: 'website',
    thumbnail: { src: amora, width: 382, height: 497 },
    action: { href: LINKS.amora },
    pinned: { x: 850, y: -260 },
    order: 2,
  },
  // Vibe-coded, left
  {
    id: 'photobooth',
    title: 'Photobooth',
    type: 'app',
    thumbnail: { src: photobooth, width: 735, height: 518 },
    action: { modal: 'photobooth' },
    pinned: { x: -800, y: -290 },
    order: 3,
  },
  {
    id: 'worktape',
    title: 'Worktape',
    type: 'app',
    thumbnail: { src: worktape, width: 892, height: 542 },
    action: { modal: 'worktape' },
    pinned: { x: -860, y: -10 },
    order: 4,
  },
  // One of a kind, top-centre
  {
    id: 'motion',
    title: 'Motion Graphic Demo',
    type: 'motion',
    thumbnail: { src: motion, width: 562, height: 529 },
    action: { modal: 'motionDemo' },
    pinned: { x: -40, y: -370 },
    order: 5,
  },
  // Graphic design, bottom-left
  {
    id: 'sip',
    title: 'SiP Studio',
    type: 'branding',
    thumbnail: { src: sip, width: 592, height: 576 },
    action: { modal: 'sipStudio' },
    pinned: { x: -1000, y: 380 },
    order: 6,
  },
  {
    id: 'extras',
    title: 'Extras',
    type: 'illustration',
    thumbnail: { src: extras, width: 609, height: 722 },
    action: { modal: 'extras' },
    pinned: { x: -660, y: 390 },
    order: 7,
  },
  // Who I am + how to reach me, bottom-centre
  { id: 'me', title: 'Sehaz', type: 'photo', thumbnail: { src: me, width: 884, height: 884 }, pinned: { x: -120, y: 370 }, order: 8 },
  { id: 'hello', title: 'Say hello', type: 'contact', note: 'contact', pinned: { x: 190, y: 400 }, order: 9 },
  // On its own, right
  { id: 'letter', title: 'Letter', type: 'note', note: 'letter', pinned: { x: 870, y: 200 }, order: 10 },
];

export const PLAYGROUND_ITEMS = [...ITEMS].sort((a, b) => a.order - b.order);
