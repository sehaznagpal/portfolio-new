import CaseStudyHero from '../components/caseStudy/CaseStudyHero';
import DrCuterusPoster from '../components/caseStudy/DrCuterusPoster';
import CaseStudyPlaceholder from '../components/caseStudy/CaseStudyPlaceholder';
import styles from './CaseStudyPage.module.css';

/* Role/Duration/tags here use the desktop Figma frame's values — the
   mobile frame carries the Fraud case study's own Role/Duration/tags text
   left over from being duplicated as a starting point (image, title, and
   banner were all updated there, this text wasn't), so the desktop frame's
   values are used for both breakpoints as the evidently-correct data. */
export default function DrCuterusCaseStudyPage() {
  return (
    <div className={styles.page}>
      <CaseStudyHero
        title="Creating an identity which is unmistakably her"
        role="Design Lead"
        duration="4 months (2026)"
        tags={['Client Project', 'Website Design', 'Design System']}
      >
        <DrCuterusPoster />
      </CaseStudyHero>
      <CaseStudyPlaceholder />
    </div>
  );
}
