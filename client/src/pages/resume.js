import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
});

export default function Resume() {
  return (
    <div className="flex flex-col justify-center items-center">
      <a
        href="/assets/samuel-ping_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="leading-relaxed font-semibold hover:bg-blue-400"
      >
        Click Here To Download
      </a>
      <PDFViewer url="./assets/samuel-ping_resume.pdf" width={1000} />
    </div>
  );
}
