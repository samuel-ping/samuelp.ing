import Image from 'next/image';

import Button from '@components/OutlineButton';
import WorkCard from '@components/CardVariants/WorkCard/WorkCard';

import profilePic from '@public/assets/sam.jpg';

export default function Home({ experience, projects }) {
  return (
    <>
      {/* about me section */}
      <div className="py-36 flex justify-between">
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
          height="256"
          placeholder="blur"
          priority
          className="rounded-full object-cover"
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
    </>
  );
}
