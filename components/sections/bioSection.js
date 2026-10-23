'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import profilePic from '@/public/assets/sam.webp';
import swePic from '@/public/assets/swe.webp';
import gradPic from '@/public/assets/grad.webp';
import sophiaPic from '@/public/assets/sophia.webp';
import tennisPic from '@/public/assets/tennis.webp';
import runningPic from '@/public/assets/running.webp';
import theatrePic from '@/public/assets/theatre.webp';
import monsteraPic from '@/public/assets/thai.webp';

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

  const activeIndex = hoveredName
    ? NAME
    : hoveredIndex !== null
      ? hoveredIndex
      : autoIndex;

  useEffect(() => {
    if (hoveredIndex !== null || hoveredName) return;
    // Don't cycle photos on a timer for visitors who ask for less motion.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setTimeout(() => {
      setAutoIndex((prev) => (prev === bioItems.length - 1 ? NAME : prev + 1));
    }, 2300);
    return () => clearTimeout(timer);
  }, [autoIndex, hoveredIndex, hoveredName]);

  const targetPhoto =
    activeIndex === NAME
      ? profilePic
      : (bioItems[activeIndex].photo ?? profilePic);

  // Two-slot crossfade: load next photo into the back slot, then swap on next frame
  const [crossfade, setCrossfade] = useState({
    photoA: targetPhoto,
    photoB: targetPhoto,
    aIsFront: true,
  });

  useEffect(() => {
    let swapFrame;
    // Load the next photo into the back slot on one frame...
    const loadFrame = requestAnimationFrame(() => {
      setCrossfade((prev) => {
        if (prev.aIsFront) {
          return { ...prev, photoB: targetPhoto };
        } else {
          return { ...prev, photoA: targetPhoto };
        }
      });
      // ...then swap slots on the following frame so it fades in
      swapFrame = requestAnimationFrame(() => {
        setCrossfade((prev) => ({ ...prev, aIsFront: !prev.aIsFront }));
      });
    });
    return () => {
      cancelAnimationFrame(loadFrame);
      if (swapFrame) cancelAnimationFrame(swapFrame);
    };
  }, [targetPhoto]);

  return (
    <div className="flex flex-col items-center gap-x-12 gap-y-4 lg:flex-row-reverse lg:justify-center">
      <div className="relative size-48 shrink-0 md:size-64">
        <Image
          src={crossfade.photoA}
          alt="Photo of Sam"
          placeholder="blur"
          priority
          className={`absolute inset-0 size-full rounded-full object-cover transition-opacity duration-500 ${crossfade.aIsFront ? 'opacity-100' : 'opacity-0'}`}
        />
        <Image
          src={crossfade.photoB}
          alt="Photo of Sam"
          placeholder="blur"
          priority
          className={`absolute inset-0 size-full rounded-full object-cover transition-opacity duration-500 ${!crossfade.aIsFront ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <div className="flex max-w-xl flex-col gap-y-5">
        <h1 className="font-display text-5xl leading-display tracking-tight md:text-6xl">
          Hey! I&apos;m{' '}
          <span
            className={`wavy-underline wavy-draw cursor-default whitespace-nowrap text-green-600 dark:text-green-100 ${activeIndex === NAME ? 'marker-active' : ''}`}
            onMouseEnter={() => setHoveredName(true)}
            onMouseLeave={() => setHoveredName(false)}
          >
            Sam Ping
          </span>
          , a...
        </h1>
        <span
          className="text-xl font-light md:text-2xl"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {'... '}
          {bioItems.map((item, i) => (
            <span
              key={i}
              className="cursor-default"
              onMouseEnter={() => setHoveredIndex(i)}
            >
              <span className={activeIndex === i ? 'marker-active' : ''}>
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
