import Link from 'next/link';

// TODO: Migrate away from material-tailwind since only using the tooltip from it.
import { Tooltip } from '@material-tailwind/react';

function ContactBarButton({ tooltip, url, icon, openInNewTab }) {
  return (
    <>
      {openInNewTab ? (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Tooltip
            content={tooltip}
            className="bg-green-500 text-green-50"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <span className="cursor-pointer flex justify-center items-center h-28 w-28 rounded-full transition-colors border-2 border-green-500 hover:bg-green-500 fill-current hover:text-green-100">
              {icon}
            </span>
          </Tooltip>
        </a>
      ) : (
        <Link href={url}>
          <Tooltip
            content={tooltip}
            className="bg-green-500 text-green-50"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <span className="cursor-pointer flex justify-center items-center h-28 w-28 rounded-full transition-colors border-2 border-green-500 hover:bg-green-500 fill-current hover:text-green-100">
              {icon}
            </span>
          </Tooltip>
        </Link>
      )}
    </>
  );
}

export default ContactBarButton;
