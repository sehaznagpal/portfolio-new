# Sounds

Every sound on the site is synthesised in code with the Web Audio API.
There are no audio files, so there is nothing to license and nothing to
download: the total audio payload is 0 KB.

- Engine: `src/lib/sound/sound.ts` (first-interaction unlock, master
  volume 0.3, mute saved as `portfolio:sound-muted`, 80 ms minimum between
  repeats of a sound).
- Building blocks: `src/lib/sound/synth.ts` (a tone with a pitch glide, a
  filtered noise burst with a filter sweep, each with a short envelope).
- Main site set: `src/lib/sound/siteSounds.ts`.
- Playground set: `src/components/playground/sounds.ts` (loads with the
  playground only).

Licence: original code in this repository; no third-party audio.

## Main site

| Sound | Where | How it's made | Length |
| --- | --- | --- | --- |
| tick | Buttons, links, cards (one delegated listener) | Triangle tone 2.2 → 1.6 kHz | 30 ms |
| whoosh | Hero ↔ work | Band-pass noise sweeping 350 Hz → 1.4 kHz | 420 ms |
| paperIn / paperOut | About opens / closes | High-pass noise sweeping up / down | 300 ms |
| punch | Footer punch | Low tone 140 → 60 Hz plus a short low-pass noise crunch | 120 ms |
| paperTap | A punched chip lands | Narrow band-pass noise click | 35 ms |
| rustle | "get new sheet" | Four overlapping band-pass noise crinkles | 330 ms |
| chain | Case study lamp, as the cord is let go | Two high-pass noise clicks | 55 ms |
| tink | The bulb lighting (70 ms after the chain) | Quiet sine at 2.6 kHz with an octave above | 400 ms |
| cardFlip | Fraud case study journey screen flip | Band-pass noise sweeping 1.4 → 4.2 kHz | 140 ms |

## Playground

| Sound | Where | How it's made | Length |
| --- | --- | --- | --- |
| swoosh | Canvas ↔ grid morph | Airy band-pass noise sweep 500 Hz → 2.6 kHz | 550 ms |
| shuffle | Column switch | Three quick noise taps | 150 ms |
| vinyl | Motion Graphic Demo hover (CD slides out) | Narrow noise sweep down plus a low hum | 420 ms |
| clack | Worktape hover (cassette pops out) | Click, a short body tone, a second click | 100 ms |
| shutter | Photobooth opening, and each photo | Two clicks 60 ms apart | 110 ms |
| pop | SiP Studio hover | Sine sweeping 520 → 980 Hz | 70 ms |
| flick | Extras and greeting card hovers | Bright noise flick plus a faint tick | 70 ms |
| windowOpen / windowClose | Project windows open / close | Sine sweeping up / softer sweep down | 90 ms |
| lift / settle | A note picked up / put down | High-pass noise sweeping up / down, then a soft tap | 160–220 ms |
| swish | Theme switch | Band-pass noise sweep 900 Hz → 3.2 kHz | 220 ms |
| ding | Share: link copied | Two sine bells (G6, then C7) | 520 ms |

## Rules

- Nothing plays before the visitor's first click, tap or key press.
- No hover sounds on the main site; in the playground only the showpieces
  above, and only for a real mouse hover or keyboard focus.
- Nothing loops, nothing plays on load, no background music.
- Muted (the speaker button, bottom-left on every page) is completely silent.
