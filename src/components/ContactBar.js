import ContactBarButton from '@components/ContactBarButton';
import ContactBarButtons from '@config/ContactBarButtons.config';

const ContactBar = () => (
  <div className="flex items-center justify-center">
    <div className="gap-1 mt-3 sm:my-7 grid grid-cols-2 md:grid-cols-4 md:gap-6">
      {ContactBarButtons.map((buttonInfo) => (
        <ContactBarButton
          key={buttonInfo.website}
          website={buttonInfo.website}
          tooltip={buttonInfo.tooltip}
          url={buttonInfo.url}
          icon={buttonInfo.icon}
          openInNewTab={buttonInfo.openInNewTab}
        />
      ))}
    </div>
  </div>
);

export default ContactBar;
