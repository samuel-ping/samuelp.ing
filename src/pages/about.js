import Image from 'next/image';

import PageHeader from '@components/PageHeader';
import AboutMeData from '@content/about.json';
import mdToReact from 'src/utils/MarkdownProcessor';
import profilePic from '@public/assets/sam-2.jpg';

export default function About({ description }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <PageHeader text="About Me" />
      <Image
        src={profilePic}
        alt="Photo of Sam"
        width="200"
        height="200"
        priority
        placeholder="blur"
        className="rounded-full object-cover"
      />
      <article className="prose prose-md mx-5 lg:prose-lg">
        {mdToReact(description)}
      </article>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      description: AboutMeData.body,
    },
  };
}
