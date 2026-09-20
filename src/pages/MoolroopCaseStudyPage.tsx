import CaseStudyHero from '../components/caseStudy/CaseStudyHero';
import MoolroopPoster from '../components/caseStudy/MoolroopPoster';
import CaseStudyPlaceholder from '../components/caseStudy/CaseStudyPlaceholder';
import styles from './CaseStudyPage.module.css';

/* Role/Duration/tags use the desktop Figma frame's values — see the same
   note in DrCuterusCaseStudyPage.tsx: the mobile frame carries the Fraud
   case study's leftover text from being duplicated as a starting point. */
export default function MoolroopCaseStudyPage() {
  return (
    <div className={styles.page}>
      <CaseStudyHero
        title="Making authenticity as easy to verify as price"
        role="Design & Prototype"
        duration="1 month (2026)"
        tags={['Buyer-side Mobile App', 'Figma Prototype']}
      >
        <MoolroopPoster />
      </CaseStudyHero>
      <CaseStudyPlaceholder />
    </div>
  );
}
