import VisitorStats from '@/components/stats/visitorStats';
import PageTitle from '@/components/ui/pageTitle';

import { GetVisitorStats } from '@/utils/visitorStats';

export const metadata = {
  title: 'Stats',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function Page() {
  const stats = GetVisitorStats();

  return (
    <div className="mx-auto flex w-full max-w-4xl page-fade flex-col gap-y-8">
      <PageTitle text="Stats" />
      <VisitorStats data={stats} />
    </div>
  );
}
