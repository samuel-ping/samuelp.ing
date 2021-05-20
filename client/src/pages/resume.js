import dynamic from 'next/dynamic';

import { GrDocumentDownload } from 'react-icons/gr';
import { MdOpenInNew } from 'react-icons/md';

import HomeData from '@content/home.json';

// import HyperLink from '@components/HyperLink';

const PDFViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
});

export default function Resume({ resumePath, lastUpdated }) {
  const iconSize = 23;

  return (
    <div className="flex flex-col justify-center items-center max-w-full">
      <div className="flex flex-row items-center justify-between min-w-full">
        <span className="justify-self-start font-light italic">
          Last Updated: {lastUpdated}
        </span>
        <div className="flex flex-row justify-self-end">
          <a
            href={resumePath}
            download
            className="leading-loose font-semibold hover:bg-blue-400 mx-1 my-1"
          >
            <GrDocumentDownload size={iconSize} />
          </a>
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="leading-loose font-semibold hover:bg-blue-400 mx-1 my-1"
          >
            <MdOpenInNew size={iconSize} />
          </a>
        </div>
      </div>

      <PDFViewer url={resumePath} width={900} />
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
