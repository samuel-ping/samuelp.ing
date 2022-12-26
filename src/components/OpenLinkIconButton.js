import { GrDocumentDownload as DownloadIcon } from 'react-icons/gr';
import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';

import Tooltip from '@components/Tooltip';

const IconButton = ({ path, tooltip, downloading }) => {
  const iconSize = 32;
  return (
    <>
      {/* Using first implementation in Tooltip.js */}
      {/* <Tooltip text={tooltip}>
        <a
          id={`icon-button-anchor-${downloading ? 'download' : 'external'}`}
          href={path}
          target={downloading ? '' : '_blank'}
          rel={downloading ? '' : 'noopener noreferrer'}
          download={downloading}
          className="leading-loose font-semibold hover:bg-green-300 mx-1 mb-1"
        >
          {downloading ? <DownloadIcon size={iconSize} /> : <ExternalLinkIcon size={iconSize} />}
        </a>
      </Tooltip> */}

      {/* Using second implementation in Tooltip.js */}
      <Tooltip text={tooltip}>
        <a
          id={`icon-button-anchor-${downloading ? 'download' : 'external'}`}
          href={path}
          target={downloading ? '' : '_blank'}
          rel={downloading ? '' : 'noopener noreferrer'}
          download={downloading}
          className="leading-loose font-semibold hover:bg-green-300 mx-1 mb-1"
        >
          {downloading ? (
            <DownloadIcon size={iconSize} />
          ) : (
            <ExternalLinkIcon size={iconSize} />
          )}
        </a>
      </Tooltip>

      {/* Using react-tooltip */}
      {/* <a
        id={`icon-button-anchor-${downloading ? 'download' : 'external'}`}
        href={path}
        target={downloading ? '' : '_blank'}
        rel={downloading ? '' : 'noopener noreferrer'}
        download={downloading}
        className="leading-loose font-semibold hover:bg-green-300 mx-1 mb-1 z-[1]"
      >
        {downloading ? <DownloadIcon size={iconSize} /> : <ExternalLinkIcon size={iconSize} />}
      </a>
      <Tooltip 
        anchorId={`icon-button-anchor-${downloading ? 'download' : 'external'}`} 
        content={tooltip} 
        place={tooltipPosition ? tooltipPosition : "top"}
         /> */}

      {/* Using material-tailwind */}
      {/* <Tooltip
        content={tooltip}
        className="bg-green-500 text-green-50"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <a
          href={path}
          target={downloading ? '' : '_blank'}
          rel={downloading ? '' : 'noopener noreferrer'}
          download={downloading}
          className="leading-loose font-semibold hover:bg-green-300 mx-1 mb-1 z-[1]"
        >
          {downloading ? (
            <DownloadIcon size={iconSize} />
          ) : (
            <ExternalLinkIcon size={iconSize} />
          )}
        </a>
      </Tooltip> */}
    </>
  );
};

export default IconButton;
