import Link from 'next/link';

import { EnvelopeIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';

const linkClass =
  "relative flex items-center before:absolute before:-inset-3 before:content-[''] hover-tint transition-colors";

const Footer = () => {
  return (
    <footer className="mt-auto mb-6 flex w-full justify-center gutter-x">
      <div className="flex w-full max-w-68 flex-col items-center">
        <div
          aria-hidden="true"
          className="wavy-rule w-full text-green-200 dark:text-green-600"
        />
        <div className="flex items-center gap-x-8 pt-4">
          <Link
            href="https://github.com/samuel-ping"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            data-umami-event="GitHub profile viewed"
          >
            <GitHubIcon className="size-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/samuelping"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            data-umami-event="LinkedIn profile viewed"
          >
            <LinkedInIcon className="size-6" />
          </Link>
          <Link
            href="mailto:samuel.y.ping@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            data-umami-event="email button clicked"
          >
            <EnvelopeIcon className="size-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
