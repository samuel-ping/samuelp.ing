import Image from 'next/image';

import Button from '@components/outlineButton';
import ProjectCard from '@components/projectCard';
import WorkCard from '@components/workCard';

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

      {/* experience section */}
      <div className="flex flex-col space-y-8">
        <span className="text-4xl font-medium">Work Experience</span>

        <div className="flex flex-col space-y-5">
          <WorkCard
            url={''}
            title={'Software Engineer II'}
            company={'MongoDB'}
            dates={'Aug 2023 - Present'}
            location={'New York, NY'}
          />
          <WorkCard
            url={''}
            title={'Software Engineer II'}
            company={'MongoDB'}
            dates={'Aug 2023 - Present'}
            location={'New York, NY'}
          />
          <WorkCard
            url={''}
            title={'Software Engineer II'}
            company={'MongoDB'}
            dates={'Aug 2023 - Present'}
            location={'New York, NY'}
          />
        </div>

        <div className="flex justify-center">
          <Button text={'see all experience'} url={'/work'} />
        </div>
      </div>

      {/* projects section */}
      <div className="flex flex-col space-y-8">
        <span className="text-4xl font-medium">Projects</span>
        <div className="flex flex-row space-x-2">
          <ProjectCard
            url={''}
            title={'Personal Website'}
            dates={'May 2020 - Present'}
            blurb={"The website you're looking at right now!"}
            tags={['react.js', 'figma']}
          />
          <ProjectCard
            url={''}
            title={'Personal Website'}
            dates={'May 2020 - Present'}
            blurb={"The website you're looking at right now!"}
            tags={['react.js', 'figma']}
          />
          <ProjectCard
            url={''}
            title={'Personal Website'}
            dates={'May 2020 - Present'}
            blurb={"The website you're looking at right now!"}
            tags={['react.js', 'figma']}
          />
          <Button
            text={'view all'}
            url={'projects'}
            className={'h-96 space-x-1 rounded-xl'}
          />
        </div>
      </div>
    </>
  );
}
