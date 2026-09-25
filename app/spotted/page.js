import PageTitle from '@/components/pageTitle';
import BuildingScroller from '@/components/buildingScroller';

import SpottedBuildings from '@/config/spottedBuildings.config';

export const metadata = {
  title: 'Lost & Spotted',
  description:
    'A collection of items abandoned on the city street, spotted and taken in by me.',
};

export default function Page() {
  return (
    <div className="w-full overflow-x-auto">
      <div className="mx-6 md:mx-12">
        <PageTitle text="Lost & Spotted" />
      </div>
      <BuildingScroller buildings={SpottedBuildings} />
    </div>
  );
}
