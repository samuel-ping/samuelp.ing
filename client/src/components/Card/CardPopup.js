import { GrGithub as GitHubIcon } from 'react-icons/gr';
import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';
import { Modal } from 'react-responsive-modal';

import mdToReact from '@lib/MarkdownProcessor';

import 'react-responsive-modal/styles.css';

const CardPopup = ({ visible, handleClose, info }) => {
  const modalstyles = {
    modal: {
      'border-radius': '0.5rem',
      'max-width': '800px',
      width: '100%',
    },
  };
  const iconSize = 33;

  return (
    <>
      <Modal
        open={visible}
        onClose={handleClose}
        center
        animationDuration={125}
        styles={modalstyles}
      >
        {/* Can't center icons without separating <h1> from prose */}
        {/* https://github.com/tailwindlabs/tailwindcss-typography/issues/32#issuecomment-756687596 */}
        <span className="flex flex-row items-center">
          <h1 className="text-4xl font-bold leading-relaxed mr-4">
            {info.details.title}
          </h1>
          {info.details['repo-url'] ? (
            <a
              href={info.details['repo-url']}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon
                size={iconSize}
                className="cursor-pointer hover:opacity-60 mx-2"
              />
            </a>
          ) : (
            <></>
          )}
          {info.details['website-url'] ? (
            <a
              href={info.details['website-url']}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLinkIcon
                size={iconSize}
                className="cursor-pointer hover:opacity-60"
              />
            </a>
          ) : (
            <></>
          )}
        </span>
        <article className="prose max-w-none">
          <h3>
            {info.details['start-date']}
            {info.details['end-date'] === info.details['start-date'] ? (
              <></>
            ) : info.details['end-date'] === '' ? (
              ' - Present'
            ) : (
              ' - ' + info.details['end-date']
            )}
          </h3>
          <h3 className="italic">Technologies: {info.details.technologies}</h3>
          {mdToReact(info.description)}
        </article>
      </Modal>
    </>
  );
};
export default CardPopup;
