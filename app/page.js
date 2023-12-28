import Image from 'next/image';
import Link from 'next/link';

import Button from '@components/outlineButton';
import { ProjectCardCarousel } from '@components/projectCardCarousel';

import profilePic from '@public/assets/sam.jpg';
export default async function Page() {
  return (
    <>
      {/* about me section */}
      <div className="py-32 flex justify-between">
        <div className="max-w-md flex flex-col space-y-5">
          <span className="text-4xl font-medium">
            Hey! I&apos;m Sam Ping, a...
          </span>
          <span className="text-2xl font-light">
            ... software engineer at MongoDB, Rutgers University graduate, avid
            tennis player, budding boulderer, occasional theater performer, and
            neglectful plant dad. I&apos;m currently based out of NYC.
          </span>
          <Button text={'more about me'} url={'/about'} />
        </div>

        <Image
          src={profilePic}
          alt="Photo of Sam"
          placeholder="blur"
          priority
          className="w-64 h-64 rounded-full object-cover"
        />
      </div>

      {/* projects section */}
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col space-y-2">
          <span className="text-4xl font-medium">Projects</span>
          <span className="text-base font-light">
            Here are some of my favorite projects I&apos;ve worked on! Or,{' '}
            <Link href="/projects" className="underline">
              see all my projects
            </Link>
            .
          </span>
        </div>
        <ProjectCardCarousel n={3} />
      </div>
    </>
  );
}
