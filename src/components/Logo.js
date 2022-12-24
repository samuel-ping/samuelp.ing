import Link from 'next/link';

import SP from '@components/SP';

const Logo = ({ isAnimated, size, visible }) => (
  <>
    <Link href="/">
      <a>
        <div className="cursor-pointer p-3">
          <SP
            isAnimated={isAnimated}
            color="#000000"
            size={size}
            visible={visible}
          />
        </div>
      </a>
    </Link>
  </>
);

export default Logo;
