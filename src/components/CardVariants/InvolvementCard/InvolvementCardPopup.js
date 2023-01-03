import BaseCardModal from '@components/CardVariants/BaseCardModal';
import ExternalWebsiteIconButton from '@components/IconButtonVariants/ExternalWebsiteIconButton';
import mdToReact from 'src/utils/MarkdownProcessor';

const InvolvementCardPopup = ({ visible, handleClose, info }) => {
  return (
    <BaseCardModal visible={visible} handleClose={handleClose}>
      {/* Can't center icons without separating <h1> from prose */}
      {/* https://github.com/tailwindlabs/tailwindcss-typography/issues/32#issuecomment-756687596 */}
      <span className="text-2xl md:text-4xl font-bold leading-relaxed">
        {info.details.activity}
        {info.details['website-url'] && (
          <ExternalWebsiteIconButton
            path={info.details['website-url']}
            tooltip="Website"
          />
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
