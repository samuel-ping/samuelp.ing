'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import profilePic from '@/public/assets/sam.jpg';
import swePic from '@/public/assets/swe.jpg';
import gradPic from '@/public/assets/grad.jpg';
import sophiaPic from '@/public/assets/sophia.jpg';
import tennisPic from '@/public/assets/tennis.jpg';
import runningPic from '@/public/assets/running.jpg';
import theatrePic from '@/public/assets/theatre.jpg';
import monsteraPic from '@/public/assets/thai.jpg'

const bioItems = [
  { text: 'software engineer', photo: swePic },
  { text: 'Rutgers University graduate', photo: gradPic },
  { text: 'cat lover (but dog liker)', photo: sophiaPic },
  { text: 'avid tennis player', photo: tennisPic },
  { text: 'fomo runner', photo: runningPic },
  { text: 'infrequent theater performer', photo: theatrePic },
  { text: 'neglectful plant dad', photo: monsteraPic },
];

const NAME = -1;

export default function BioSection({ button }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredName, setHoveredName] = useState(false);
  const [autoIndex, setAutoIndex] = useState(NAME);

  const activeIndex = hoveredName ? NAME : hoveredIndex !== null ? hoveredIndex : autoIndex;

  useEffect(() => {
    if (hoveredIndex !== null || hoveredName) return;
    const timer = setTimeout(() => {
      setAutoIndex((prev) => (prev === bioItems.length - 1 ? NAME : prev + 1));
    }, 2300);
    return () => clearTimeout(timer);
  }, [autoIndex, hoveredIndex, hoveredName]);

  const targetPhoto =
    activeIndex === NAME
      ? profilePic
      : bioItems[activeIndex].photo ?? profilePic;

  // Two-slot crossfade: load next photo into the back slot, then swap on next frame
  const [crossfade, setCrossfade] = useState({
    photoA: targetPhoto,
    photoB: targetPhoto,
    aIsFront: true,
  });

  useEffect(() => {
    setCrossfade((prev) => {
      if (prev.aIsFront) {
        return { ...prev, photoB: targetPhoto };
      } else {
        return { ...prev, photoA: targetPhoto };
      }
    });
    const frame = requestAnimationFrame(() => {
      setCrossfade((prev) => ({ ...prev, aIsFront: !prev.aIsFront }));
    });
    return () => cancelAnimationFrame(frame);
  }, [targetPhoto]);

  return (
    <div className="md:pt-16 pb-16 mx-6 flex flex-col items-center gap-x-12 gap-y-4 md:flex-row-reverse md:justify-between">
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <Image
          src={crossfade.photoA}
          alt="Photo of Sam"
          placeholder="blur"
          priority
          className={`absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-500 ${crossfade.aIsFront ? 'opacity-100' : 'opacity-0'}`}
        />
        <Image
          src={crossfade.photoB}
          alt="Photo of Sam"
          placeholder="blur"
          priority
          className={`absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-500 ${!crossfade.aIsFront ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <div className="max-w-lg flex flex-col space-y-5">
        <span className="text-4xl font-medium">
          Hey! I&apos;m{' '}
          <span
            className={`text-green-300 dark:text-green-50 cursor-default transition-all duration-100 ${activeIndex === NAME ? 'underline decoration-wavy underline-offset-9' : ''}`}
            onMouseEnter={() => setHoveredName(true)}
            onMouseLeave={() => setHoveredName(false)}
          >Sam Ping</span>,
          a...
        </span>
        <span className="text-2xl font-light" onMouseLeave={() => setHoveredIndex(null)}>
          {'... '}
          {bioItems.map((item, i) => (
            <span
              key={i}
              className="cursor-default"
              onMouseEnter={() => setHoveredIndex(i)}
            >
              <span
                className={`transition-all duration-100 ${
                  activeIndex === i
                    ? 'underline decoration-wavy underline-offset-4'
                    : ''
                }`}
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
