import superjson from 'superjson';

import Avatar from '@components/Avatar';
import Description from '@components/Description';

import AboutMeData from '@content/about.json';
import { mdToHTML } from '@lib/mdToHTML';

export default function About({ description, profilePicture }) {
  return (
    <div className="flex-col items-center justify-center">
      <h1>About Me</h1>
      <Avatar imgSrc={profilePicture} alt="Photo of Sam" size={200} />
      {/* <article className="prose prose-xl whitespace-pre-wrap"> */}
      <Description content={description} />
      {/* </article> */}
    </div>
  );
}

export async function getStaticProps() {
  const description = await mdToHTML(AboutMeData['body']);
  return {
    props: {
      description: description,
      profilePicture: AboutMeData['profile-picture'],
    },
  };
}
