import dynamic from 'next/dynamic';

import HomeData from '@content/home.json';
import OpenLinkIconButton from '@components/OpenLinkIconButton';
import PageHeader from '@components/PageHeader';

// import HyperLink from '@components/HyperLink';

const PDFViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
});

export default function Resume({ resumePath, lastUpdated }) {
  return (
    <div className="flex flex-col items-center">
      <PageHeader text="Resume" />
      <div className="w-fit flex flex-col">
        <div className="flex flex-row justify-between  min-w-full sm:mt-3">
          <span className="justify-self-start text-xl font-light italic">
            Last Updated: {lastUpdated}
          </span>

          <div className="flex flex-row justify-self-end">
            <OpenLinkIconButton path={resumePath} tooltip="Download" downloading />
            <OpenLinkIconButton path={resumePath} tooltip="Open in new tab" />
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
