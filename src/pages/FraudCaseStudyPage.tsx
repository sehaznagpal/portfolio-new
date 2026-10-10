import ArticleHero from '../components/article/ArticleHero';
import ArticleSection from '../components/article/ArticleSection';
import { articleIndex } from '../components/article/articleIndex';
import CaseStudyEnd from '../components/caseStudy/CaseStudyEnd';
import CaseStudyLayout from '../components/caseStudy/CaseStudyLayout';
import FraudPoster from '../components/caseStudy/FraudPoster';
import ResearchStructure from '../components/caseStudy/fraud/ResearchStructure';
import ExperimentSitemap from '../components/caseStudy/fraud/ExperimentSitemap';
import ResultsGraphs from '../components/caseStudy/fraud/ResultsGraphs';
import UserJourney from '../components/caseStudy/fraud/UserJourney';
import { FRAUD_ARTICLE } from '../data/articles/fraud';
import { FOOTER_PHOTOS } from '../data/footerPhotos';
import styles from './ArticlePage.module.css';

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
      index={articleIndex(FRAUD_ARTICLE)}
      footerPhoto={FOOTER_PHOTOS.fraud}
      after={<CaseStudyEnd current="fraud" link={FRAUD_ARTICLE.closingLink} />}
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
