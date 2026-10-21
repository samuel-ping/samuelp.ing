import Button from '@/components/rightArrowButton';
import BioSection from '@/components/bioSection';
import NowSection from '@/components/nowSection';

export default function Page() {
  return (
    <div className="flex w-full flex-col gap-y-16">
      <BioSection
        button={
          <Button
            text={'more about me'}
            url={'/about'}
            eventName="More about me"
            className="ink"
            style={{ animationDelay: '170ms' }}
          />
        }
      />
      <NowSection />
    </div>
  );
}
