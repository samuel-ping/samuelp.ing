import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';
import { Modal } from 'react-responsive-modal';

import mdToReact from '@lib/MarkdownProcessor';

import 'react-responsive-modal/styles.css';

const InvolvementCardPopup = ({ visible, handleClose, info }) => {
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
        animationDuration={150}
        styles={modalstyles}
      >
        {/* Can't center icons without separating <h1> from prose */}
        {/* https://github.com/tailwindlabs/tailwindcss-typography/issues/32#issuecomment-756687596 */}
        <span className="flex flex-row items-center">
          <h1 className="text-4xl font-bold leading-relaxed mr-4">
            {info.details.activity}
          </h1>
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
          <h3 className="italic">{info.details.position}</h3>
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
          {mdToReact(info.description)}
        </article>
      </Modal>
    </>
  );
};
export default InvolvementCardPopup;
