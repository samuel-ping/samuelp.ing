'use client';

import { useState } from 'react';
import Image from 'next/image';

import profilePic from '@/public/assets/sam.jpg';
import gradPic from '@/public/assets/grad.jpg';
import sophiaPic from '@/public/assets/sophia.jpg';
import tennisPic from '@/public/assets/tennis.jpg';
import runningPic from '@/public/assets/running.jpg';
import theatrePic from '@/public/assets/theatre.jpg';
import monsteraPic from '@/public/assets/thai.jpg'

const bioItems = [
  { text: 'software engineer', photo: null },
  { text: 'Rutgers University graduate', photo: gradPic },
  { text: 'cat lover (but dog liker)', photo: sophiaPic },
  { text: 'avid tennis player', photo: tennisPic },
  { text: 'fomo runner', photo: runningPic },
  { text: 'infrequent theater performer', photo: theatrePic },
  { text: 'neglectful plant dad', photo: monsteraPic },
];

export default function BioSection({ button }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredName, setHoveredName] = useState(false);

  const currentPhoto =
    hoveredName
      ? profilePic
      : hoveredIndex !== null && bioItems[hoveredIndex].photo
        ? bioItems[hoveredIndex].photo
        : profilePic;

  return (
    <div className="md:pt-16 pb-16 mx-6 flex flex-col items-center gap-y-4 md:flex-row-reverse md:justify-between">
      <Image
        src={currentPhoto}
        alt="Photo of Sam"
        placeholder="blur"
        priority
        className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover transition-opacity duration-150"
      />

      <div className="max-w-lg flex flex-col space-y-5">
        <span className="text-4xl font-medium">
          Hey! I&apos;m{' '}
          <span
            className={`text-green-300 dark:text-green-50 cursor-default transition-all duration-100 ${hoveredName ? 'underline decoration-wavy underline-offset-4' : ''}`}
            onMouseEnter={() => setHoveredName(true)}
            onMouseLeave={() => setHoveredName(false)}
          >Sam Ping</span>,
          a...
        </span>
        <span className="text-2xl font-light">
          {'... '}
          {bioItems.map((item, i) => (
            <span key={i}>
              <span
                className={`cursor-default transition-all duration-100 ${
                  hoveredIndex === i
                    ? 'underline decoration-wavy underline-offset-4'
                    : ''
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {item.text}
              </span>
              {i < bioItems.length - 2
                ? ', '
                : i === bioItems.length - 2
                  ? ', and '
                  : '.'}
            </span>
          ))}
        </span>
        {button}
      </div>
    </div>
  );
}
