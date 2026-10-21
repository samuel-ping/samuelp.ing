import Button from '@/components/rightArrowButton';
import BioSection from '@/components/bioSection';

export default function Page() {
  return (
    <BioSection
      button={
        <Button
          text={'more about me'}
          url={'/about'}
          eventName="More about me"
          className="settle"
          style={{ animationDelay: '170ms' }}
        />
      }
    />
  );
}
