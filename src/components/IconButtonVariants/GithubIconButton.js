import { GrGithub as GitHubIcon } from 'react-icons/gr';

import Tooltip from '@components/Tooltip';

const GithubIconButton = ({ path, tooltip }) => {
  const iconSize = 32;
  return (
    <a
      href={path}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex self-center m-1 align-middle leading-loose font-semibold"
    >
      <Tooltip text={tooltip}>
        <GitHubIcon size={iconSize} className="hover:fill-green-500" />
      </Tooltip>
    </a>
  );
};
export default GithubIconButton;
