import { band } from "@/lib/band";
import type { Show } from "@/lib/shows";
import { pageUrl, siteUrl } from "@/lib/site";

const facebook = band.socials.find((s) => s.platform === "facebook");

function performer() {
  return {
    "@type": "MusicGroup",
    name: band.name,
    url: pageUrl("/"),
  };
}

export function bandJsonLd() {
  return {
    "@context": "https://schema.org",
    ...performer(),
    description: band.description,
    genre: ["Rock", "Funk"],
    email: band.email,
    image: siteUrl ? `${siteUrl}/og.jpg` : undefined,
    sameAs: facebook ? [facebook.url] : undefined,
  };
}

function startDate(show: Show): string {
  if (!show.isAllDay) return show.start.toISOString();
  const y = show.start.getFullYear();
  const m = String(show.start.getMonth() + 1).padStart(2, "0");
  const d = String(show.start.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function showJsonLd(show: Show) {
  const place = show.venue ?? show.location;
  return {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: place ? `${band.name} · ${place}` : band.name,
    startDate: startDate(show),
    endDate: show.end && !show.isAllDay ? show.end.toISOString() : undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: place
      ? {
          "@type": "Place",
          name: place,
          address: show.location ?? place,
        }
      : undefined,
    performer: performer(),
    image: siteUrl ? `${siteUrl}/og.jpg` : undefined,
    url: pageUrl("/shows"),
    offers: show.ticketUrl
      ? { "@type": "Offer", url: show.ticketUrl, availability: "https://schema.org/InStock" }
      : undefined,
  };
}
