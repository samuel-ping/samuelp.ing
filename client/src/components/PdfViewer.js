import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ url, width }) => {
  return (
    <Document
      file={url}
      error="Welp looks like I broke my PDF viewer, sorry about that! Feel free to send me an email or message to notify me."
      loading="Loading resume..."
      externalLinkTarget="_blank"
      // renderMode="svg"
    >
      <Page pageNumber={1} width={width} />
    </Document>
  );
};

export default PdfViewer;
