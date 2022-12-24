import { Document, Page, pdfjs } from 'react-pdf';
import { useWindowWidth } from '@wojtekmaj/react-hooks';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Component({ url }) {
  const width = useWindowWidth();

  return (
    <Document file={url}>
      <Page
        pageNumber={1}
        width={Math.min(width * 0.95, 1000)} // width: 90vw; max-width: 1000px
        loading="Loading resume..."
        externalLinkTarget="_blank"
      />
    </Document>
  );
}
