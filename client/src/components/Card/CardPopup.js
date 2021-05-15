import { Modal } from 'react-responsive-modal';

import mdToReact from '@lib/MarkdownProcessor';

import 'react-responsive-modal/styles.css';

const CardPopup = ({ visible, handleClose, info }) => (
  <>
    <Modal open={visible} onClose={handleClose} center animationDuration={125}>
      <article className="prose prose-xl prose-green">
        <h1 className="leading-none">{info.details.title}</h1>
        <h3 className="italic">Technologies: {info.details.technologies}</h3>
        {mdToReact(info.description)}
      </article>
    </Modal>
  </>
);
export default CardPopup;
