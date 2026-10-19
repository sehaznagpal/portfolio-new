import type { CSSProperties } from 'react';
import ArticleHero from '../components/article/ArticleHero';
import StorySection from '../components/caseStudy/blocks/StorySection';
import { storyIndex } from '../components/caseStudy/blocks/storyIndex';
import CaseStudyEnd from '../components/caseStudy/CaseStudyEnd';
import CaseStudyLayout from '../components/caseStudy/CaseStudyLayout';
import FraudPoster from '../components/caseStudy/FraudPoster';
import ResearchStructure from '../components/caseStudy/fraud/ResearchStructure';
import ExperimentSitemap from '../components/caseStudy/fraud/ExperimentSitemap';
import { FRAUD_MINIS } from '../components/caseStudy/fraud/FraudMinis';
import ResultsGraphs from '../components/caseStudy/fraud/ResultsGraphs';
import UserJourney from '../components/caseStudy/fraud/UserJourney';
import { FRAUD_STORY } from '../data/articles/fraud';
import { caseStudyTitle } from '../data/caseStudies';
import { FOOTER_PHOTOS } from '../data/footerPhotos';
import { usePageMeta } from '../lib/usePageMeta';
import styles from './ArticlePage.module.css';

/* Big visual and mini illustration ids used in FRAUD_STORY. */
const VISUALS = {
  frames: {
    'research-structure': <ResearchStructure />,
    'experiment-sitemap': <ExperimentSitemap />,
    'user-journey': <UserJourney />,
    results: <ResultsGraphs />,
  },
  minis: FRAUD_MINIS,
};

export default function FraudCaseStudyPage() {
  usePageMeta({ page: caseStudyTitle('fraud'), description: `${FRAUD_STORY.subtitle}.` });

  return (
    <CaseStudyLayout
      index={storyIndex(FRAUD_STORY)}
      lampColor={FRAUD_STORY.lampColor}
      tagColor={FRAUD_STORY.tagColor}
      footerPhoto={FOOTER_PHOTOS.fraud}
      after={<CaseStudyEnd current="fraud" link={FRAUD_STORY.closingLink} />}
    >
      <article
        className={styles.article}
        style={
          {
            '--case-accent': FRAUD_STORY.accent,
            '--story-ink-dark': FRAUD_STORY.accentInk.dark,
            '--story-ink-light': FRAUD_STORY.accentInk.light,
            '--story-panel': FRAUD_STORY.framePanel,
            '--story-panel-ink': FRAUD_STORY.framePanelInk,
          } as CSSProperties
        }
      >
        <div className={styles.hero}>
          <ArticleHero article={FRAUD_STORY} image={<FraudPoster />} />
        </div>
        {FRAUD_STORY.sections.map((section) => (
          <StorySection key={section.id} section={section} visuals={VISUALS} />
        ))}
      </article>
    </CaseStudyLayout>
  );
}
