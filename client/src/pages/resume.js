import dynamic from 'next/dynamic';

import HyperLink from '@components/HyperLink';

const PDFViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
});

export default function Resume() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-row items-center">
        <a
          href="/assets/samuel-ping_resume.pdf"
          download
          className="leading-loose font-semibold hover:bg-blue-400 px-4 my-1"
        >
          Download Resume
        </a>
        |
        <a
          href="/assets/samuel-ping_resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="leading-loose font-semibold hover:bg-blue-400 px-4 my-1"
        >
          View Resume in Browser
        </a>
      </div>

      <PDFViewer url="assets/samuel-ping_resume.pdf" width={1000} />
    </div>
  );
}
