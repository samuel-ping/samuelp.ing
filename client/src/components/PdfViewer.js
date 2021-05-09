import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ url, width }) => {
  return (
    <Document file={url}>
      <Page pageNumber={1} width={width} />
    </Document>
  );
};

export default PdfViewer;
