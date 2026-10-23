import NotFoundMessage from '@/components/sections/notFoundMessage';
import NotFoundTracker from '@/components/analytics/notFoundTracker';

export const metadata = {
  title: '4[shrimp]4',
};

export default function NotFound() {
  return (
    <>
      <NotFoundTracker />
      <NotFoundMessage />
    </>
  );
}
