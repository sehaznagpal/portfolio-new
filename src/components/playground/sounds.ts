import { registerSounds } from '../../lib/sound/sound';
import { noise, tone } from '../../lib/sound/synth';

/* The playground's set: a little more playful than the main site's, still
   soft and understated. It loads with the playground chunk only. Hover
   sounds keep a longer gap so quick hovering never stacks. */
const HOVER_GAP = 250;

registerSounds({
  // Column switch: three quick, soft card taps
  shuffle: {
    gain: 0.1,
    synth: (kit, at) => {
      [0, 0.05, 0.1].forEach((offset, i) => {
        noise(kit, at + offset, { freq: 1800 + i * 300, q: 1.2, attack: 0.008, duration: 0.05 });
      });
    },
  },
  // re-wired's sticker flipping
  paperFlip: {
    gain: 0.11,
    minGap: HOVER_GAP,
    synth: (kit, at) => noise(kit, at, { freq: 1400, to: 3800, q: 1.1, attack: 0.03, duration: 0.14 }),
  },
  // Amora's stamp wiggling: three tiny paper nudges
  wiggle: {
    gain: 0.09,
    minGap: HOVER_GAP,
    synth: (kit, at) => {
      [0, 0.08, 0.16].forEach((offset, i) => {
        noise(kit, at + offset, { freq: 2200 - i * 200, q: 1.4, attack: 0.012, duration: 0.05 });
      });
    },
  },
  // Motion's CD sliding out
  vinyl: {
    gain: 0.14,
    minGap: HOVER_GAP,
    synth: (kit, at) => {
      noise(kit, at, { freq: 1500, to: 600, q: 2, attack: 0.06, duration: 0.42 });
      tone(kit, at, { freq: 110, to: 96, level: 0.3, attack: 0.06, duration: 0.4 });
    },
  },
  // Worktape's cassette popping out: a small, muffled clack
  clack: {
    gain: 0.14,
    minGap: HOVER_GAP,
    synth: (kit, at) => {
      noise(kit, at, { filter: 'lowpass', freq: 2600, attack: 0.006, duration: 0.03 });
      tone(kit, at, { freq: 300, to: 190, type: 'triangle', level: 0.5, attack: 0.006, duration: 0.07 });
      noise(kit, at + 0.07, { filter: 'lowpass', freq: 3000, level: 0.6, attack: 0.006, duration: 0.025 });
    },
  },
  // Photobooth opening, and each photo
  shutter: {
    gain: 0.14,
    synth: (kit, at) => {
      noise(kit, at, { filter: 'highpass', freq: 2600, duration: 0.03 });
      noise(kit, at + 0.06, { freq: 1600, q: 1.2, level: 0.8, duration: 0.05 });
    },
  },
  // Photobooth hover: a tiny shutter tick
  shutterTick: {
    gain: 0.07,
    minGap: HOVER_GAP,
    synth: (kit, at) => {
      noise(kit, at, { filter: 'highpass', freq: 3500, duration: 0.018 });
      noise(kit, at + 0.035, { filter: 'highpass', freq: 3000, level: 0.6, duration: 0.018 });
    },
  },
  // SiP Studio's reveal
  pop: {
    gain: 0.12,
    minGap: HOVER_GAP,
    synth: (kit, at) => tone(kit, at, { freq: 420, to: 720, attack: 0.012, duration: 0.09 }),
  },
  // Extras: a card flick
  flick: {
    gain: 0.11,
    minGap: HOVER_GAP,
    synth: (kit, at) => {
      noise(kit, at, { freq: 2400, to: 4200, q: 1.3, attack: 0.01, duration: 0.07 });
      tone(kit, at + 0.01, { freq: 1400, type: 'triangle', level: 0.25, attack: 0.008, duration: 0.04 });
    },
  },
  // Project windows opening / closing
  windowOpen: {
    gain: 0.12,
    synth: (kit, at) => tone(kit, at, { freq: 440, to: 700, attack: 0.012, duration: 0.1 }),
  },
  windowClose: {
    gain: 0.09,
    synth: (kit, at) => tone(kit, at, { freq: 640, to: 400, attack: 0.012, duration: 0.1 }),
  },
  // Notes picked up / put down
  lift: {
    gain: 0.1,
    synth: (kit, at) => noise(kit, at, { filter: 'highpass', freq: 1600, to: 3000, attack: 0.03, duration: 0.16 }),
  },
  settle: {
    gain: 0.1,
    synth: (kit, at) => {
      noise(kit, at, { filter: 'highpass', freq: 2800, to: 1300, attack: 0.02, duration: 0.18 });
      noise(kit, at + 0.12, { freq: 900, q: 1.4, level: 0.7, duration: 0.04 });
    },
  },
  // Theme change: a soft, rounded bloop with a little air
  bloop: {
    gain: 0.12,
    synth: (kit, at) => {
      tone(kit, at, { freq: 300, to: 520, attack: 0.015, duration: 0.15 });
      noise(kit, at, { freq: 900, to: 2200, q: 0.9, level: 0.35, attack: 0.04, duration: 0.2 });
    },
  },
  // Share: link copied
  ding: {
    gain: 0.08,
    synth: (kit, at) => {
      tone(kit, at, { freq: 1568, attack: 0.01, duration: 0.5 });
      tone(kit, at + 0.07, { freq: 2093, level: 0.75, attack: 0.01, duration: 0.45 });
    },
  },
});
