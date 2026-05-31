import { useEffect } from 'react';

const BASE = 'MPower Fitness';
const DEFAULT_DESC =
  "India's most complete fitness platform. Personalised workouts, certified expert trainers, smart nutrition and real results — all in one place.";

/**
 * Sets the document <title> (and optionally meta description) per route.
 * Helps SEO/shareability on a single-page app where the static index.html
 * title would otherwise apply to every route.
 *
 * @param {string} title  page-specific title; appended with the brand
 * @param {string} [description]  optional meta description override
 */
export default function useDocumentTitle(title, description) {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | ${BASE}` : BASE;

    let metaEl = document.querySelector('meta[name="description"]');
    const prevDesc = metaEl?.getAttribute('content');
    if (metaEl) metaEl.setAttribute('content', description || DEFAULT_DESC);

    return () => {
      document.title = prev;
      if (metaEl && prevDesc != null) metaEl.setAttribute('content', prevDesc);
    };
  }, [title, description]);
}
