import dynamic from 'next/dynamic';

import { Tooltip } from '@material-tailwind/react';
import { GrDocumentDownload as DownloadIcon } from 'react-icons/gr';
import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';

import HomeData from '@content/home.json';
import PageHeader from '@components/PageHeader';

// import HyperLink from '@components/HyperLink';

const PDFViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
});

export default function Resume({ resumePath, lastUpdated }) {
  const iconSize = 30;

  return (
    <div className="flex flex-col items-center">
      <PageHeader text="Resume" />
      <div className="w-fit flex flex-col">
        <div className="flex flex-row justify-between  min-w-full sm:mt-3">
          <span className="justify-self-start text-xl font-light italic">
            Last Updated: {lastUpdated}
          </span>

          <div className="flex flex-row justify-self-end">
            <Tooltip
              content="Download"
              className="bg-green-500 text-green-50"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <a
                href={resumePath}
                download
                className="leading-loose font-semibold hover:bg-blue-400 mx-1 mb-1"
              >
                <DownloadIcon size={iconSize} />
              </a>
            </Tooltip>
            <Tooltip
              content="Open in new tab"
              className="bg-green-500 text-green-50"
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
            >
              <a
                href={resumePath}
                target="_blank"
                rel="noopener noreferrer"
                className="leading-loose font-semibold hover:bg-blue-400 mx-1 mb-1"
              >
                <ExternalLinkIcon size={iconSize} />
              </a>
            </Tooltip>
          </div>
        </div>
        <PDFViewer url={resumePath} width={900} />
      </div>
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
