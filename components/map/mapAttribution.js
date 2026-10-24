import Link from 'next/link';

import { MAP_CONFIG } from '@/config/mapConfig.mjs';

const linkClass =
  'underline decoration-dotted underline-offset-2 transition-colors hover-tint';

export default function MapAttribution() {
  return (
    <p className="text-xs leading-relaxed text-muted">
      {MAP_CONFIG.attribution.map((item, index) => (
        <span key={item.href}>
          {index > 0 ? ' · ' : ''}
          {item.prefix}{' '}
          <Link
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            {item.label}
          </Link>
        </span>
      ))}
    </p>
  );
}
