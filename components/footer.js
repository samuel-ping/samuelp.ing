import Link from 'next/link';

import { EnvelopeIcon, GitHubIcon, LinkedInIcon } from '@/components/icons';

/*
  Shared by all three links, so the hit area can't drift between them.

  The glyphs are drawn at 24px, which is under the 44px a touch target wants, so
  the `before` pseudo-element pads the hit area out to 48px without making the
  icons themselves heavier — the same trick as the theme toggle in the nav. It
  stays clear of its neighbours: centres sit 56px apart and each target is 48px,
  so no two overlap.
*/
const linkClass =
  "relative flex items-center before:absolute before:-inset-3 before:content-[''] hover-tint transition-colors";

/**
 * Site footer. The header nav is always on screen, so repeating the same links
 * here was pure duplication — the footer carries only the outbound links.
 *
 * The rule marks the end of the page so the icons stop floating, sitting close
 * above them. It is the nav's active underline, reused: `wavy-rule` draws the
 * same stroke the nav puts under the current page, so the two read as one
 * gesture. It is a separate element rather than a border because a border can
 * only be a line — the wave is a mask, and the element *is* the stroke.
 *
 * Its width is set by the icon group rather than by any page measure: `max-w-68`
 * is twice the group's own width (the three 24px icons plus their gaps span
 * 136px, so the rule overhangs by 68px a side). Wider than that — the page
 * column, or even the reading measure the prose pages use — and the rule reads
 * as a second, competing frame rather than a lid on the icons.
 *
 * It deliberately does NOT reuse the project rows' divider token
 * (`divide-beige-200` / `dark:divide-green-700`). Those are tuned to sit within
 * the page, but the canvas wash deepens toward the foot and darkens the page
 * *toward* beige-200 — so at the very bottom the same colour measures 1.09:1 in
 * light (against the rows' 1.16:1) and the rule disappears exactly where it is
 * needed. green-200 / green-600 hold ~1.6:1 at the foot in each theme: enough
 * to read as a rule, quiet enough not to compete with the content above it. The
 * wave carries more presence than a plain line at the same contrast, which is
 * the other half of why it stays this quiet.
 */
const Footer = () => {
  return (
    <footer className="mt-auto mb-6 flex w-full justify-center gutter-x">
      <div className="flex w-full max-w-68 flex-col items-center">
        {/* Decorative — the same stroke as the nav's active underline. */}
        <div
          aria-hidden="true"
          className="wavy-rule w-full text-green-200 dark:text-green-600"
        />
        <div className="flex items-center gap-x-8 pt-4">
          <Link
            href="https://github.com/samuel-ping"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            data-umami-event="GitHub profile viewed"
          >
            <GitHubIcon className="size-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/samuelping"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            data-umami-event="LinkedIn profile viewed"
          >
            <LinkedInIcon className="size-6" />
          </Link>
          <Link
            href="mailto:samuel.y.ping@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            data-umami-event="email button clicked"
          >
            <EnvelopeIcon className="size-6" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
