import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';

import Tooltip from '@components/Tooltip';

const ExternalWebsiteIconButton = ({ path, tooltip }) => {
  const iconSize = 32;
  return (
    <a
      href={path}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex self-center m-1 align-middle leading-loose font-semibold"
    >
      <Tooltip text={tooltip}>
        <ExternalLinkIcon size={iconSize} className="hover:stroke-green-500" />
      </Tooltip>
    </a>
  );
};
export default ExternalWebsiteIconButton;
