import ContactBar from '@components/ContactBar';

import HomeData from '@content/home.json';

export default function Home({ taglines }) {
  return (
    <>
      <div>
        <h1 className="leading-relaxed text-6xl font-bold">
          Hi! I'm <span className="text-green-600">Sam Ping</span>, a...
        </h1>
        <ul className="flex flex-col items-center">
          {taglines.map((tagline, index) => {
            return (
              <li key={index} className="leading-normal text-lg">
                {tagline.position} @{' '}
                <a
                  href={tagline.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                >
                  {tagline.place}
                </a>
              </li>
            );
          })}
        </ul>
        <ContactBar />
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      taglines: HomeData['taglines'],
    },
  };
}
