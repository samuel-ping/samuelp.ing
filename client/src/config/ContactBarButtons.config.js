import { BsFillPersonLinesFill as ResumeIcon } from 'react-icons/bs';
import { FaGithub as GitHubIcon } from 'react-icons/fa';
import {
  // GrDocumentUser as ResumeIcon,
  // GrGithub as GitHubIcon,
  GrLinkedin as LinkedInIcon,
  GrMail as EmailIcon,
} from 'react-icons/gr';

const iconSize = 30;

const ContactBarButtons = [
  {
    website: 'GitHub',
    url: 'https://github.com/samuel-ping',
    icon: <GitHubIcon size={iconSize} />,
    openInNewTab: true,
  },
  {
    website: 'LinkedIn',
    url: 'https://linkedin.com/in/samuelping',
    icon: <LinkedInIcon size={iconSize} />,
    openInNewTab: true,
  },
  {
    website: 'Resume',
    url: '/resume',
    icon: <ResumeIcon size={iconSize} />,
    openInNewTab: false,
  },
  {
    website: 'Email',
    url: 'mailto:samuel.y.ping@gmail.com',
    icon: <EmailIcon size={iconSize} />,
    openInNewTab: true,
  },
];

export default ContactBarButtons;
