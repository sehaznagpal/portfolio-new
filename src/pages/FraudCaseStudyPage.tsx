import CaseStudyHero from '../components/caseStudy/CaseStudyHero';
import FraudPoster from '../components/caseStudy/FraudPoster';
import CaseStudyPlaceholder from '../components/caseStudy/CaseStudyPlaceholder';
import Footer from '../components/footer/Footer';
import styles from './CaseStudyPage.module.css';

export default function FraudCaseStudyPage() {
  return (
    <>
      <div className={styles.page}>
        <CaseStudyHero
          title="A security problem that isn't really about security"
          role="Sole Researcher and author"
          duration="1 year (2025-26)"
          tags={['Choice Architecture', 'RCT Experiment', 'Payment Simulation']}
        >
          <FraudPoster />
        </CaseStudyHero>
        <CaseStudyPlaceholder />
      </div>
      <Footer />
    </>
  );
}
