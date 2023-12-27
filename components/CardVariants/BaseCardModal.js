import { Fragment } from 'react';

import { GrClose as CloseIcon } from 'react-icons/gr';
import { Dialog as Modal, Transition } from '@headlessui/react';

const BaseCardModal = ({ children, visible, handleClose }) => {
  return (
    <>
      <Transition appear show={visible} as={Fragment}>
        <Modal as="div" onClose={handleClose} className="z-10 relative">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>

          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-200"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Modal.Panel
                  as="div"
                  className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                >
                  <span className="flex justify-end">
                    <button onClick={handleClose}>
                      <CloseIcon className="hover:opacity-60" />
                    </button>
                  </span>
                  {children}
                </Modal.Panel>
              </Transition.Child>
            </div>
          </div>
        </Modal>
      </Transition>
    </>
  );
};
export default BaseCardModal;
