import dynamic from 'next/dynamic';

import DownloadIconButton from '@components/IconButtonVariants/DownloadIconButton';
import ExternalWebsiteIconButton from '@components/IconButtonVariants/ExternalWebsiteIconButton';
import HomeData from '@content/home.json';
import PageHeader from '@components/PageHeader';

// https://github.com/wojtekmaj/react-pdf/issues/136#issuecomment-405393139
const PDFViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
});

export default function Resume({ resumePath, lastUpdated }) {
  return (
    <div className="flex flex-col items-center">
      <PageHeader text="Resume" />
      <div className="w-fit flex flex-col">
        <div className="flex flex-row justify-between sm:mt-3">
          <span className="justify-self-start text-xl font-light italic leading-10">
            Last Updated: {lastUpdated}
          </span>

          <div className="flex flex-row justify-self-end">
            <DownloadIconButton path={resumePath} tooltip="Download" />
            <ExternalWebsiteIconButton
              path={resumePath}
              tooltip="Open in new tab"
            />
          </div>
        </div>
        <PDFViewer url={resumePath} />
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
