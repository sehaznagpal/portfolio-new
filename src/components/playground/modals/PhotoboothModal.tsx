import { useEffect, useRef, useState } from 'react';
import PlaygroundModal from './PlaygroundModal';
import curtainLeftImg from '../../../assets/images/playground/photobooth-curtain-left.svg';
import curtainRightImg from '../../../assets/images/playground/photobooth-curtain-right.svg';
import sparkle1Img from '../../../assets/images/playground/photobooth-sparkle-1.svg';
import sparkle2Img from '../../../assets/images/playground/photobooth-sparkle-2.svg';
import styles from './PhotoboothModal.module.css';

const SHOT_COUNT = 4;
const FIRST_COUNTDOWN_S = 3;
const NEXT_COUNTDOWN_S = 2;
// Matches the curtains' CSS transition.
const CURTAIN_MS = 380;
const AFTER_SHOT_MS = 500;
const STRIP_PAD = 24;
const STRIP_GAP = 14;
const STRIP_LABEL_H = 52;
const STRIP_LABEL_BASELINE = 16;
const STRIP_FONT_RATIO = 0.032;
const FRAME_CLASSES = [styles.photoFrame0, styles.photoFrame1, styles.photoFrame2, styles.photoFrame3];
const READY_MESSAGE = 'Capture yourself authentically.';

function captureFrame(video: HTMLVideoElement) {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || 640;
  canvas.height = video.videoHeight || 480;
  const ctx = canvas.getContext('2d')!;
  // Mirrored, to match the selfie preview.
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.drawImage(video, 0, 0);
  return canvas;
}

async function buildStrip(frames: HTMLCanvasElement[]) {
  const frameW = frames[0].width;
  const frameH = frames[0].height;
  const strip = document.createElement('canvas');
  strip.width = frameW + STRIP_PAD * 2;
  strip.height = frameH * frames.length + STRIP_GAP * (frames.length - 1) + STRIP_PAD * 2 + STRIP_LABEL_H;
  const ctx = strip.getContext('2d')!;

  ctx.fillStyle = '#fefefe';
  ctx.fillRect(0, 0, strip.width, strip.height);
  frames.forEach((frame, i) => ctx.drawImage(frame, STRIP_PAD, STRIP_PAD + i * (frameH + STRIP_GAP), frameW, frameH));

  // Canvas text silently falls back to a system font if the webfont isn't loaded yet.
  const font = `${Math.round(frameW * STRIP_FONT_RATIO)}px "Gambetta Variable"`;
  await document.fonts.load(font);
  ctx.fillStyle = '#121212';
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.fillText("From Sehaz's Portfolio <3", strip.width / 2, strip.height - STRIP_LABEL_BASELINE);
  return strip;
}

type Phase = 'ready' | 'shooting' | 'done';

/* A four-shot photobooth: the curtain opens, a countdown and flash for each
   shot, the curtain closes again, and the strip can be downloaded. Closing
   the modal stops the camera and cancels a shoot mid-way. */
function Photobooth() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const stripRef = useRef<HTMLCanvasElement | null>(null);
  const timersRef = useRef(new Set<ReturnType<typeof setTimeout>>());
  const cancelledRef = useRef(false);

  const [phase, setPhase] = useState<Phase>('ready');
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flashKey, setFlashKey] = useState(0);
  const [thumbs, setThumbs] = useState<(string | null)[]>(() => Array(SHOT_COUNT).fill(null));
  const [status, setStatus] = useState(READY_MESSAGE);

  /* Resolves after `ms`, or never if the modal has closed, so a cancelled
     shoot just stops where it is. */
  function wait(ms: number) {
    return new Promise<void>((resolve) => {
      const timer = setTimeout(() => {
        timersRef.current.delete(timer);
        if (!cancelledRef.current) resolve();
      }, ms);
      timersRef.current.add(timer);
    });
  }

  async function requestCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
      if (cancelledRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return false;
      }
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setStatus(READY_MESSAGE);
      return true;
    } catch {
      setStatus('Allow camera access to use the booth!');
      return false;
    }
  }

  useEffect(() => {
    const timers = timersRef.current;
    cancelledRef.current = false;
    requestCamera();
    return () => {
      cancelledRef.current = true;
      timers.forEach(clearTimeout);
      timers.clear();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
    // Runs once per mount: the modal content mounts on open and unmounts on close.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    stripRef.current = null;
    setPhase('ready');
    setCurtainOpen(false);
    setCountdown(null);
    setThumbs(Array(SHOT_COUNT).fill(null));
    setStatus(READY_MESSAGE);
  }

  async function shoot() {
    if (phase !== 'ready') return;
    if (!streamRef.current && !(await requestCamera())) return;
    setPhase('shooting');
    setCurtainOpen(true);
    await wait(CURTAIN_MS);

    const frames: HTMLCanvasElement[] = [];
    for (let shot = 0; shot < SHOT_COUNT; shot += 1) {
      for (let s = shot === 0 ? FIRST_COUNTDOWN_S : NEXT_COUNTDOWN_S; s > 0; s -= 1) {
        setCountdown(s);
        await wait(1000);
      }
      setCountdown(null);
      const video = videoRef.current;
      if (!video) return;
      const frame = captureFrame(video);
      frames.push(frame);
      setThumbs((previous) => previous.map((thumb, i) => (i === shot ? frame.toDataURL() : thumb)));
      setFlashKey((key) => key + 1);
      setStatus(`${shot + 1} / ${SHOT_COUNT} taken!`);
      await wait(AFTER_SHOT_MS);
    }

    stripRef.current = await buildStrip(frames);
    if (cancelledRef.current) return;
    setStatus('All done! Download your strip below ✦');
    // Let the last flash settle, then close the curtain before showing the actions.
    await wait(AFTER_SHOT_MS);
    setCurtainOpen(false);
    await wait(CURTAIN_MS);
    setPhase('done');
  }

  function download() {
    if (!stripRef.current) return;
    const link = document.createElement('a');
    link.download = 'photobooth-strip.png';
    link.href = stripRef.current.toDataURL('image/png');
    link.click();
  }

  // The curtain is a click target too: it starts a shoot, or restarts once done.
  const handleCurtain = phase === 'done' ? reset : shoot;
  const curtainLabel = phase === 'done' ? 'Try again' : 'Take photos';

  return (
    <div className={styles.stage}>
      <div className={styles.ground} />
      <p className={styles.label}>a photobooth</p>
      <img src={sparkle1Img} alt="" className={styles.sparkle1} />
      <img src={sparkle2Img} alt="" className={styles.sparkle2} />

      {thumbs.map((src, i) => (
        <div key={i} className={`${styles.photoFrame} ${FRAME_CLASSES[i]}`}>
          {src && <img src={src} alt={`Shot ${i + 1}`} />}
        </div>
      ))}

      <div className={styles.boothTrim} />
      <div className={styles.cameraArea}>
        <video ref={videoRef} className={styles.video} autoPlay playsInline muted />
        {countdown !== null && <div className={styles.countdown}>{countdown}</div>}
        {flashKey > 0 && <div key={flashKey} className={styles.flash} />}
      </div>
      <button
        type="button"
        className={`${styles.curtainLeft} ${curtainOpen ? styles.curtainLeftOpen : ''}`}
        aria-label={curtainLabel}
        onClick={handleCurtain}
      >
        <img src={curtainLeftImg} alt="" />
      </button>
      <button
        type="button"
        className={`${styles.curtainRight} ${curtainOpen ? styles.curtainRightOpen : ''}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={handleCurtain}
      >
        <img src={curtainRightImg} alt="" />
      </button>

      <div className={styles.heading}>
        <p>SMILE</p>
        <p>PLEASE</p>
      </div>
      <p className={styles.status} aria-live="polite">
        {status}
      </p>

      <div className={styles.actions}>
        {phase === 'ready' && !curtainOpen && (
          <button type="button" className={styles.primaryButton} onClick={shoot}>
            Take Photos
          </button>
        )}
        {phase === 'done' && (
          <>
            <button type="button" className={styles.primaryButton} onClick={download}>
              Download
            </button>
            <button type="button" className={styles.secondaryButton} onClick={reset}>
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function PhotoboothModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <PlaygroundModal
      open={open}
      onClose={onClose}
      label="Photobooth"
      frameClassName={styles.frame}
      closeClassName={styles.close}
    >
      <Photobooth />
    </PlaygroundModal>
  );
}
