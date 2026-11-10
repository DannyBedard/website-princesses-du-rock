import React from "react";

const ICONS: Record<string, React.ReactElement> = {
  youtube: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M23.5 6.2c-.2-1.2-1.2-2.2-2.4-2.4C18.9 3.3 12 3.3 12 3.3s-6.9 0-9.1.5C1.7 4 0.7 5 0.5 6.2 0 8.4 0 12 0 12s0 3.6.5 5.8c.2 1.2 1.2 2.2 2.4 2.4 2.2.5 9.1.5 9.1.5s6.9 0 9.1-.5c1.2-.2 2.2-1.2 2.4-2.4.5-2.2.5-5.8.5-5.8s0-3.6-.5-5.8ZM9.75 15.02V8.98L15.5 12l-5.75 3.02Z" />
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M16.7 2.2c.3 2.1 1.6 3.6 3.6 3.8v3.1c-1.3-.1-2.5-.5-3.6-1.1v5.9c0 4.1-3.3 7.4-7.4 7.4S2 18 2 13.9c0-3.5 2.4-6.5 5.7-7.2v3.3c-1.5.6-2.5 2-2.5 3.7 0 2.2 1.8 4 4 4s4-1.8 4-4V2h3.5l.5.2Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M22 12.07C22 6.5 17.52 2 12 2S2 6.5 2 12.07c0 5 3.66 9.14 8.44 9.93v-7.03H8.4V12h2.04V9.88c0-2.02 1.2-3.14 3.04-3.14.88 0 1.8.16 1.8.16v1.99h-1.01c-.99 0-1.3.62-1.3 1.26V12h2.22l-.35 2.97h-1.87v7.03C18.34 21.21 22 17.07 22 12.07Z" />
    </svg>
  ),
  spotify: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.58 14.43c-.18.3-.57.39-.87.21-2.38-1.46-5.38-1.79-8.93-.99-.34.08-.69-.13-.77-.47a.62.62 0 0 1 .47-.76c3.84-.88 7.13-.5 9.76 1.07.3.18.39.57.21.87Zm1.24-2.72c-.23.37-.71.48-1.08.25-2.73-1.67-6.87-2.16-10.08-1.2-.42.12-.86-.12-.98-.54a.79.79 0 0 1 .54-.98c3.57-1.04 8.06-.5 11.15 1.36.37.23.48.71.25 1.08Zm.1-2.86c-3.27-1.94-8.66-2.12-11.79-1.19-.5.15-1.02-.14-1.17-.64a.94.94 0 0 1 .62-1.17c3.57-1.05 9.47-.83 13.23 1.39.45.27.6.86.33 1.31-.27.45-.86.6-1.31.33Z" />
    </svg>
  ),
  music: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6ZM10 19a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
      <path d="M7 2h10c2.76 0 5 2.24 5 5v10c0 2.76-2.24 5-5 5H7c-2.76 0-5-2.24-5-5V7c0-2.76 2.24-5 5-5Zm10 2H7c-1.65 0-3 1.35-3 3v10c0 1.65 1.35 3 3 3h10c1.65 0 3-1.35 3-3V7c0-1.65-1.35-3-3-3Zm-5 3.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm4.75-.88a1.12 1.12 0 1 1 0 2.24 1.12 1.12 0 0 1 0-2.24Z" />
    </svg>
  ),
};

const FALLBACK = (
  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 5v6h4v2h-6V7h2Z" />
  </svg>
);

export default function SocialIcon({ platform }: { platform: string }) {
  return ICONS[platform] ?? FALLBACK;
}
