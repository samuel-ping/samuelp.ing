import Button from '@/components/rightArrowButton';
import BioSection from '@/components/bioSection';

export default function Page() {
  // The hero is short, so on a wide screen it is centred in the space between
  // the nav and the footer rather than pinned under the nav. `h-full` resolves
  // against the layout column, which stretches to fill `<main>`.
  //
  // `pb-8` cancels the `pt-8` on `<main>`: padding shrinks the centring box
  // from the top only, so without it the hero sits low. Cancelling it makes the
  // gaps above and below the hero equal, which is what actually reads as
  // centred — `<main>` itself is not symmetric in the viewport, because the nav
  // occupies more of the top than the footer does of the bottom.
  return (
    <div className="flex flex-col lg:h-full lg:justify-center lg:pb-8">
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
    </div>
  );
}
