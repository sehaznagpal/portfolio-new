import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { LinkSection, SiteLinkDef } from '../../data/siteLinks';
import PlaygroundLink from './PlaygroundLink';

// Modified clicks (new tab etc.) behave like a normal link.
function isPlainClick(event: MouseEvent) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
}

/* One link from SITE_LINK_GROUPS: a section move when `onSection` is given
   (Home), the playground's sweep transition, a route, a download, or a mail
   or new-tab link. `onNavigate` runs before any in-app navigation (e.g. About
   closing itself first). */
export default function SiteLink({
  link,
  className,
  onSection,
  onNavigate,
}: {
  link: SiteLinkDef;
  className?: string;
  onSection?: (section: LinkSection) => void;
  onNavigate?: () => void;
}) {
  if (link.external) {
    return (
      <a className={className} href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }

  if (link.download) {
    return (
      <a className={className} href={link.href} download>
        {link.label}
      </a>
    );
  }

  if (link.playground) {
    return (
      <PlaygroundLink className={className} onNavigate={onNavigate}>
        {link.label}
      </PlaygroundLink>
    );
  }

  const { section } = link;
  if (section && onSection) {
    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      if (!isPlainClick(event)) return;
      event.preventDefault();
      onSection?.(section!);
    }
    return (
      <a className={className} href={link.href} onClick={handleClick}>
        {link.label}
      </a>
    );
  }

  if (link.href.startsWith('/')) {
    return (
      <Link className={className} to={link.href} onClick={(event) => isPlainClick(event) && onNavigate?.()}>
        {link.label}
      </Link>
    );
  }

  return (
    <a className={className} href={link.href}>
      {link.label}
    </a>
  );
}
