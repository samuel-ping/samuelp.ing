import Link from 'next/link';

import { EnvelopeIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';

/**
 * Site footer. The header nav is always on screen, so repeating the same links
 * here was pure duplication — the footer carries only the outbound links.
 */
const Footer = () => {
  return (
    <footer className="mt-auto mb-2 flex w-full items-center justify-center gap-x-4 gutter-x">
      <Link
        href="https://github.com/samuel-ping"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center hover-tint transition-colors"
        data-umami-event="GitHub profile viewed"
      >
        <GitHubIcon className="size-10" />
      </Link>
      <Link
        href="https://linkedin.com/in/samuelping"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center hover-tint transition-colors"
        data-umami-event="LinkedIn profile viewed"
      >
        <LinkedInIcon className="size-10" />
      </Link>
      <Link
        href="mailto:samuel.y.ping@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center hover-tint transition-colors"
        data-umami-event="email button clicked"
      >
        <EnvelopeIcon className="size-10" />
      </Link>
    </footer>
  );
};

export default Footer;
