import { BsFillPersonLinesFill as ResumeIcon } from 'react-icons/bs';
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
    openInNewTab: true,
  },
  {
    website: 'LinkedIn',
    url: 'https://linkedin.com/in/samuelping',
    tooltip: 'in/samuelping',
    icon: <LinkedInIcon size={iconSize} />,
    openInNewTab: true,
  },
  {
    website: 'Resume',
    url: '/resume',
    tooltip: 'resume',
    icon: <ResumeIcon size={iconSize} />,
    openInNewTab: false,
  },
  {
    website: 'Email',
    url: 'mailto:samuel.y.ping@gmail.com',
    tooltip: 'samuel.y.ping@gmail.com',
    icon: <EmailIcon size={iconSize} />,
    openInNewTab: true,
  },
];

export default ContactBarButtons;
