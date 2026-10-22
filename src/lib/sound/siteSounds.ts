import { registerSounds } from './sound';
import { noise, tone } from './synth';

/* The main site's set: soft, short and understated. `gain` is each sound's
   trim, balanced by ear so they all sit at a similar, quiet loudness. */
const HOVER_GAP = 250;

registerSounds({
  // Buttons, links, cards; the nav wordmark on hover
  tick: {
    gain: 0.1,
    synth: (kit, at) => tone(kit, at, { freq: 1700, to: 1300, attack: 0.006, duration: 0.035 }),
  },
  // Moving between hero, work and footer
  whoosh: {
    gain: 0.3,
    synth: (kit, at) => noise(kit, at, { freq: 300, to: 1200, q: 0.7, attack: 0.14, duration: 0.45 }),
  },
  // About opening (rising) and closing (falling, a touch lower): the same
  // family as the section whoosh, lighter
  whooshLight: {
    gain: 0.2,
    synth: (kit, at) => noise(kit, at, { freq: 400, to: 1500, q: 0.8, attack: 0.1, duration: 0.32 }),
  },
  whooshLightBack: {
    gain: 0.18,
    synth: (kit, at) => noise(kit, at, { freq: 1300, to: 360, q: 0.8, attack: 0.08, duration: 0.32 }),
  },
  // Footer punch: a small, muffled paper "tk"
  punch: {
    gain: 0.22,
    synth: (kit, at) => {
      noise(kit, at, { filter: 'lowpass', freq: 1400, to: 700, q: 0.7, attack: 0.005, duration: 0.05 });
      tone(kit, at, { freq: 230, to: 130, level: 0.4, attack: 0.005, duration: 0.06 });
    },
  },
  // "get new sheet": a soft paper rustle
  rustle: {
    gain: 0.12,
    synth: (kit, at) => {
      [0, 0.06, 0.13, 0.21].forEach((offset, i) => {
        noise(kit, at + offset, { freq: 2000 + i * 450, q: 1.2, attack: 0.02, duration: 0.11 });
      });
    },
  },
  // Lamp: the pull-chain click, and the bulb's tink as it comes on
  chain: {
    gain: 0.16,
    synth: (kit, at) => {
      noise(kit, at, { filter: 'highpass', freq: 4000, duration: 0.02 });
      noise(kit, at + 0.03, { filter: 'highpass', freq: 3000, level: 0.7, duration: 0.025 });
    },
  },
  tink: {
    gain: 0.06,
    synth: (kit, at) => {
      tone(kit, at, { freq: 2637, duration: 0.4 });
      tone(kit, at, { freq: 5274, level: 0.4, duration: 0.25 });
    },
  },
  // Journey screen flip, and the playground's greeting card turning
  cardFlip: {
    gain: 0.12,
    minGap: HOVER_GAP,
    synth: (kit, at) => noise(kit, at, { freq: 1200, to: 3600, q: 1.1, attack: 0.025, duration: 0.15 }),
  },
  // The loading curtain lifting: two soft bell notes, rising
  chime: {
    gain: 0.08,
    synth: (kit, at) => {
      tone(kit, at, { freq: 1046.5, attack: 0.02, duration: 0.5 });
      tone(kit, at + 0.09, { freq: 1568, level: 0.8, attack: 0.02, duration: 0.5 });
    },
  },
  // Hero name letters swapping fonts: tiny, very quiet type ticks
  type: {
    gain: 0.05,
    minGap: 40,
    synth: (kit, at) => noise(kit, at, { freq: 3400, q: 3, attack: 0.004, duration: 0.02 }),
  },
});
