import Link from 'next/link';

import ContactBar from '@components/ContactBar';

import HomeData from '@content/home.json';

export default function Home({ taglines }) {
  return (
    <>
      <div className="flex flex-col grow justify-center">
        <h1 className="text-center leading-tight sm:leading-relaxed text-5xl sm:text-6xl font-semibold md:font-bold">
          Hey! I&rsquo;m <br className="sm:hidden" />
          <Link href="/about">
            <span className="text-green-500 ease-in-out duration-300 hover:[text-shadow:-2px_2px_black] hover:cursor-pointer">
              Sam Ping
            </span>
          </Link>
          , a...
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
