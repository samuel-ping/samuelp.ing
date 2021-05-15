import {
  GrDocumentUser as ResumeIcon,
  GrGithub as GitHubIcon,
  GrLinkedin as LinkedInIcon,
  GrMail as EmailIcon,
} from 'react-icons/gr';

const iconSize = 30;

const ContactBarButtons = [
  {
    website: 'GitHub',
    url: 'https://github.com/samuel-ping',
    icon: <GitHubIcon size={iconSize} />,
  },
  {
    website: 'LinkedIn',
    url: 'https://linkedin.com/in/samuelping',
    icon: <LinkedInIcon size={iconSize} />,
  },
  {
    website: 'Resume',
    url: '/resume',
    icon: <ResumeIcon size={iconSize} />,
  },
  {
    website: 'Email',
    url: 'mailto:samuel.y.ping@gmail.com',
    icon: <EmailIcon size={iconSize} />,
  },
];

export default ContactBarButtons;
