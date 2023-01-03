import BaseCardModal from '@components/CardVariants/BaseCardModal';
import mdToReact from 'src/utils/MarkdownProcessor';
import GithubIconButton from '@components/IconButtonVariants/GithubIconButton';
import ExternalWebsiteIconButton from '@components/IconButtonVariants/ExternalWebsiteIconButton';

const ProjectCardPopup = ({ visible, handleClose, info }) => {
  return (
    <BaseCardModal visible={visible} handleClose={handleClose}>
      {/* Can't center icons without separating <h1> from prose */}
      {/* https://github.com/tailwindlabs/tailwindcss-typography/issues/32#issuecomment-756687596 */}
      <span className="text-2xl md:text-4xl font-bold leading-relaxed">
        {info.details.title}

        {info.details['website-url'] && (
          <ExternalWebsiteIconButton
            path={info.details['website-url']}
            tooltip="Live Website"
          />
        )}
        {info.details['repo-url'] && (
          <GithubIconButton
            path={info.details['repo-url']}
            tooltip="Repository"
          />
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
            ` - ${info.details['end-date']}`
          )}
        </h3>
        <h3 className="italic">Technologies: {info.details.technologies}</h3>
        {mdToReact(info.description)}
      </article>
    </BaseCardModal>
  );
};

export default ProjectCardPopup;
