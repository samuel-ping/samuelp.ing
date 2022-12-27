import { HiOutlineExternalLink as ExternalLinkIcon } from 'react-icons/hi';

import BaseCardModal from '@components/CardVariants/BaseCardModal';
import mdToReact from '@lib/MarkdownProcessor';

const InvolvementCardPopup = ({ visible, handleClose, info }) => {
  const iconSize = 33;

  return (
    <BaseCardModal visible={visible} handleClose={handleClose}>
      {/* Can't center icons without separating <h1> from prose */}
      {/* https://github.com/tailwindlabs/tailwindcss-typography/issues/32#issuecomment-756687596 */}
      <span className="flex flex-row items-center">
        <h1 className="text-2xl md:text-4xl font-bold leading-relaxed mr-4">
          {info.details.activity}
        </h1>
        {info.details['website-url'] && (
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
            ` - ${info.details['end-date']}`
          )}
        </h3>
        {mdToReact(info.description)}
      </article>
    </BaseCardModal>
  );
};
export default InvolvementCardPopup;
