import type { CSSProperties } from 'react';
import ArticleHero from '../components/article/ArticleHero';
import ImageSet from '../components/article/ImageSet';
import StorySection from '../components/caseStudy/blocks/StorySection';
import { storyIndex } from '../components/caseStudy/blocks/storyIndex';
import CaseStudyEnd from '../components/caseStudy/CaseStudyEnd';
import CaseStudyLayout from '../components/caseStudy/CaseStudyLayout';
import DrCuterusPoster from '../components/caseStudy/DrCuterusPoster';
import { DR_CUTERUS_MINIS } from '../components/caseStudy/drCuterus/DrCuterusMinis';
import SiteStructure from '../components/caseStudy/drCuterus/SiteStructure';
import { DR_CUTERUS_IMAGE_SETS, DR_CUTERUS_SITE_STRUCTURE, DR_CUTERUS_STORY } from '../data/articles/drCuterus';
import { FOOTER_PHOTOS } from '../data/footerPhotos';
import styles from './ArticlePage.module.css';

/* Big visual and mini illustration ids used in DR_CUTERUS_STORY. */
const VISUALS = {
  frames: {
    'site-structure': <SiteStructure {...DR_CUTERUS_SITE_STRUCTURE} />,
    ...Object.fromEntries(
      Object.entries(DR_CUTERUS_IMAGE_SETS).map(([id, set]) => [id, <ImageSet key={id} {...set} />]),
    ),
  },
  minis: DR_CUTERUS_MINIS,
};

export default function DrCuterusCaseStudyPage() {
  return (
    <CaseStudyLayout
      index={storyIndex(DR_CUTERUS_STORY)}
      lampColor={DR_CUTERUS_STORY.lampColor}
      tagColor={DR_CUTERUS_STORY.tagColor}
      footerPhoto={FOOTER_PHOTOS.drCuterus}
      after={<CaseStudyEnd current="dr-cuterus" link={DR_CUTERUS_STORY.closingLink} />}
    >
      <article
        className={`${styles.article} ${styles.story}`}
        style={
          {
            '--case-accent': DR_CUTERUS_STORY.accent,
            '--story-ink-dark': DR_CUTERUS_STORY.accentInk.dark,
            '--story-ink-light': DR_CUTERUS_STORY.accentInk.light,
            '--story-panel': DR_CUTERUS_STORY.framePanel,
            '--story-panel-ink': DR_CUTERUS_STORY.framePanelInk,
          } as CSSProperties
        }
      >
        <div className={styles.hero}>
          <ArticleHero article={DR_CUTERUS_STORY} image={<DrCuterusPoster />} spacing="story" />
        </div>
        {DR_CUTERUS_STORY.sections.map((section) => (
          <StorySection key={section.id} section={section} visuals={VISUALS} />
        ))}
      </article>
    </CaseStudyLayout>
  );
}
