import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('../components/PdfViewer'), {
  ssr: false,
});

export default function Resume() {
  return (
    <div className="flex justify-center content-center">
      <PDFViewer url="./assets/Samuel-Ping_Resume.pdf" width={1000} />
    </div>
  );
}
