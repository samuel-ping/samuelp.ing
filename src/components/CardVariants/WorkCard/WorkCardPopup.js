import { Fragment } from 'react'

import { Dialog as Modal, Transition } from '@headlessui/react'

import mdToReact from '@lib/MarkdownProcessor';
import OpenLinkIconButton from '@components/OpenLinkIconButton';

const WorkCardPopup = ({ visible, handleClose, info }) => {
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
                <Modal.Panel as="div" className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Can't center icons without separating <h1> from prose */}
                {/* https://github.com/tailwindlabs/tailwindcss-typography/issues/32#issuecomment-756687596 */}
                <div>Close placeholder</div>
                <Modal.Title>
                  <span className="mt-5 flex flex-row items-center">
                    <h1 className="text-2xl md:text-4xl font-bold leading-relaxed">
                      {info.details.company}
                    </h1>
                    {info.details['company-url'] && (
                      <OpenLinkIconButton
                        path={info.details['company-url']}
                        tooltip="Company Website"
                        tooltipPosition="right"
                      />
                    )}
                  </span>
                  </Modal.Title>
                  <Modal.Description>
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
                  </Modal.Description>
                </Modal.Panel>
              </Transition.Child>
          </div>
        </div>
        </Modal>
      </Transition>
    </>
  );
};
export default WorkCardPopup;
