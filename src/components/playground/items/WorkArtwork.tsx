import type { AutoHoverKey } from '../useAutoHoverCycle';
import PhotoboothItem from './PhotoboothItem';
import MotionDemoItem from './MotionDemoItem';
import WebsiteItem from './WebsiteItem';
import ExtrasItem from './ExtrasItem';
import SipStudioItem from './SipStudioItem';
import AmoraItem from './AmoraItem';
import WorktapeItem from './WorktapeItem';

/* Which auto-hover slot each work item plays in on touch screens. */
export const WORK_HOVER_KEYS: Record<string, AutoHoverKey> = {
  photobooth: 'photobooth',
  motion: 'motionDemo',
  rewired: 'website',
  extras: 'extras',
  sip: 'sipStudio',
  amora: 'amora',
  worktape: 'worktape',
};

/* A work item's own artwork, drawn the same on the canvas and in the grid. */
export default function WorkArtwork({ id, autoHover, onOpen }: { id: string; autoHover: boolean; onOpen: () => void }) {
  switch (id) {
    case 'photobooth':
      return <PhotoboothItem autoHover={autoHover} onOpen={onOpen} />;
    case 'motion':
      return <MotionDemoItem autoHover={autoHover} onOpen={onOpen} />;
    case 'rewired':
      return <WebsiteItem autoHover={autoHover} />;
    case 'extras':
      return <ExtrasItem autoHover={autoHover} onOpen={onOpen} />;
    case 'sip':
      return <SipStudioItem autoHover={autoHover} onOpen={onOpen} />;
    case 'amora':
      return <AmoraItem autoHover={autoHover} />;
    case 'worktape':
      return <WorktapeItem autoHover={autoHover} onOpen={onOpen} />;
    default:
      return null;
  }
}
