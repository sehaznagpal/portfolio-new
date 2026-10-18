import type { ReactNode } from 'react';
import { ArrowUpRight, BadgeCheck, Check, FileText, MapPin, RefreshCw, Search, Timer, Unlink, User } from 'lucide-react';
import styles from './MoolroopMinis.module.css';

/* Small UI snippets in MoolRoop's visual language (its five colours, light
   app surfaces, the green "verified" mark), drawn in HTML/CSS for the
   story blocks' cards. Decorative: each card's text says what it shows.
   Grey bars stand in for text that isn't the point of the snippet; shared
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

function Product({ label, small }: { label?: string; small?: boolean }) {
  return (
    <span className={styles.product} data-small={small}>
      <span className={styles.productImage} />
      {label ? <span className={styles.productLabel}>{label}</span> : <Lines count={1} short />}
    </span>
  );
}

function Doc({ dense }: { dense?: boolean }) {
  return (
    <span className={styles.doc} data-dense={dense}>
      <Lines count={dense ? 6 : 3} short />
    </span>
  );
}

// Why nobody checks.
function ScatteredDocs() {
  return (
    <span className={styles.scatter}>
      <Doc />
      <Doc />
      <Doc />
    </span>
  );
}

function DenseRow() {
  return (
    <span className={styles.table}>
      {Array.from({ length: 3 }, (_, r) => (
        <span key={r} className={styles.tableRow}>
          {Array.from({ length: 5 }, (_, c) => (
            <span key={c} className={styles.cellBar} />
          ))}
        </span>
      ))}
    </span>
  );
}

function BrokenLink() {
  return (
    <span className={styles.pair}>
      <span className={styles.buy}>Buy now</span>
      <Unlink className={styles.broken} size={16} strokeWidth={2} />
      <span className={styles.iconTile}>
        <FileText size={18} strokeWidth={1.75} />
      </span>
    </span>
  );
}

// Research sources.
function RegistryRow() {
  return (
    <span className={`${styles.card} ${styles.registry}`}>
      <span className={styles.regNumber}>
        GI No. <span className={styles.regDigits} />
      </span>
      <Lines count={2} short />
    </span>
  );
}

function ForumPost() {
  return (
    <span className={styles.post}>
      <span className={styles.avatar} />
      <span className={styles.bubble}>Is this real?</span>
    </span>
  );
}

function VagueLabel() {
  return (
    <span className={styles.labelled}>
      <Product />
      <span className={styles.vague}>Authentic</span>
    </span>
  );
}

// Key insights.
function QuestionProduct() {
  return (
    <span className={styles.labelled}>
      <Product />
      <span className={styles.question}>?</span>
    </span>
  );
}

function Lookalikes() {
  return (
    <span className={styles.pair}>
      <Product label="Handmade?" small />
      <Product label="Machine-made?" small />
    </span>
  );
}

function PinNoCert() {
  return (
    <span className={styles.pair}>
      <span className={styles.pin}>
        <MapPin size={22} strokeWidth={1.75} />
      </span>
      <span className={styles.missing}>
        <BadgeCheck size={18} strokeWidth={1.75} />
      </span>
    </span>
  );
}

// Design principles.
function StopwatchTick() {
  return (
    <span className={styles.pair}>
      <span className={styles.iconTile}>
        <Timer size={18} strokeWidth={1.75} />
      </span>
      <span className={styles.verified}>
        <Check size={14} strokeWidth={3} />
      </span>
    </span>
  );
}

function SummaryLink() {
  return (
    <span className={`${styles.card} ${styles.summary}`}>
      <span className={styles.summaryHead}>
        <span className={styles.verified} data-small="true">
          <Check size={10} strokeWidth={3} />
        </span>
        <Lines count={1} short />
      </span>
      <span className={styles.recordLink}>
        View official record <ArrowUpRight size={10} strokeWidth={2} />
      </span>
    </span>
  );
}

function PinProduct() {
  return (
    <span className={styles.pair}>
      <span className={styles.pin}>
        <MapPin size={22} strokeWidth={1.75} />
      </span>
      <span className={styles.connector} />
      <Product small />
    </span>
  );
}

// Structural decisions.
function CraftBranch() {
  return (
    <span className={styles.tree}>
      <span className={styles.craft}>Craft</span>
      <span className={styles.branches}>
        <Product small />
        <Product small />
        <Product small />
      </span>
    </span>
  );
}

function TwoEntries() {
  return (
    <span className={styles.tree}>
      <span className={styles.entries}>
        <span className={styles.entry}>By state</span>
        <span className={styles.entry}>By category</span>
      </span>
      <Product small />
    </span>
  );
}

function SearchGrid() {
  return (
    <span className={`${styles.card} ${styles.searchScreen}`}>
      <span className={styles.searchBar}>
        <Search size={10} strokeWidth={2} />
        <Lines count={1} short />
      </span>
      <span className={styles.grid}>
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i} className={styles.gridTile} />
        ))}
      </span>
    </span>
  );
}

// Verification options.
function Badge() {
  return (
    <span className={styles.badge}>
      <BadgeCheck size={14} strokeWidth={2} /> Verified
    </span>
  );
}

function TwoLayers() {
  return (
    <span className={styles.layers}>
      <Doc dense />
      <span className={`${styles.card} ${styles.layerTop}`}>
        <span className={styles.summaryHead}>
          <span className={styles.verified} data-small="true">
            <Check size={10} strokeWidth={3} />
          </span>
          <Lines count={1} short />
        </span>
      </span>
    </span>
  );
}

// Type specimens: Fletcha M can't be loaded here, so it's shown in a
// stand-in face and labelled; Open Sans is loaded.
function SpecimenStandIn() {
  return (
    <span className={styles.specimenWrap}>
      <span className={styles.specimen} data-face="standin">
        Aa
      </span>
      <span className={styles.standin}>Shown in a stand-in face</span>
    </span>
  );
}

function SpecimenOpenSans() {
  return (
    <span className={styles.specimen} data-face="open-sans">
      Aa
    </span>
  );
}

// What's next.
function Sync() {
  return (
    <span className={styles.pair}>
      <Doc />
      <RefreshCw className={styles.syncIcon} size={16} strokeWidth={2} />
      <Doc />
    </span>
  );
}

function Qr() {
  return (
    <span className={styles.labelled}>
      <span className={styles.qr}>
        {Array.from({ length: 25 }, (_, i) => (
          <span key={i} data-on={[0, 1, 3, 4, 5, 7, 9, 12, 14, 15, 17, 19, 20, 21, 23, 24].includes(i)} />
        ))}
      </span>
      <span className={styles.verified} data-corner="true">
        <Check size={10} strokeWidth={3} />
      </span>
    </span>
  );
}

function Profile() {
  return (
    <span className={`${styles.card} ${styles.profile}`}>
      <span className={styles.profileAvatar}>
        <User size={16} strokeWidth={1.75} />
      </span>
      <Lines count={2} short />
    </span>
  );
}

function Dashboard() {
  return (
    <span className={`${styles.card} ${styles.dashboard}`}>
      <Lines count={1} short />
      <span className={styles.bars}>
        <span className={styles.bar} style={{ height: '70%' }} />
        <span className={styles.bar} data-alt="true" style={{ height: '45%' }} />
      </span>
    </span>
  );
}

export const MOOLROOP_MINIS: Record<string, ReactNode> = {
  'scattered-docs': <ScatteredDocs />,
  'dense-row': <DenseRow />,
  'broken-link': <BrokenLink />,
  'registry-row': <RegistryRow />,
  'forum-post': <ForumPost />,
  'vague-label': <VagueLabel />,
  'question-product': <QuestionProduct />,
  lookalikes: <Lookalikes />,
  'pin-no-cert': <PinNoCert />,
  'stopwatch-tick': <StopwatchTick />,
  'summary-link': <SummaryLink />,
  'pin-product': <PinProduct />,
  'craft-branch': <CraftBranch />,
  'two-entries': <TwoEntries />,
  'search-grid': <SearchGrid />,
  badge: <Badge />,
  'dense-doc': <Doc dense />,
  'two-layers': <TwoLayers />,
  'aa-standin': <SpecimenStandIn />,
  'aa-open-sans': <SpecimenOpenSans />,
  sync: <Sync />,
  qr: <Qr />,
  profile: <Profile />,
  dashboard: <Dashboard />,
};
