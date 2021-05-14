// TODO:
// allow modal to close when escape key is pressed (show (esc) X in top right corner?)
// allow clicking outside to close modal?
// show ring around X button when tabbing
import { GrClose } from 'react-icons/gr';

const Modal = ({ visible, onClose, info: { title } = {} }) => {
  if (visible) {
    return (
      <div className="flex items-center justify-center w-full h-full top-0 left-0 fixed">
        <div className="absolute w-full h-full bg-green-800 opacity-30" />
        <div
          className="bg-white w-6/12
          rounded shadow-lg z-10"
        >
          <div className="flex flex-col justify-center px-6 py-5 overflow-y-auto overflow-x-hidden">
            <div className="flex">
              <h1 className="flex-grow">Title</h1>
              {/* <button
                className="flex-none cursor-pointer justify-self-end justify-center items-center z-20"
                onClick={onClose}
              > */}
              <GrClose
                className="flex-none cursor-pointer justify-self-end justify-center items-center m-2 z-30 focus:ring-2"
                onClick={onClose}
              />
              {/* </button> */}
            </div>
            Made by Samuel Ping
          </div>
        </div>
      </div>
    );
  } else {
    return <></>;
  }
};

export default Modal;
