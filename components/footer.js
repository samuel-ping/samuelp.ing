'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import NavbarButton from '@/components/navbarButton';
import { EnvelopeIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';

const Footer = ({ navbarButtons }) => {
  const pathname = usePathname();

  return (
    <footer className="mt-auto mb-2 flex flex-col items-center space-y-3 justify-self-end">
      <div className="flex flex-row justify-center space-x-4">
        {navbarButtons.map((button) => (
          <NavbarButton
            active={`/${pathname.split('/')[1]}` === button.route}
            title={button.title}
            route={button.route}
            key={button.route}
          />
        ))}
      </div>

      <div className="flex w-full flex-row items-center justify-center">
        <div className="flex flex-row items-center space-x-5">
          <Link
            href="https://github.com/samuel-ping"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="flex items-center"
              data-umami-event="GitHub profile viewed"
            >
              <GitHubIcon className="size-10 transition-colors hover:text-green-400 dark:hover:text-green-50" />
            </button>
          </Link>
          <Link
            href="https://linkedin.com/in/samuelping"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="flex items-center"
              data-umami-event="LinkedIn profile viewed"
            >
              <LinkedInIcon className="size-10 transition-colors hover:text-green-400 dark:hover:text-green-50" />
            </button>
          </Link>
          <Link
            href="mailto:samuel.y.ping@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className="flex items-center"
              data-umami-event="email button clicked"
            >
              <EnvelopeIcon className="size-10 transition-colors hover:text-green-400 dark:hover:text-green-50" />
            </button>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
