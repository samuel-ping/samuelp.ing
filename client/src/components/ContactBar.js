import ContactBarButton from './ContactBarButton';
import ContactBarButtons from '../config/ContactBarButtons.config';

const ContactBar = () => {
  return (
    <div className="flex flex-row content-start justify-evenly">
      {ContactBarButtons.map((buttonInfo, index) => {
        return (
          <ContactBarButton
            index={index}
            website={buttonInfo.website}
            url={buttonInfo.url}
            icon={buttonInfo.icon}
          />
        );
      })}
    </div>
  );
};

export default ContactBar;
