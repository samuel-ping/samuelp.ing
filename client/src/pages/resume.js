import dynamic from 'next/dynamic';

// import superjson from "superjson"

import HomeData from '@content/home.json';

// import HyperLink from '@components/HyperLink';

const PDFViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
});

export default function Resume({ resumePath, lastUpdated }) {
  // console.log(resumePath);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row items-center">
        <span className="font-light text-gray-600 italic">
          Last Updated: {lastUpdated}
        </span>
        <a
          href={resumePath}
          download
          className="leading-loose font-semibold hover:bg-blue-400 px-4 my-1"
        >
          Download Resume
        </a>
        |
        <a
          href={resumePath}
          target="_blank"
          rel="noopener noreferrer"
          className="leading-loose font-semibold hover:bg-blue-400 px-4 my-1"
        >
          View Resume in Browser
        </a>
      </div>

      <PDFViewer url={resumePath} width={1000} />
    </div>
  );
}
export async function getStaticProps() {
  const resumeData = HomeData.resume;
  return {
    props: {
      resumePath: resumeData['resume-file'],
      lastUpdated: resumeData.date,
    },
  };
}
