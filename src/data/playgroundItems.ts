import { LINKS } from './links';
import photobooth from '../assets/images/playground/thumbs/photobooth.webp';
import motion from '../assets/images/playground/thumbs/motion.webp';
import rewired from '../assets/images/playground/thumbs/rewired.webp';
import sip from '../assets/images/playground/thumbs/sip.webp';
import amora from '../assets/images/playground/thumbs/amora.webp';
import worktape from '../assets/images/playground/thumbs/worktape.webp';
import me from '../assets/images/playground/me.webp';

export type PlaygroundModalId = 'photobooth' | 'motionDemo' | 'sipStudio' | 'extras' | 'worktape';
export type PlaygroundAction = { modal: PlaygroundModalId } | { href: string };
/* Text cards that render their own content in place of a thumbnail. */
export type PlaygroundTextCard = 'intro' | 'letter' | 'contact';

export interface PlaygroundItem {
  id: string;
  title: string;
  /* Shown in the caption: "title · type". */
  type: string;
  /* Canvas only: replaces the "title · type" caption; null shows none. */
  caption?: string | null;
  year?: number;
  thumbnail?: { src: string; width: number; height: number };
  action?: PlaygroundAction;
  card?: PlaygroundTextCard;
  /* For items that open inside the site: a short handwritten note shown
     beside the modal. */
  note?: string;
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
  { id: 'intro', title: 'More from my Drafts', type: 'note', caption: null, card: 'intro', pinned: { x: 0, y: 0 }, order: 0 },
  // Websites, top-right
  {
    id: 'rewired',
    title: 're-wired website',
    type: 'website',
    thumbnail: { src: rewired, width: 545, height: 546 },
    action: { href: LINKS.rewired },
    pinned: { x: 1150, y: -470 },
    order: 1,
  },
  {
    id: 'amora',
    title: 'Website for Virtual Try-on',
    type: 'website',
    thumbnail: { src: amora, width: 382, height: 497 },
    action: { href: LINKS.amora },
    pinned: { x: 1455, y: -430 },
    order: 2,
  },
  // Vibe-coded, left
  {
    id: 'photobooth',
    title: 'Photobooth',
    type: 'app',
    thumbnail: { src: photobooth, width: 735, height: 518 },
    action: { modal: 'photobooth' },
    note:
      'I made this so you can take a few pictures and keep them. It also helped me learn how to use a camera inside a browser.',
    pinned: { x: -840, y: -150 },
    order: 3,
  },
  {
    id: 'worktape',
    title: 'Worktape',
    type: 'app',
    thumbnail: { src: worktape, width: 892, height: 542 },
    action: { modal: 'worktape' },
    note:
      'I kept opening the same files and apps every time I sat down to work. So I made Worktape. One click opens everything I need for a task, and one click closes it all. I wanted it to be easy and fun to use, so I made it look like cassettes.',
    pinned: { x: -880, y: 120 },
    order: 4,
  },
  // One of a kind, top-centre
  {
    id: 'motion',
    title: 'Motion Graphic Demo',
    type: 'motion',
    thumbnail: { src: motion, width: 562, height: 529 },
    action: { modal: 'motionDemo' },
    note:
      'This was my first time animating something, and my first time using Figma Motion. Re-Wired had launched something new and needed a short video to show it, so I learned while making this.',
    pinned: { x: 0, y: -560 },
    order: 5,
  },
  // Graphic design, bottom-left
  {
    id: 'sip',
    title: 'SiP Studio',
    type: 'branding',
    thumbnail: { src: sip, width: 592, height: 576 },
    action: { modal: 'sipStudio' },
    note:
      'SiP Studio is a café I made up. I wanted to practise branding, so I designed one for a place that doesn’t exist.',
    pinned: { x: -1300, y: 560 },
    order: 6,
  },
  {
    id: 'extras',
    title: 'Extras',
    type: 'illustration',
    action: { modal: 'extras' },
    note:
      'These remind me why I like designing. I can see something I like and make my own version of it on screen.',
    pinned: { x: -1000, y: 570 },
    order: 7,
  },
  // Who I am + how to reach me, bottom-centre
  { id: 'me', title: 'Sehaz', type: 'photo', caption: null, thumbnail: { src: me, width: 884, height: 884 }, pinned: { x: -150, y: 520 }, order: 8 },
  { id: 'hello', title: 'Say hello', type: 'contact', caption: 'a greeting card', card: 'contact', pinned: { x: 170, y: 510 }, order: 9 },
  // On its own, right
  { id: 'letter', title: 'Letter', type: 'note', caption: 'a letter', card: 'letter', pinned: { x: 880, y: 70 }, order: 10 },
];

export const PLAYGROUND_ITEMS = [...ITEMS].sort((a, b) => a.order - b.order);
