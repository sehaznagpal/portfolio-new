import type { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { LinkSection, SiteLinkDef } from '../../data/siteLinks';

/* One link from SITE_LINK_GROUPS: a section move when `onSection` is given
   (Home), otherwise a route, mail or new-tab link. */
export default function SiteLink({
  link,
  className,
  onSection,
}: {
  link: SiteLinkDef;
  className?: string;
  onSection?: (section: LinkSection) => void;
}) {
  if (link.external) {
    return (
      <a className={className} href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }

  const { section } = link;
  if (section && onSection) {
    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      // Modified clicks (new tab etc.) behave like a normal link.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
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
      <Link className={className} to={link.href}>
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
