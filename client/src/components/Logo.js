import Link from 'next/link';

import SP from '@components/SP';

const Logo = ({ isAnimated, size }) => (
  <>
    <Link href="/">
      <a>
        <div className="cursor-pointer mx-10 my-3">
          <SP isAnimated={isAnimated} color="#000000" size={size} />
        </div>
      </a>
    </Link>
  </>
);

export default Logo;
