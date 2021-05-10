import AboutMeData from '@content/about.json';

import Avatar from '@components/Avatar';

export default function About({ profilePicture }) {
  return (
    <div className="flex-col items-center justify-center">
      <h1>About Me</h1>
      <Avatar imgSrc={profilePicture} alt="Photo of Sam" size={200} />
      <article className="prose prose-xl"></article>
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: { profilePicture: AboutMeData['profile-picture'] },
  };
}
