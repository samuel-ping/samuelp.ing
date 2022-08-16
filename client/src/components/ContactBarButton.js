const ContactBarButton = ({
  // website, // TODO: turn into tooltip
  url,
  icon,
}) => (
  <>
    <a href={url} target="_blank" rel="noopener noreferrer">
      <span className="cursor-pointer flex justify-center items-center h-28 w-28 rounded-full transition-colors border-2 border-green-600 hover:bg-green-600 fill-current hover:text-green-50">
        {icon}
      </span>
    </a>
  </>
);

export default ContactBarButton;
