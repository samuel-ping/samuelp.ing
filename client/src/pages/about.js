/* eslint-disable react/jsx-props-no-spreading */
import Image from 'next/image';
import { getPlaiceholder } from 'plaiceholder';

import AboutMeData from '@content/about.json';
import mdToReact from '@lib/MarkdownProcessor';

export default function About({ description, imageProps }) {
  return (
    <article className="prose prose-md mx-5 mt-3 lg:prose-lg">
      <h1>About Me</h1>
      <div className="h-7/12 w-7/12 sm:h-5/12 sm:w-5/12">
        <Image
          alt="Photo of Sam"
          width="200"
          height="200"
          {...imageProps}
          placeholder="blur"
          priority
          className="rounded-full object-cover"
        />
      </div>

      {/* <Description content={description} /> */}
      {mdToReact(description)}
    </article>
  );
}

export async function getStaticProps() {
  const { base64, img } = await getPlaiceholder(
    'https://avatars.githubusercontent.com/u/55605862?v=4',
    { size: 4 },
  );
  return {
    props: {
      description: AboutMeData.body,
      // profilePicture: `/${AboutMeData['profile-picture']}`,
      imageProps: {
        ...img,
        blurDataURL: base64,
      },
    },
  };
}
