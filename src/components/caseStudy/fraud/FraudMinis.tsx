import type { ReactNode } from 'react';
import { ArrowLeft, Heart, Phone, PhoneOff, TriangleAlert, X } from 'lucide-react';
import styles from './FraudMinis.module.css';

/* Small UI snippets in the experiment simulator's visual language (UPI-style
   cards, banners, buttons, SMS bubbles), drawn in HTML/CSS for the story
   blocks' cards and steps. Decorative: each card's text says what it shows.
   Grey bars stand in for text that isn't the point of the snippet. */

function Lines({ count, short }: { count: number; short?: boolean }) {
  return (
    <span className={styles.lines}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={styles.line} data-short={short && i === count - 1} />
      ))}
    </span>
  );
}

// Insight 1: a warning nobody can read.
function WarningBlur() {
  return (
    <div className={`${styles.screen} ${styles.wide}`}>
      <Lines count={2} short />
      <div className={styles.banner}>
        <TriangleAlert className={styles.bannerIcon} size={14} strokeWidth={2} />
        <span className={styles.scribble}>
          <span />
          <span />
          <span />
        </span>
      </div>
    </div>
  );
}

// Insight 2: the impersonated-authority SMS.
function ScamSms() {
  return (
    <div className={styles.thread}>
      <span className={styles.sender}>SMS</span>
      <p className={styles.sms}>Delhi Traffic Police: pay your ₹4,500 fine today</p>
    </div>
  );
}

// Insight 3: an incoming call from "Police", with a big answer button.
function PoliceCall() {
  return (
    <div className={styles.call}>
      <span className={styles.callMeta}>Incoming call</span>
      <span className={styles.callName}>Police</span>
      <span className={styles.callButtons}>
        <span className={styles.decline}>
          <PhoneOff size={8} strokeWidth={2.5} />
        </span>
        <span className={styles.answer}>
          <Phone size={20} strokeWidth={2} />
        </span>
      </span>
    </div>
  );
}

// Insight 4: no single language reaches everyone.
function LanguageChips() {
  return (
    <div className={styles.chips}>
      {['English', 'हिन्दी', 'தமிழ்', 'বাংলা', '+18'].map((language) => (
        <span key={language} className={styles.chip}>
          {language}
        </span>
      ))}
    </div>
  );
}

// Step 01: one snippet per bias.
function AuthorityScam() {
  return (
    <div className={styles.screen}>
      <span className={styles.payee}>Delhi Traffic Police</span>
      <span className={styles.amount}>₹4,500</span>
      <span className={styles.payButton}>Pay</span>
    </div>
  );
}

function UrgencyScam() {
  return (
    <div className={styles.thread}>
      <p className={styles.sms}>lost my phone</p>
      <p className={`${styles.sms} ${styles.smsLines}`}>
        <Lines count={2} short />
      </p>
    </div>
  );
}

function SocialProofScam() {
  return (
    <div className={`${styles.screen} ${styles.post}`}>
      <span className={styles.postImage} />
      <span className={styles.comment}>
        <Heart className={styles.heart} size={9} strokeWidth={0} />
        <Lines count={1} />
      </span>
      <span className={styles.comment}>
        <Heart className={styles.heart} size={9} strokeWidth={0} />
        <Lines count={1} short />
      </span>
    </div>
  );
}

// Step 02: the warning on the PIN screen beside the CTA redesign.
function WarningVsCta() {
  return (
    <div className={styles.compare}>
      <figure className={styles.compareItem}>
        <div className={`${styles.screen} ${styles.wide}`}>
          <span className={styles.screenTitle}>Enter UPI PIN</span>
          <span className={styles.pin}>
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} />
            ))}
          </span>
          <div className={styles.banner}>
            <TriangleAlert className={styles.bannerIcon} size={14} strokeWidth={2} />
            <Lines count={2} short />
          </div>
        </div>
        <figcaption className={styles.compareLabel}>Warning</figcaption>
      </figure>
      <figure className={styles.compareItem}>
        <div className={`${styles.screen} ${styles.wide}`}>
          <Lines count={2} short />
          <span className={styles.cancel}>Cancel Payment</span>
          <span className={styles.continue}>Continue anyway</span>
        </div>
        <figcaption className={styles.compareLabel}>CTA</figcaption>
      </figure>
    </div>
  );
}

// Step 03: what kept it realistic.
function Unbranded() {
  return (
    <div className={styles.screen}>
      <span className={styles.appBar}>
        <span className={styles.logo} />
        <Lines count={1} short />
      </span>
      <Lines count={2} short />
      <span className={styles.payButton}>Pay</span>
    </div>
  );
}

function Amounts() {
  return (
    <div className={styles.chips}>
      {['₹4,500', '₹1,499', '₹3,000'].map((amount) => (
        <span key={amount} className={`${styles.chip} ${styles.amountChip}`}>
          {amount}
        </span>
      ))}
    </div>
  );
}

function Exit() {
  return (
    <div className={styles.screen}>
      <span className={styles.exitBar}>
        <span className={styles.exitButton}>
          <ArrowLeft size={10} strokeWidth={2.5} />
        </span>
        <span className={styles.exitButton}>
          <X size={10} strokeWidth={2.5} />
        </span>
      </span>
      <Lines count={3} short />
    </div>
  );
}

function OneVariable() {
  return (
    <div className={styles.flow}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={styles.flowScreen} data-changed={i === 2} />
      ))}
    </div>
  );
}

export const FRAUD_MINIS: Record<string, ReactNode> = {
  'warning-blur': <WarningBlur />,
  'scam-sms': <ScamSms />,
  'police-call': <PoliceCall />,
  'language-chips': <LanguageChips />,
  'scam-authority': <AuthorityScam />,
  'scam-urgency': <UrgencyScam />,
  'scam-social': <SocialProofScam />,
  'warning-vs-cta': <WarningVsCta />,
  unbranded: <Unbranded />,
  amounts: <Amounts />,
  exit: <Exit />,
  'one-variable': <OneVariable />,
};
