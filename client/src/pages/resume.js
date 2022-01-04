import dynamic from 'next/dynamic';

import { GrDocumentDownload as DownloadIcon } from 'react-icons/gr';
import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';

import HomeData from '@content/home.json';

// import HyperLink from '@components/HyperLink';

const PDFViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
});

export default function Resume({ resumePath, lastUpdated }) {
  const iconSize = 23;

  return (
    <div className="flex flex-col justify-center items-center max-w-full">
      <div className="font-semibold italic sm:hidden">
        NOTE: Hey, thanks for (trying to) view my resume! Your screen looks a
        little small though, so rather than strain your eyes, you should
        probably download or open it in a new tab by tapping one of the
        following buttons:
      </div>
      <div className="flex flex-row items-center justify-between min-w-full mt-3">
        <span className="justify-self-start font-light italic">
          Last Updated: {lastUpdated}
        </span>
        <div className="flex flex-row justify-self-end">
          <span className="font-bold leading-none sm:hidden">
            Download<span className="text-3xl">&rarr;</span>
          </span>
          <a
            href={resumePath}
            download
            className="leading-loose font-semibold hover:bg-blue-400 mx-1 my-1"
          >
            <DownloadIcon size={iconSize} />
          </a>
          <span className="font-bold leading-none sm:hidden">
            New Tab<span className="text-3xl">&rarr;</span>
          </span>
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="leading-loose font-semibold hover:bg-blue-400 mx-1 my-1"
          >
            <ExternalLinkIcon size={iconSize} />
          </a>
        </div>
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
