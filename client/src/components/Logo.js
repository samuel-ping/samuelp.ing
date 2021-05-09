import Link from 'next/link';

import SPLogo from './SPLogo';

const Logo = ({ isAnimated, size }) => {
  return (
    <>
      <Link href="/">
        <div className="cursor-pointer">
          <SPLogo isAnimated={isAnimated} color="#000000" size={size} />
        </div>
      </Link>
    </>
  );
};

export default Logo;
