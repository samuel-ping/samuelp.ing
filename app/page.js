import Button from '@/components/rightArrowButton';
import BioSection from '@/components/bioSection';

export default function Page() {
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
