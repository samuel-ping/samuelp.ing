import Button from '@/components/rightArrowButton';
import LinkText from '@/components/linkText';
import { ProjectCardCarousel } from '@/components/projectCardCarousel';
import BioSection from '@/components/bioSection';

import { GetProjectDetails } from '@/utils/mdxUtils';

export default async function Page() {
  const projects = await GetProjectDetails(6);

  return (
    <div className="max-w-full xl:max-w-(--breakpoint-lg) 2xl:max-w-(--breakpoint-xl)">
      {/* about me section */}
      <BioSection
        button={
          <Button
            text={'more about me'}
            url={'/about'}
            eventName="More about me"
          />
        }
      />

      {/* projects section */}
      <div className="flex flex-col gap-y-8 bg-green-200/90 dark:bg-green-500/90 xl:rounded-2xl max-w-(--breakpoint-xl)">
        <div className="flex flex-col gap-y-2 px-10 pt-16">
          <span className="text-4xl font-medium">Projects</span>
          <span className="text-base font-light">
            Here are some of my more recent projects! Or,{' '}
            <LinkText
              href="/projects"
              className="underline"
              data-umami-event="See all my projects"
            >
              see all my projects
            </LinkText>
            .
          </span>
        </div>
        <div className="pb-16">
          <ProjectCardCarousel projects={projects} />
        </div>
      </div>
    </div>
  );
}
