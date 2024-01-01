import Image from 'next/image';

import Button from '@/components/rightArrowButton';
import { NavLink } from '@/components/mdx/components';
import { ProjectCardCarousel } from '@/components/projectCardCarousel';

import profilePic from '@/public/assets/sam.jpg';

import { GetProjectDetails } from '@/utils/mdxUtils';

export default async function Page() {
  const projects = await GetProjectDetails(4);

  return (
    <>
      {/* about me section */}
      <div className="pb-16 flex flex-col-reverse items-center gap-y-4 md:flex-row md:justify-between md:pb-48">
        <div className="max-w-lg flex flex-col space-y-5">
          <span className="text-4xl font-medium">
            Hey! I&apos;m{' '}
            <span className="text-green-300 dark:text-green-50">Sam Ping</span>,
            a...
          </span>
          <span className="text-2xl font-light">
            ... software engineer, Rutgers University graduate, cat lover (but
            dog liker), avid tennis player, budding boulderer, occasional
            theater performer, and neglectful plant dad.
          </span>
          <Button text={'more about me'} url={'/about'} />
        </div>

        <Image
          src={profilePic}
          alt="Photo of Sam"
          placeholder="blur"
          priority
          className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover"
        />
      </div>

      {/* projects section */}
      <div className="flex flex-col gap-y-8 bg-green-200/90 dark:bg-green-500/90 rounded-2xl max-w-7xl">
        <div className="flex flex-col gap-y-2 px-10 pt-16">
          <span className="text-4xl font-medium">Projects</span>
          <span className="text-base font-light">
            Here are some of my more recent projects! Or,{' '}
            <NavLink href="/projects" className="underline">
              see all my projects
            </NavLink>
            .
          </span>
        </div>
        <div className="pb-16">
          <ProjectCardCarousel projects={projects} />
        </div>
      </div>
    </>
  );
}
