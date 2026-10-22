import type { SynthKit } from './sound';

/* Small building blocks for the synthesised sounds: a tone with a pitch
   glide and a filtered noise burst with a filter sweep, each with a soft
   envelope. Times in seconds; levels are relative (each sound's trim and
   the master gain set the real loudness). */

// No instant attacks: even the quickest sound fades in, so nothing clicks.
const MIN_ATTACK = 0.008;

function envelope(ctx: AudioContext, at: number, level: number, attack: number, duration: number) {
  const rise = Math.max(attack, MIN_ATTACK);
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, at);
  gain.gain.linearRampToValueAtTime(level, at + rise);
  // A smooth exponential fade, then a last tiny ramp to true silence.
  gain.gain.exponentialRampToValueAtTime(0.001, at + duration);
  gain.gain.linearRampToValueAtTime(0, at + duration + 0.01);
  return gain;
}

export function tone(
  { ctx, out }: SynthKit,
  at: number,
  { freq, to = freq, type = 'sine', level = 1, attack = MIN_ATTACK, duration }: {
    freq: number;
    to?: number;
    type?: OscillatorType;
    level?: number;
    attack?: number;
    duration: number;
  },
) {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  if (to !== freq) osc.frequency.exponentialRampToValueAtTime(to, at + duration);
  const gain = envelope(ctx, at, level, attack, duration);
  osc.connect(gain).connect(out);
  osc.start(at);
  osc.stop(at + duration + 0.02);
}

export function noise(
  { ctx, out, noise: buffer }: SynthKit,
  at: number,
  { filter = 'bandpass', freq, to = freq, q = 1, level = 1, attack = MIN_ATTACK, duration }: {
    filter?: BiquadFilterType;
    freq: number;
    to?: number;
    q?: number;
    level?: number;
    attack?: number;
    duration: number;
  },
) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const biquad = ctx.createBiquadFilter();
  biquad.type = filter;
  biquad.Q.value = q;
  biquad.frequency.setValueAtTime(freq, at);
  if (to !== freq) biquad.frequency.exponentialRampToValueAtTime(to, at + duration);
  const gain = envelope(ctx, at, level, attack, duration);
  source.connect(biquad).connect(gain).connect(out);
  // A random start in the buffer, so repeats never sound identical.
  source.start(at, Math.random() * 0.5, duration + 0.05);
}
