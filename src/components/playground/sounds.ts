import { registerSounds } from '../../lib/sound/sound';
import { noise, tone } from '../../lib/sound/synth';

/* The playground's set: a little more playful than the main site's. It
   loads with the playground chunk only. */
registerSounds({
  // Canvas <-> grid morph
  swoosh: (kit, at) => {
    noise(kit, at, { freq: 500, to: 2600, q: 0.7, level: 0.24, attack: 0.18, duration: 0.55 });
  },
  // Column switch: three quick card taps
  shuffle: (kit, at) => {
    [0, 0.05, 0.1].forEach((offset, i) => {
      noise(kit, at + offset, { freq: 2200 + i * 400, q: 1.4, level: 0.13, attack: 0.002, duration: 0.05 });
    });
  },
  // Motion's CD sliding out
  vinyl: (kit, at) => {
    noise(kit, at, { freq: 1800, to: 700, q: 2.5, level: 0.14, attack: 0.04, duration: 0.42 });
    tone(kit, at, { freq: 110, to: 95, level: 0.06, attack: 0.05, duration: 0.4 });
  },
  // Worktape's cassette popping out
  clack: (kit, at) => {
    noise(kit, at, { filter: 'highpass', freq: 2500, level: 0.2, attack: 0.001, duration: 0.025 });
    tone(kit, at, { freq: 320, to: 180, type: 'triangle', level: 0.14, attack: 0.001, duration: 0.08 });
    noise(kit, at + 0.07, { filter: 'highpass', freq: 3200, level: 0.12, attack: 0.001, duration: 0.02 });
  },
  // Photobooth opening, and each photo
  shutter: (kit, at) => {
    noise(kit, at, { filter: 'highpass', freq: 3000, level: 0.22, attack: 0.001, duration: 0.03 });
    noise(kit, at + 0.06, { freq: 1800, q: 1.2, level: 0.18, attack: 0.001, duration: 0.05 });
  },
  // SiP and Extras hovers
  pop: (kit, at) => {
    tone(kit, at, { freq: 520, to: 980, level: 0.18, attack: 0.003, duration: 0.07 });
  },
  // Greeting card flick
  flick: (kit, at) => {
    noise(kit, at, { freq: 2600, to: 4800, q: 1.5, level: 0.14, attack: 0.003, duration: 0.07 });
    tone(kit, at + 0.01, { freq: 1500, type: 'triangle', level: 0.05, attack: 0.002, duration: 0.04 });
  },
  // Project windows opening / closing
  windowOpen: (kit, at) => {
    tone(kit, at, { freq: 440, to: 760, level: 0.16, attack: 0.004, duration: 0.09 });
  },
  windowClose: (kit, at) => {
    tone(kit, at, { freq: 700, to: 420, level: 0.1, attack: 0.004, duration: 0.09 });
  },
  // Notes picked up / put down
  lift: (kit, at) => {
    noise(kit, at, { filter: 'highpass', freq: 1600, to: 3200, level: 0.12, attack: 0.02, duration: 0.16 });
  },
  settle: (kit, at) => {
    noise(kit, at, { filter: 'highpass', freq: 3000, to: 1400, level: 0.12, attack: 0.01, duration: 0.18 });
    noise(kit, at + 0.12, { freq: 900, q: 1.5, level: 0.1, attack: 0.001, duration: 0.04 });
  },
  // Theme switch
  swish: (kit, at) => {
    noise(kit, at, { freq: 900, to: 3200, q: 1, level: 0.16, attack: 0.04, duration: 0.22 });
  },
  // Share: link copied
  ding: (kit, at) => {
    tone(kit, at, { freq: 1568, level: 0.12, attack: 0.003, duration: 0.5 });
    tone(kit, at + 0.07, { freq: 2093, level: 0.09, attack: 0.003, duration: 0.45 });
  },
});
