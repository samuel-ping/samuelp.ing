import Image from 'next/image';

import AboutMeData from '@content/about.json';
import mdToReact from '@lib/MarkdownProcessor';

export default function About({ description }) {
  return (
    <article className="prose prose-md mx-5 mt-3 lg:prose-lg">
      <h1>About Me</h1>
      <div className="h-7/12 w-7/12 sm:h-5/12 sm:w-5/12">
        <Image
          src="https://avatars.githubusercontent.com/u/55605862?v=4"
          alt="Photo of Sam"
          width="200"
          height="200"
          priority
          className="rounded-full object-cover"
        />
      </div>

      {mdToReact(description)}
    </article>
  );
}

export async function getStaticProps() {
  return {
    props: {
      description: AboutMeData.body,
    },
  };
}
