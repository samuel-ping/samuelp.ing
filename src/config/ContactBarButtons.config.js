import { FaGithub as GitHubIcon } from 'react-icons/fa';
import {
  GrLinkedin as LinkedInIcon,
  GrMail as EmailIcon,
} from 'react-icons/gr';

const iconSize = 30;

const ContactBarButtons = [
  {
    website: 'GitHub',
    url: 'https://github.com/samuel-ping',
    tooltip: '@samuel-ping',
    icon: <GitHubIcon size={35} />,
  },
  {
    website: 'LinkedIn',
    url: 'https://linkedin.com/in/samuelping',
    tooltip: 'in/samuelping',
    icon: <LinkedInIcon size={iconSize} />,
  },
  {
    website: 'Email',
    url: 'mailto:samuel.y.ping@gmail.com',
    tooltip: 'samuel.y.ping@gmail.com',
    icon: <EmailIcon size={iconSize} />,
  },
];

export default ContactBarButtons;
