import ArticleButton from '../components/article/ArticleButton';
import ArticleHero from '../components/article/ArticleHero';
import ArticleSection from '../components/article/ArticleSection';
import CaseStudyLayout from '../components/caseStudy/CaseStudyLayout';
import FraudPoster from '../components/caseStudy/FraudPoster';
import ResearchStructure from '../components/caseStudy/fraud/ResearchStructure';
import ExperimentSitemap from '../components/caseStudy/fraud/ExperimentSitemap';
import ResultsGraphs from '../components/caseStudy/fraud/ResultsGraphs';
import UserJourney from '../components/caseStudy/fraud/UserJourney';
import { FRAUD_ARTICLE } from '../data/articles/fraud';
import styles from './FraudCaseStudyPage.module.css';

/* Visual band ids used in FRAUD_ARTICLE. */
const VISUALS = {
  'research-structure': <ResearchStructure />,
  'experiment-sitemap': <ExperimentSitemap />,
  'user-journey': <UserJourney />,
  results: <ResultsGraphs />,
};

export default function FraudCaseStudyPage() {
  return (
    <CaseStudyLayout
      after={
        <div className={styles.closing}>
          <ArticleButton link={FRAUD_ARTICLE.closingLink} />
        </div>
      }
    >
      <article className={styles.article}>
        <div className={styles.hero}>
          <ArticleHero article={FRAUD_ARTICLE} image={<FraudPoster />} />
        </div>
        {FRAUD_ARTICLE.sections.map((section) => (
          <ArticleSection key={section.number} section={section} visuals={VISUALS} />
        ))}
      </article>
    </CaseStudyLayout>
  );
}
