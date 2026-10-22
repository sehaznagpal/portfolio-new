import { registerSounds } from './sound';
import { noise, tone } from './synth';

/* The main site's set: quiet and short. */
registerSounds({
  // Buttons, links, cards
  tick: (kit, at) => {
    tone(kit, at, { freq: 2200, to: 1600, type: 'triangle', level: 0.18, duration: 0.03 });
  },
  // Hero <-> work
  whoosh: (kit, at) => {
    noise(kit, at, { freq: 350, to: 1400, q: 0.8, level: 0.22, attack: 0.12, duration: 0.42 });
  },
  // About in / out
  paperIn: (kit, at) => {
    noise(kit, at, { filter: 'highpass', freq: 1800, to: 3600, level: 0.16, attack: 0.05, duration: 0.3 });
  },
  paperOut: (kit, at) => {
    noise(kit, at, { filter: 'highpass', freq: 3600, to: 1800, level: 0.14, attack: 0.05, duration: 0.28 });
  },
  // Footer punch: a low thump with a short crunch
  punch: (kit, at) => {
    tone(kit, at, { freq: 140, to: 60, level: 0.5, attack: 0.002, duration: 0.12 });
    noise(kit, at, { filter: 'lowpass', freq: 2400, to: 600, level: 0.35, attack: 0.001, duration: 0.07 });
  },
  // A chip landing
  paperTap: (kit, at) => {
    noise(kit, at, { freq: 3200, q: 2, level: 0.12, attack: 0.001, duration: 0.035 });
  },
  // New sheet: a few overlapping crinkles
  rustle: (kit, at) => {
    [0, 0.06, 0.13, 0.21].forEach((offset, i) => {
      noise(kit, at + offset, { freq: 2600 + i * 500, q: 1.5, level: 0.1, attack: 0.01, duration: 0.12 });
    });
  },
  // Lamp: the pull-chain click, and the bulb's tink as it comes on
  chain: (kit, at) => {
    noise(kit, at, { filter: 'highpass', freq: 4000, level: 0.2, attack: 0.001, duration: 0.02 });
    noise(kit, at + 0.03, { filter: 'highpass', freq: 3000, level: 0.14, attack: 0.001, duration: 0.025 });
  },
  tink: (kit, at) => {
    tone(kit, at, { freq: 2637, level: 0.05, attack: 0.002, duration: 0.4 });
    tone(kit, at, { freq: 5274, level: 0.02, attack: 0.002, duration: 0.25 });
  },
  // Journey screen flip
  cardFlip: (kit, at) => {
    noise(kit, at, { freq: 1400, to: 4200, q: 1.2, level: 0.14, attack: 0.02, duration: 0.14 });
  },
});
