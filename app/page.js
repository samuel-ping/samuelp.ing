import Image from 'next/image';
import Link from 'next/link';

import Button from '@/components/rightArrowButton';
import { ProjectCardCarousel } from '@/components/projectCardCarousel';

import profilePic from '@/public/assets/sam.jpg';

import { GetProjectDetails } from '@/utils/mdxUtils';

export default async function Page() {
  const projects = await GetProjectDetails(6);

  return (
    <div className="max-w-full xl:max-w-screen-lg 2xl:max-w-screen-xl">
      {/* about me section */}
      <div className="md:pt-16 pb-16 mx-6 flex flex-col items-center gap-y-4 md:flex-row-reverse md:justify-between">
        <Image
          src={profilePic}
          alt="Photo of Sam"
          placeholder="blur"
          priority
          className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover"
        />

        <div className="max-w-lg flex flex-col space-y-5">
          <span className="text-4xl font-medium">
            Hey! I&apos;m{' '}
            <span className="text-green-300 dark:text-green-50">Sam Ping</span>,
            a...
          </span>
          <span className="text-2xl font-light">
            ... software engineer, Rutgers University graduate, cat lover (but
            dog liker), avid tennis player, occasional runner, even less
            occasional theater performer, and neglectful plant dad.
          </span>
          <Button
            text={'more about me'}
            url={'/about'}
            eventName="More about me"
          />
        </div>
      </div>

      {/* projects section */}
      <div className="flex flex-col gap-y-8 bg-green-200/90 dark:bg-green-500/90 xl:rounded-2xl max-w-screen-xl">
        <div className="flex flex-col gap-y-2 px-10 pt-16">
          <span className="text-4xl font-medium">Projects</span>
          <span className="text-base font-light">
            Here are some of my more recent projects! Or,{' '}
            <Link
              href="/projects"
              className="underline"
              data-umami-event="See all my projects"
            >
              see all my projects
            </Link>
            .
          </span>
        </div>
        <div className="pb-16">
          <ProjectCardCarousel projects={projects} />
        </div>
      </div>
    </div>
  );
}
