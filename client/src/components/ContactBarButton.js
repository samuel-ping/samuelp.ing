const ContactBarButton = ({
  // website, // TODO: turn into tooltip
  url,
  icon,
}) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    <span className="flex rounded-full transition-colors border-2 border-green-600 hover:bg-green-600 fill-current hover:text-green-50 p-8 justify-center content-center cursor-pointer">
      {icon}
    </span>
  </a>
);

export default ContactBarButton;
