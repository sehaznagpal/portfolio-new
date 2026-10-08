import ArticleHero from '../components/article/ArticleHero';
import ArticleSection from '../components/article/ArticleSection';
import CaseStudyEnd from '../components/caseStudy/CaseStudyEnd';
import CaseStudyLayout from '../components/caseStudy/CaseStudyLayout';
import DrCuterusPoster from '../components/caseStudy/DrCuterusPoster';
import ImageSet from '../components/article/ImageSet';
import SiteStructure from '../components/caseStudy/drCuterus/SiteStructure';
import { DR_CUTERUS_ARTICLE, DR_CUTERUS_IMAGE_SETS, DR_CUTERUS_SITE_STRUCTURE } from '../data/articles/drCuterus';
import { FOOTER_PHOTOS } from '../data/footerPhotos';
import styles from './ArticlePage.module.css';

/* Visual band ids used in DR_CUTERUS_ARTICLE. */
const VISUALS = {
  'site-structure': <SiteStructure {...DR_CUTERUS_SITE_STRUCTURE} />,
  ...Object.fromEntries(
    Object.entries(DR_CUTERUS_IMAGE_SETS).map(([id, set]) => [id, <ImageSet key={id} {...set} />]),
  ),
};

export default function DrCuterusCaseStudyPage() {
  return (
    <CaseStudyLayout
      footerPhoto={FOOTER_PHOTOS.drCuterus}
      after={<CaseStudyEnd current="dr-cuterus" link={DR_CUTERUS_ARTICLE.closingLink} />}
    >
      <article className={styles.article}>
        <div className={styles.hero}>
          <ArticleHero article={DR_CUTERUS_ARTICLE} image={<DrCuterusPoster />} />
        </div>
        {DR_CUTERUS_ARTICLE.sections.map((section) => (
          <ArticleSection key={section.number} section={section} visuals={VISUALS} />
        ))}
      </article>
    </CaseStudyLayout>
  );
}
