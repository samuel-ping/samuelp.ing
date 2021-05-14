import ContactBarButton from '@components/ContactBarButton';
import ContactBarButtons from '@config/ContactBarButtons.config';

const ContactBar = () => (
  <div className="flex flex-row content-start justify-evenly my-7">
    {ContactBarButtons.map((buttonInfo) => (
      <ContactBarButton
        key={buttonInfo.website}
        website={buttonInfo.website}
        url={buttonInfo.url}
        icon={buttonInfo.icon}
      />
    ))}
  </div>
);

export default ContactBar;
