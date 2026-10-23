import Link from 'next/link';

import SP from '@/components/ui/sp';

const Logo = ({ isAnimated, size, visible }) => (
  <Link href="/" data-umami-event="Logo Click">
    <div>
      <SP
        isAnimated={isAnimated}
        color="#000000"
        size={size}
        visible={visible}
      />
    </div>
  </Link>
);

export default Logo;
