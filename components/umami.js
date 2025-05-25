import Script from 'next/script';

export default function Umami() {
  return (
    <>
      <Script
        defer={true}
        src="https://stats.samuelp.ing/script.js"
        data-website-id="8f79f6fd-fcd8-4130-9467-e9eaf1d1f76e"
        data-domains="samuelp.ing"
      />
    </>
  );
}
