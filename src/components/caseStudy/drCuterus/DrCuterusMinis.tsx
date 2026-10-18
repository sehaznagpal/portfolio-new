import type { ReactNode } from 'react';
import { CalendarDays, Check, Play, Sparkles } from 'lucide-react';
import styles from './DrCuterusMinis.module.css';

/* Small UI snippets in the visual language of her site (purple and yellow,
   rounded buttons and bubbles), drawn in HTML/CSS for the story blocks'
   cards and steps. Decorative: each card's text says what it shows. Grey
   bars stand in for text that isn't the point of the snippet. Shared
   radius, shadow and stroke come from the --mini-* tokens. */

function Lines({ count, short }: { count: number; short?: boolean }) {
  return (
    <span className={styles.lines}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={styles.line} data-short={short && i === count - 1} />
      ))}
    </span>
  );
}

function BookButton() {
  return <span className={styles.primary}>Book via WhatsApp</span>;
}

// The four visitors.
function VideoTile() {
  return (
    <span className={styles.video}>
      <span className={styles.play}>
        <Play size={14} strokeWidth={2} />
      </span>
    </span>
  );
}

function WorkWithMe() {
  return <span className={styles.accent}>Work with me</span>;
}

function Enquiry() {
  return (
    <span className={`${styles.card} ${styles.enquiry}`}>
      <span className={styles.enquiryHead}>
        <CalendarDays className={styles.enquiryIcon} size={16} strokeWidth={2} />
        <Lines count={1} short />
      </span>
      <Lines count={2} short />
    </span>
  );
}

// Her voice.
function BubbleWith({ icon }: { icon: ReactNode }) {
  return (
    <span className={styles.bubbleWrap}>
      <span className={styles.bubble}>
        <Lines count={2} short />
      </span>
      <span className={styles.badge}>{icon}</span>
    </span>
  );
}

function Hinglish() {
  return (
    <span className={styles.thread}>
      <span className={styles.bubble}>Hey</span>
      <span className={`${styles.bubble} ${styles.reply}`}>Hi, main hoon</span>
    </span>
  );
}

// The colour system.
function PurpleSwatch() {
  return <span className={`${styles.swatch} ${styles.purple}`} />;
}

function YellowAccent() {
  return (
    <span className={styles.bar}>
      <span className={styles.barYellow} />
    </span>
  );
}

function NoPink() {
  return <span className={`${styles.swatch} ${styles.pink}`} />;
}

// The two typefaces, shown in the site's own serif and sans.
function Specimen({ serif }: { serif?: boolean }) {
  return <span className={styles.specimen} data-serif={serif}>Aa</span>;
}

// Bilingual: the same headline written twice, the toggle between them.
function BilingualToggle() {
  return (
    <span className={styles.bilingual}>
      <span className={styles.headline}>Hey, I'm Dr Tanaya Narendra</span>
      <span className={styles.toggle}>
        <span className={styles.toggleOption} data-on="true">
          EN
        </span>
        <span className={styles.toggleOption}>HI</span>
      </span>
      <span className={styles.headline}>Hi, main hoon Dr Tanaya Narendra</span>
    </span>
  );
}

// Appointments: the worries named first, the button second.
function AppointmentChips() {
  return (
    <span className={styles.appointments}>
      <span className={styles.chips}>
        {['Does sex hurt?', 'Irregular periods?', 'Have PCOD?', 'Discharge?', 'Struggling to orgasm?'].map(
          (worry) => (
            <span key={worry} className={styles.chip}>
              {worry}
            </span>
          ),
        )}
      </span>
      <BookButton />
    </span>
  );
}

export const DR_CUTERUS_MINIS: Record<string, ReactNode> = {
  'book-whatsapp': <BookButton />,
  'video-tile': <VideoTile />,
  'work-with-me': <WorkWithMe />,
  enquiry: <Enquiry />,
  'bubble-tick': <BubbleWith icon={<Check size={10} strokeWidth={3} />} />,
  'bubble-sparkle': <BubbleWith icon={<Sparkles size={10} strokeWidth={2} />} />,
  hinglish: <Hinglish />,
  'swatch-purple': <PurpleSwatch />,
  'yellow-accent': <YellowAccent />,
  'no-pink': <NoPink />,
  'aa-serif': <Specimen serif />,
  'aa-sans': <Specimen />,
  'bilingual-toggle': <BilingualToggle />,
  'appointment-chips': <AppointmentChips />,
};
