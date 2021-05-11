import Link from 'next/link';

const HyperLink = ({ url, text, color, download }) => {
  if (url.startsWith('/') || url === '')
    return (
      <Link
        href="/assets/samuel-ping_resume.pdf"
        className={
          'leading-loose font-semibold px-4 my-1' +
          (color === 'blue'
            ? 'hover:bg-blue-400'
            : color === 'green'
            ? 'hover:bg-green-400'
            : '')
        }
      >
        {text}
      </Link>
    );
  else {
    return (
      <a
        href="/assets/samuel-ping_resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download={download}
        className={
          'leading-loose font-semibold px-4 my-1' +
          (color === 'blue'
            ? 'hover:bg-blue-400'
            : color === 'green'
            ? 'hover:bg-green-400'
            : '')
        }
      >
        {text}
      </a>
    );
  }
};

export default HyperLink;
