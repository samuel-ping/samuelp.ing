import Avatar from '@components/Avatar';

import AboutMeData from '@content/about.json';
import mdToReact from '@lib/MarkdownProcessor';

import ProfilePicture from '../../public/assets/sam.jpg';

export default function About({ description }) {
  return (
    <article className="prose prose-md mx-5 mt-3 lg:prose-lg">
      <h1>About Me</h1>
      <Avatar imgSrc={ProfilePicture} alt="Photo of Sam" size={200} />
      {/* <Description content={description} /> */}
      {mdToReact(description)}
    </article>
  );
}

export async function getStaticProps() {
  return {
    props: {
      description: AboutMeData.body,
      // profilePicture: AboutMeData['profile-picture'],
    },
  };
}
