import Button from '@/components/ui/rightArrowButton';
import BioSection from '@/components/sections/bioSection';

export default function Page() {
  // `pb-8` cancels the `pt-8` on `<main>`, without it the hero sits low.
  return (
    <div className="flex flex-col lg:h-full lg:justify-center lg:pb-8">
      <BioSection
        button={
          <Button
            text={'more about me'}
            url={'/about'}
            className="settle"
            style={{ animationDelay: '170ms' }}
          />
        }
      />
    </div>
  );
}
