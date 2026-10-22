import NotFoundMessage from '@/components/notFoundMessage';
import NotFoundTracker from '@/components/notFoundTracker';

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
