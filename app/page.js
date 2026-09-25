import Button from '@/components/ui/rightArrowButton';
import BioSection from '@/components/home/bioSection';

import { GetProjectDetails } from '@/utils/mdxUtils';

export default async function Page() {
  const projects = await GetProjectDetails(6);

  return (
    <div className="max-w-full xl:max-w-(--breakpoint-lg) 2xl:max-w-(--breakpoint-xl)">
      <BioSection
        button={
          <Button
            text={'more about me'}
            url={'/about'}
            eventName="More about me"
          />
        }
      />
    </div>
  );
}
