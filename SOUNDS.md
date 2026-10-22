# Sounds

Every sound on the site is synthesised in code with the Web Audio API.
There are no audio files, so there is nothing to license and nothing to
download: the total audio payload is 0 KB.

- Engine: `src/lib/sound/sound.ts`. Unlocks on the first click, tap or key
  press; master volume 0.18; each sound has its own trim gain so they sit at
  a similar, quiet loudness; mute is saved as `portfolio:sound-muted`;
  each sound has a minimum gap between plays (80 ms, hovers 250 ms, the
  hero type ticks 40 ms). A sound that can't play now is skipped, never
  queued.
- Building blocks: `src/lib/sound/synth.ts`: a tone with a pitch glide and
  a filtered noise burst with a filter sweep. Every envelope fades in over
  at least 8 ms and fades out smoothly, so nothing clicks.
- Main site set: `src/lib/sound/siteSounds.ts`.
- Playground set: `src/components/playground/sounds.ts` (loads with the
  playground only).

Source and licence for every sound below: synthesised in this repository's
code (original work); no third-party audio.

## Main site

| Sound | Where | How it's made | Trim |
| --- | --- | --- | --- |
| tick | Buttons, links, cards on click; the "sehaz nagpal" wordmark on hover (silent on click) | Sine 1.7 → 1.3 kHz, 35 ms | 0.10 |
| whoosh | Moving between hero, work and footer | Band-pass noise 300 Hz → 1.2 kHz, 450 ms | 0.30 |
| whooshLight / whooshLightBack | About opens / closes | The same family, lighter: rising 400 Hz → 1.5 kHz; falling 1.3 kHz → 360 Hz | 0.20 / 0.18 |
| punch | Footer punch | A muffled paper "tk": low-pass noise plus a soft low tone, 60 ms | 0.22 |
| rustle | "get new sheet" | Four soft band-pass crinkles, 330 ms | 0.12 |
| chain | Case study lamp, as the cord is let go | Two soft high-pass clicks, 55 ms | 0.16 |
| tink | The bulb lighting (70 ms after the chain) | Sine 2.6 kHz with a quiet octave above, 400 ms | 0.06 |
| cardFlip | Fraud case study journey flip; the playground greeting card hover | Band-pass noise 1.2 → 3.6 kHz, 150 ms | 0.12 |
| chime | The loading curtain lifting, only if sound is already unlocked | Two bell notes, C6 then G6, 590 ms | 0.08 |
| type | Hero name letters swapping fonts on hover | A tiny band-pass noise tick, 20 ms | 0.05 |

The chip landing after a punch is silent (it added clutter).

## Playground

| Sound | Where | How it's made | Trim |
| --- | --- | --- | --- |
| swoosh | Canvas ↔ grid morph | Airy band-pass noise 500 Hz → 2.4 kHz, 550 ms | 0.28 |
| shuffle | Column switch | Three soft noise taps, 150 ms | 0.10 |
| paperFlip | re-wired hover (sticker flip) | Noise sweep 1.4 → 3.8 kHz, 140 ms | 0.11 |
| wiggle | Amora hover (stamp shake) | Three tiny paper nudges, 210 ms | 0.09 |
| vinyl | Motion Graphic Demo hover (CD slides out) | Narrow noise sweep down plus a low hum, 420 ms | 0.14 |
| clack | Worktape hover (cassette pops out) | Muffled click, short body tone, second click, 100 ms | 0.14 |
| shutterTick | Photobooth hover | Two tiny high clicks, 55 ms | 0.07 |
| shutter | Photobooth opening, and each photo | Two clicks 60 ms apart, 110 ms | 0.14 |
| pop | SiP Studio hover | Sine 420 → 720 Hz, 90 ms | 0.12 |
| flick | Extras hover | Bright noise flick plus a faint tick, 70 ms | 0.11 |
| windowOpen / windowClose | Project windows open / close | Sine sweeping up / softer sweep down, 100 ms | 0.12 / 0.09 |
| lift / settle | A note picked up / put down | High-pass noise sweeping up / down, then a soft tap | 0.10 |
| bloop | Theme change | A rounded low tone 300 → 520 Hz with a little air, 200 ms | 0.12 |
| ding | Share: link copied | Two sine bells, G6 then C7, 520 ms | 0.08 |
| tick | The "Sehaz Nagpal" wordmark on hover | (main site tick) | 0.10 |

Hover sounds play only for a real mouse hover (Worktape also on keyboard
focus), never for the touch auto-cycle.

## Rules

- Nothing plays before the visitor's first click, tap or key press.
- Nothing loops, nothing plays on load, no background music.
- Muted (the speaker button, bottom-left on every page) is completely silent.
