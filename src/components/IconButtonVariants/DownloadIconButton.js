import { HiOutlineDocumentDownload as DownloadIcon } from 'react-icons/hi';

import Tooltip from '@components/Tooltip';

const DownloadIconButton = ({ path, tooltip }) => {
  const iconSize = 32;
  return (
    <a
      href={path}
      download
      className="inline-flex self-center m-1 align-middle leading-loose font-semibold"
    >
      <Tooltip text={tooltip}>
        <DownloadIcon size={iconSize} className="hover:stroke-green-500" />
      </Tooltip>
    </a>
  );
};
export default DownloadIconButton;
