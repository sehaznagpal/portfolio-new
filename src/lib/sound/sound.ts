/* The site's sound: every sound is synthesised with Web Audio (no files),
   so there is nothing to download. Nothing plays until the visitor's first
   click, tap or key press (browser autoplay rules); the AudioContext is
   created then. A master gain sets the overall level; mute silences
   everything. Each sound is rate-limited so fast repeats never stack.
   Sounds register themselves by name (siteSounds, and the playground's own
   set, which only loads with the playground). */

export type Synth = (kit: SynthKit, at: number) => void;

export interface SynthKit {
  ctx: AudioContext;
  out: AudioNode;
  noise: AudioBuffer;
}

const MASTER_VOLUME = 0.3;
const MIN_REPEAT_MS = 80;
const MUTE_KEY = 'portfolio:sound-muted';

const synths = new Map<string, Synth>();
const lastPlayed = new Map<string, number>();
const listeners = new Set<() => void>();
let kit: SynthKit | null = null;
let muted = readMuted();

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

export function registerSounds(map: Record<string, Synth>) {
  Object.entries(map).forEach(([name, synth]) => synths.set(name, synth));
}

/* Plays `name` now, or `delay` ms from now. Silent until the first
   interaction, while muted, or within MIN_REPEAT_MS of its last play. */
export function play(name: string, { delay = 0 }: { delay?: number } = {}) {
  if (!kit || muted) return;
  const synth = synths.get(name);
  if (!synth) return;
  const now = performance.now();
  if (now - (lastPlayed.get(name) ?? -Infinity) < MIN_REPEAT_MS) return;
  lastPlayed.set(name, now);
  if (kit.ctx.state === 'suspended') kit.ctx.resume();
  synth(kit, kit.ctx.currentTime + delay / 1000);
}

export function isMuted() {
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  try {
    localStorage.setItem(MUTE_KEY, next ? '1' : '0');
  } catch {
    // Storage unavailable: the choice lasts for this visit only.
  }
  listeners.forEach((listener) => listener());
}

export function subscribeMuted(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/* Created inside the first gesture so every browser (iOS Safari included)
   lets it play. Capture phase, so that same click's own sound still plays. */
function unlock() {
  if (kit) return;
  const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const master = ctx.createGain();
  master.gain.value = MASTER_VOLUME;
  master.connect(ctx.destination);
  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  kit = { ctx, out: master, noise };
  ctx.resume();
  ['pointerdown', 'keydown'].forEach((type) => window.removeEventListener(type, unlock, true));
}

if (typeof window !== 'undefined') {
  ['pointerdown', 'keydown'].forEach((type) => window.addEventListener(type, unlock, true));
}
