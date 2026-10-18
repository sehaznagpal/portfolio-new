import type { CSSProperties } from 'react';
import ArticleHero from '../components/article/ArticleHero';
import ImageSet from '../components/article/ImageSet';
import StorySection from '../components/caseStudy/blocks/StorySection';
import { storyIndex } from '../components/caseStudy/blocks/storyIndex';
import CaseStudyEnd from '../components/caseStudy/CaseStudyEnd';
import CaseStudyLayout from '../components/caseStudy/CaseStudyLayout';
import MoolroopPoster from '../components/caseStudy/MoolroopPoster';
import { MOOLROOP_MINIS } from '../components/caseStudy/moolroop/MoolroopMinis';
import SitemapTree from '../components/caseStudy/moolroop/SitemapTree';
import ScreenRow from '../components/caseStudy/moolroop/ScreenRow';
import { MOOLROOP_RECORD, MOOLROOP_SCREENS, MOOLROOP_SITEMAP, MOOLROOP_STORY } from '../data/articles/moolroop';
import { FOOTER_PHOTOS } from '../data/footerPhotos';
import styles from './ArticlePage.module.css';

/* Big visual and mini illustration ids used in MOOLROOP_STORY. */
const VISUALS = {
  frames: {
    'official-record': <ImageSet {...MOOLROOP_RECORD} />,
    'app-structure': <SitemapTree {...MOOLROOP_SITEMAP} />,
    ...Object.fromEntries(
      Object.entries(MOOLROOP_SCREENS).map(([id, row]) => [id, <ScreenRow key={id} {...row} />]),
    ),
  },
  minis: MOOLROOP_MINIS,
};

export default function MoolroopCaseStudyPage() {
  return (
    <CaseStudyLayout
      index={storyIndex(MOOLROOP_STORY)}
      lampColor={MOOLROOP_STORY.lampColor}
      tagColor={MOOLROOP_STORY.tagColor}
      footerPhoto={FOOTER_PHOTOS.moolroop}
      after={<CaseStudyEnd current="moolroop" link={MOOLROOP_STORY.closingLink} />}
    >
      <article
        className={styles.article}
        style={
          {
            '--case-accent': MOOLROOP_STORY.accent,
            '--story-ink-dark': MOOLROOP_STORY.accentInk.dark,
            '--story-ink-light': MOOLROOP_STORY.accentInk.light,
            '--story-panel': MOOLROOP_STORY.framePanel,
            '--story-panel-ink': MOOLROOP_STORY.framePanelInk,
          } as CSSProperties
        }
      >
        <div className={styles.hero}>
          <ArticleHero article={MOOLROOP_STORY} image={<MoolroopPoster />} />
        </div>
        {MOOLROOP_STORY.sections.map((section) => (
          <StorySection key={section.id} section={section} visuals={VISUALS} />
        ))}
      </article>
    </CaseStudyLayout>
  );
}
