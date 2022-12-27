import { GrDocumentDownload as DownloadIcon } from 'react-icons/gr';
import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';

import Tooltip from '@components/Tooltip';

const IconButton = ({ path, tooltip, downloading }) => {
  const iconSize = 32;
  return (
    <>
      <a
        href={path}
        target={downloading ? '' : '_blank'}
        rel={downloading ? '' : 'noopener noreferrer'}
        download={downloading}
        className="inline-flex self-center m-1 align-middle leading-loose font-semibold hover:bg-green-300"
      >
        <Tooltip text={tooltip}>
          {downloading ? (
            <DownloadIcon size={iconSize} className="fill-current" />
          ) : (
            <ExternalLinkIcon size={iconSize} />
          )}
        </Tooltip>
      </a>
    </>
  );
};

export default IconButton;
