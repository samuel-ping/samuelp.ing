import { Document, Page, pdfjs } from 'react-pdf';
import { useWindowWidth } from '@wojtekmaj/react-hooks';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// TODO: Bug where first link in PDF can only be clicked on the borders of the link's div/highlights.
// TODO: Open links in PDF in new tab. "externalLinkTarget" and "externalLinkRel" props don't seem to work.
export default function Component({ url }) {
  const width = useWindowWidth();

  return (
    <Document file={url}>
      <Page
        pageNumber={1}
        width={Math.min(width * 0.95, 1000)} // width: 90vw; max-width: 1000px
        externalLinkRel="noopener noreferrer"
        externalLinkTarget="_blank"
      />
    </Document>
  );
}
