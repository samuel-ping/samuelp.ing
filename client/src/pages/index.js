import ContactBar from '@components/ContactBar';

import HomeData from '@content/home.json';

export default function Home({ taglines }) {
  return (
    <>
      <div>
        <h1 className="text-center leading-tight sm:leading-relaxed text-5xl sm:text-6xl font-semibold md:font-bold">
          Hey! I&rsquo;m <br className="sm:hidden" />
          <span className="text-green-600 font-bold">Sam Ping</span>, a...
        </h1>
        <ul className="flex flex-col items-center">
          {taglines.map((tagline) => (
            <li
              key={tagline.position}
              className="leading-normal text-md sm:text-lg"
            >
              {tagline.position} @{' '}
              <a
                href={tagline.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold sm:font-bold hover:underline"
              >
                {tagline.place}
              </a>
            </li>
          ))}
        </ul>
        <ContactBar />
      </div>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      taglines: HomeData.taglines,
    },
  };
}
