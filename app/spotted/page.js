import PageTitle from '@/components/pageTitle';
import BodyClassName from '@/components/bodyClassName';
import BuildingScroller from '@/components/buildingScroller';

import SpottedBuildings, { Sidewalk } from '@/config/spottedBuildings.config';

export const metadata = {
  title: 'Lost & Spotted',
  description:
    'A collection of items abandoned on the city street, spotted and taken in by me.',
};

export default function Page() {
  return (
    <div className="w-full">
      <BodyClassName className="spotted-theme" />
      <div className="mx-6 md:mx-12">
        <PageTitle text="Lost & Spotted" />
      </div>
      <BuildingScroller buildings={SpottedBuildings} sidewalk={Sidewalk} />
    </div>
  );
}
