import { Tooltip } from '@material-tailwind/react';
// import { Tooltip } from 'react-tooltip'
import { GrDocumentDownload as DownloadIcon } from 'react-icons/gr';
import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';

const IconButton = ({ path, tooltip, downloading }) => {
  const iconSize = 32;
  return (
  <>
    {/* <a
        id='icon-button-anchor'
        href={path}
        target={downloading ? '' : '_blank'}
        download={downloading}
        className="leading-loose font-semibold hover:bg-green-300 mx-1 mb-1 z-[1]"
      >
        {downloading ? <DownloadIcon size={iconSize} /> : <ExternalLinkIcon size={iconSize} />}
      </a>
      <Tooltip anchorId="icon-button-anchor" content="hello world" place="top" /> */}
    <Tooltip
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
        download={downloading}
        className="leading-loose font-semibold hover:bg-green-300 mx-1 mb-1 z-[1]"
      >
        {downloading ? <DownloadIcon size={iconSize} /> : <ExternalLinkIcon size={iconSize} />}
      </a>
    </Tooltip>
  </>
);}

export default IconButton;
