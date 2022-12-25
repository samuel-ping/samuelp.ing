// import { GrGithub as GitHubIcon } from 'react-icons/gr'; // maybe link org github repos in future? same goes with involvement card
import { Modal } from 'react-responsive-modal';

import mdToReact from '@lib/MarkdownProcessor';
import OpenLinkIconButton from '@components/OpenLinkIconButton';

import 'react-responsive-modal/styles.css';

const WorkCardPopup = ({ visible, handleClose, info }) => {
  const modalstyles = {
    modal: {
      'border-radius': '0.5rem',
      // 'z-index': '-1',
      'position': 'relative',
    },
  };

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
          <h1 className="text-2xl md:text-4xl font-bold leading-relaxed mr-2">
            {info.details.company}
          </h1>
          {info.details['company-url'] && <OpenLinkIconButton path={info.details['company-url']} tooltip="Company Website" />}
        </span>
        <article className="prose max-w-none">
          <h3 className="italic">{info.details.title}</h3>
          <h3>
            {info.details['start-date']}
            {info.details['end-date'] === info.details['start-date'] ? (
              <></>
            ) : info.details['end-date'] === '' ? (
              ' - Present'
            ) : (
              ` - ${info.details['end-date']}`
            )}
          </h3>
          {mdToReact(info.description)}
        </article>
      </Modal>
    </>
  );
};
export default WorkCardPopup;
