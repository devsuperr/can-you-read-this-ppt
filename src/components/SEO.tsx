import { useEffect } from 'react';

/**
 * Per-route SEO updater for SPA navigation.
 *
 * Updates document.title, meta tags (description / OG / Twitter), <link rel="canonical">,
 * and injects a route-scoped JSON-LD <script> on mount. Cleans up its JSON-LD on unmount
 * so route changes don't accumulate stale structured data.
 *
 * No external deps — pure useEffect + DOM mutation.
 *
 * Usage in a page component:
 *   <SEO
 *     title="About — Mosaic Venture Studio"
 *     description="..."
 *     path="/about"
 *     jsonLd={{ '@context': 'https://schema.org', '@type': 'AboutPage', ... }}
 *   />
 */

export interface SEOProps {
  /** Full <title>. Should be route-specific and include the brand name. */
  title: string;
  /** ≤ 160 chars. Used for description, OG, Twitter. */
  description: string;
  /** Path under origin (e.g. "/about"). Builds canonical + OG URL. */
  path: string;
  /** Optional OG image override; defaults to homepage banner. */
  image?: string;
  /** Optional structured data payload, auto-stringified into a JSON-LD <script>. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Override OG type (default: "website"). Use "article" for blog/news. */
  ogType?: string;
  /** Override robots meta (default: "index, follow, max-snippet:-1, max-image-preview:large"). */
  robots?: string;
}

const SITE_ORIGIN = 'https://mosaicventure.studio';
const DEFAULT_IMAGE = `${SITE_ORIGIN}/og-image.jpg`;
const ROUTE_JSONLD_ID = 'route-jsonld';

/** Idempotently set or create a <meta> tag. */
function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

/** Idempotently set or create the canonical <link>. */
function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function SEO({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  jsonLd,
  ogType = 'website',
  robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
}: SEOProps) {
  useEffect(() => {
    const url = `${SITE_ORIGIN}${path}`;

    // Title
    document.title = title;

    // Standard meta
    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);

    // Canonical
    setCanonical(url);

    // Open Graph
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:image', image);

    // Twitter
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', image);

    // Route-scoped JSON-LD (replaces any previous one)
    if (jsonLd) {
      const existing = document.getElementById(ROUTE_JSONLD_ID);
      if (existing) existing.remove();
      const script = document.createElement('script');
      script.id = ROUTE_JSONLD_ID;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    // Cleanup: remove route-scoped JSON-LD when this page unmounts.
    // Static head-level JSON-LD blocks (Organization, WebSite) in index.html stay put.
    return () => {
      const script = document.getElementById(ROUTE_JSONLD_ID);
      if (script) script.remove();
    };
  }, [title, description, path, image, ogType, robots, jsonLd]);

  return null;
}