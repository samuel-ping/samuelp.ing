'use client';

import Link from 'next/link';

import NavbarButton from '@components/navbarButton';
import { EnvelopeIcon } from '@components/icons';
import { GitHubIcon } from '@components/icons';
import { LinkedInIcon } from '@components/icons';

const Footer = ({ navbarButtons }) => (
  <footer className="flex flex-col space-y-5">
    <div className="flex flex-row justify-end space-x-4">
      {navbarButtons.map((navButton) => (
        <NavbarButton
          title={navButton.title}
          route={navButton.route}
          key={navButton.route}
        />
      ))}
    </div>
    <div className="w-full flex flex-row justify-between items-center">
      <span className="font-light">Made by Sam Ping &copy; 2024</span>
      <div className="flex flex-row space-x-5">
        <Link
          href="https://github.com/samuel-ping"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center">
            <GitHubIcon className="h-[28px] w-[28px] text-black hover:text-green-500 transition ease-in-out duration-300" />
          </button>
        </Link>
        <Link
          href="https://linkedin.com/in/samuelping"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center">
            <LinkedInIcon className="h-[28px] w-[28px] text-black hover:text-green-500 transition ease-in-out duration-300" />
          </button>
        </Link>
        <Link
          href="mailto:samuel.y.ping@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="flex items-center">
            <EnvelopeIcon className="h-[28px] w-[28px] text-black hover:text-green-500 transition ease-in-out duration-300" />
          </button>
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
