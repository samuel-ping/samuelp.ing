import PageTitle from '@/components/ui/pageTitle';
import BodyClassName from '@/components/layout/bodyClassName';
import BuildingScroller from '@/components/spotted/buildingScroller';

import SpottedBuildings, {
  Sidewalk,
  SpottedItemLayout,
} from '@/config/spotted.config';

import { GetSpottedItems } from '@/utils/mdxUtils';

export const metadata = {
  title: 'Lost & Spotted',
  description:
    'A collection of items abandoned on the city street, spotted and taken in by me.',
};

export default async function Page() {
  const items = await GetSpottedItems();
  // Merge each item's display placement (x/y/size) from the config into its
  // details so the components read a single object.
  const itemsWithLayout = items.map((item) => ({
    ...item,
    details: { ...item.details, ...SpottedItemLayout[item.details.slug] },
  }));

  return (
    <div className="w-full">
      <BodyClassName className="spotted-theme" />
      <div className="mx-6 md:mx-12">
        <PageTitle text="Lost & Spotted" />
      </div>
      <BuildingScroller
        buildings={SpottedBuildings}
        sidewalk={Sidewalk}
        items={itemsWithLayout}
      />
    </div>
  );
}
