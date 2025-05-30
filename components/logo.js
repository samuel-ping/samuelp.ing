import Link from 'next/link';

import SP from '@/components/sp';

const Logo = ({ isAnimated, size, visible }) => (
  <>
    <Link href="/" data-umami-event="logo button clicked">
      <div className="cursor-pointer">
        <SP
          isAnimated={isAnimated}
          color="#000000"
          size={size}
          visible={visible}
        />
      </div>
    </Link>
  </>
);

export default Logo;
