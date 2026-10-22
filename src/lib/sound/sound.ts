/* The site's sound: every sound is synthesised with Web Audio (no files),
   so there is nothing to download. The AudioContext is created on load and
   started straight away where the browser allows it (e.g. a site it already
   trusts); otherwise browsers hold all web audio until the visitor's first
   click, tap or key press, which starts it. A master gain sets the overall level and each sound has
   its own trim, so they sit at a similar, quiet loudness; mute silences
   everything. Each sound is rate-limited so fast repeats never stack.
   Sounds register themselves by name (siteSounds, and the playground's own
   set, which only loads with the playground). */

export type Synth = (kit: SynthKit, at: number) => void;

export interface SoundDef {
  synth: Synth;
  // Trim for this sound before the master gain.
  gain: number;
  // Minimum gap between plays (hovers use a longer one).
  minGap?: number;
}

export interface SynthKit {
  ctx: AudioContext;
  out: AudioNode;
  noise: AudioBuffer;
}

const MASTER_VOLUME = 0.18;
const MIN_REPEAT_MS = 80;
// A sound asked for this soon after a gesture plays even while the context
// is still starting up (resume() takes a few ms), so that click's own tick
// isn't lost. Any other sound while audio is blocked is skipped.
const GESTURE_GRACE_MS = 500;
const UNLOCK_EVENTS = ['pointerdown', 'pointerup', 'touchend', 'keydown'];
const MUTE_KEY = 'portfolio:sound-muted';

const sounds = new Map<string, SoundDef>();
const lastPlayed = new Map<string, number>();
const listeners = new Set<() => void>();
let kit: SynthKit | null = null;
let lastGesture = -Infinity;
let muted = readMuted();

function readMuted() {
  try {
    return localStorage.getItem(MUTE_KEY) === '1';
  } catch {
    return false;
  }
}

export function registerSounds(map: Record<string, SoundDef>) {
  Object.entries(map).forEach(([name, def]) => sounds.set(name, def));
}

/* Plays `name` now, or `delay` ms from now. Silent until the first
   interaction, while muted, or within its minimum gap of its last play.
   Never queued: a sound that can't play now is simply skipped. */
export function play(name: string, { delay = 0 }: { delay?: number } = {}) {
  if (!kit || muted) return;
  const def = sounds.get(name);
  if (!def) return;
  const now = performance.now();
  const running = kit.ctx.state === 'running';
  if (!running && now - lastGesture > GESTURE_GRACE_MS) return;
  if (now - (lastPlayed.get(name) ?? -Infinity) < (def.minGap ?? MIN_REPEAT_MS)) return;
  lastPlayed.set(name, now);
  if (!running) kit.ctx.resume();
  const trim = kit.ctx.createGain();
  trim.gain.value = def.gain;
  trim.connect(kit.out);
  def.synth({ ...kit, out: trim }, kit.ctx.currentTime + delay / 1000);
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

function createKit() {
  const AudioCtx = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AudioCtx) return null;
  const ctx = new AudioCtx();
  const master = ctx.createGain();
  master.gain.value = MASTER_VOLUME;
  master.connect(ctx.destination);
  const noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) data[i] = Math.random() * 2 - 1;
  return { ctx, out: master, noise };
}

/* Any click, tap or key press (capture phase, so that same click's own
   sound still plays) starts the context if the browser is holding it: on
   the first visit, and again if it was suspended later (e.g. Safari after
   the tab was in the background). */
function handleGesture() {
  lastGesture = performance.now();
  if (kit && kit.ctx.state !== 'running') kit.ctx.resume();
}

if (typeof window !== 'undefined') {
  kit = createKit();
  // Starts at once where the browser allows it; a blocked start is fine.
  kit?.ctx.resume().catch(() => {});
  UNLOCK_EVENTS.forEach((type) => window.addEventListener(type, handleGesture, true));
}
