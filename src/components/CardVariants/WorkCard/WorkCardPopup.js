import BaseCardModal from '@components/CardVariants/BaseCardModal';
import mdToReact from 'src/utils/MarkdownProcessor';
import ExternalWebsiteIconButton from '@components/IconButtonVariants/ExternalWebsiteIconButton';

const WorkCardPopup = ({ visible, handleClose, info }) => {
  return (
    <BaseCardModal visible={visible} handleClose={handleClose}>
      <span className="text-2xl md:text-4xl font-bold leading-relaxed">
        {info.details.company}
        {info.details['company-url'] && (
          <ExternalWebsiteIconButton
            path={info.details['company-url']}
            tooltip="Company Website"
          />
        )}
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
    </BaseCardModal>
  );
};
export default WorkCardPopup;
