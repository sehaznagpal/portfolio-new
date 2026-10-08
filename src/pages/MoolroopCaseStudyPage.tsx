import ArticleHero from '../components/article/ArticleHero';
import ArticleSection from '../components/article/ArticleSection';
import ImageSet from '../components/article/ImageSet';
import CaseStudyEnd from '../components/caseStudy/CaseStudyEnd';
import CaseStudyLayout from '../components/caseStudy/CaseStudyLayout';
import MoolroopPoster from '../components/caseStudy/MoolroopPoster';
import ComparisonTable from '../components/caseStudy/moolroop/ComparisonTable';
import StepFlow from '../components/caseStudy/moolroop/StepFlow';
import SitemapTree from '../components/caseStudy/moolroop/SitemapTree';
import ScreenRow from '../components/caseStudy/moolroop/ScreenRow';
import VisualLanguage from '../components/caseStudy/moolroop/VisualLanguage';
import {
  MOOLROOP_ARTICLE,
  MOOLROOP_COMPARISON,
  MOOLROOP_FLOW,
  MOOLROOP_RECORD,
  MOOLROOP_SCREENS,
  MOOLROOP_SITEMAP,
  MOOLROOP_VISUAL_LANGUAGE,
} from '../data/articles/moolroop';
import { FOOTER_PHOTOS } from '../data/footerPhotos';
import styles from './ArticlePage.module.css';

/* Visual band ids used in MOOLROOP_ARTICLE. */
const VISUALS = {
  'official-record': <ImageSet {...MOOLROOP_RECORD} />,
  'competitive-landscape': <ComparisonTable {...MOOLROOP_COMPARISON} />,
  opportunity: <StepFlow {...MOOLROOP_FLOW} />,
  'app-structure': <SitemapTree {...MOOLROOP_SITEMAP} />,
  'visual-language': <VisualLanguage {...MOOLROOP_VISUAL_LANGUAGE} />,
  ...Object.fromEntries(
    Object.entries(MOOLROOP_SCREENS).map(([id, row]) => [id, <ScreenRow key={id} {...row} />]),
  ),
};

export default function MoolroopCaseStudyPage() {
  return (
    <CaseStudyLayout
      footerPhoto={FOOTER_PHOTOS.moolroop}
      after={<CaseStudyEnd current="moolroop" link={MOOLROOP_ARTICLE.closingLink} />}
    >
      <article className={styles.article}>
        <div className={styles.hero}>
          <ArticleHero article={MOOLROOP_ARTICLE} image={<MoolroopPoster />} />
        </div>
        {MOOLROOP_ARTICLE.sections.map((section) => (
          <ArticleSection key={section.number} section={section} visuals={VISUALS} />
        ))}
      </article>
    </CaseStudyLayout>
  );
}
