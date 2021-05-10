import ContactBarButton from '@components/ContactBarButton';
import ContactBarButtons from '@config/ContactBarButtons.config';

const ContactBar = () => {
  return (
    <div className="flex flex-row content-start justify-evenly my-7">
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
