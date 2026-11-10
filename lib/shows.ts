import { band } from "@/lib/band";

export interface Show {
  id: string;
  start: Date;
  end?: Date;
  isAllDay: boolean;
  title: string;
  venue?: string;
  location?: string;
  ticketUrl?: string;
  infoUrl?: string;
  description?: string;
}

const HREF_REGEX = /href=["']?(https?:\/\/[^"'\s>]+)/i;
const URL_REGEX = /(https?:\/\/[^\s"'<>]+)/i;
const TAG_REGEX = /^\s*\[([^\]]+)\]\s*(.*)$/;

function stripHtml(value: string): string {
  return value
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|tr|table|li)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

function unfoldLines(raw: string): string[] {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const unfolded: string[] = [];
  for (const line of lines) {
    if (line.startsWith(" ") || line.startsWith("\t")) {
      unfolded[unfolded.length - 1] += line.slice(1);
    } else {
      unfolded.push(line);
    }
  }
  return unfolded;
}

function unescapeICS(value: string): string {
  return value
    .replace(/\\n/gi, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

interface ParsedDate {
  date: Date;
  isDateOnly: boolean;
}

function parseICSDate(value: string): ParsedDate | null {
  const trimmed = value.trim();
  if (/^\d{8}T\d{6}Z$/.test(trimmed)) {
    const d = `${trimmed.slice(0, 4)}-${trimmed.slice(4, 6)}-${trimmed.slice(6, 8)}T${trimmed.slice(9, 11)}:${trimmed.slice(11, 13)}:${trimmed.slice(13, 15)}Z`;
    return { date: new Date(d), isDateOnly: false };
  }
  if (/^\d{8}T\d{6}$/.test(trimmed)) {
    const d = `${trimmed.slice(0, 4)}-${trimmed.slice(4, 6)}-${trimmed.slice(6, 8)}T${trimmed.slice(9, 11)}:${trimmed.slice(11, 13)}:${trimmed.slice(13, 15)}`;
    return { date: new Date(d), isDateOnly: false };
  }
  if (/^\d{8}$/.test(trimmed)) {
    const d = `${trimmed.slice(0, 4)}-${trimmed.slice(4, 6)}-${trimmed.slice(6, 8)}T12:00:00`;
    return { date: new Date(d), isDateOnly: true };
  }
  const fallback = new Date(trimmed);
  return Number.isNaN(fallback.getTime())
    ? null
    : { date: fallback, isDateOnly: false };
}

interface RawEvent {
  UID?: string;
  SUMMARY?: string;
  DESCRIPTION?: string;
  LOCATION?: string;
  DTSTART?: string;
  DTEND?: string;
}

function parseICS(text: string): RawEvent[] {
  const lines = unfoldLines(text);
  const events: RawEvent[] = [];
  let current: RawEvent | null = null;

  for (const line of lines) {
    if (line === "BEGIN:VEVENT") {
      current = {};
      continue;
    }
    if (line === "END:VEVENT") {
      if (current) events.push(current);
      current = null;
      continue;
    }
    if (!current) continue;

    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const rawKey = line.slice(0, colonIdx);
    const value = line.slice(colonIdx + 1);
    const key = rawKey.split(";")[0].toUpperCase();

    switch (key) {
      case "UID":
      case "SUMMARY":
      case "DESCRIPTION":
      case "LOCATION":
      case "DTSTART":
      case "DTEND":
        current[key] = value;
        break;
    }
  }

  return events;
}

function parseSummary(summary: string): {
  tag?: string;
  venue?: string;
} {
  const match = summary.match(TAG_REGEX);
  if (!match) {
    return { venue: summary.trim() || undefined };
  }
  return {
    tag: match[1].toLowerCase().trim(),
    venue: match[2].trim() || undefined,
  };
}

function firstUrl(text: string): string | undefined {
  const href = text.match(HREF_REGEX);
  if (href) return href[1];
  return text.match(URL_REGEX)?.[0];
}

// Reads "Billets : <url>" and "Info : <url>" lines from the (cleaned) description.
// Falls back to treating the first URL as the ticket link when no label is present.
function extractLinks(rawDescription?: string): {
  ticketUrl?: string;
  infoUrl?: string;
} {
  if (!rawDescription) return {};
  const text = stripHtml(rawDescription);
  let ticketUrl: string | undefined;
  let infoUrl: string | undefined;

  for (const line of text.split("\n")) {
    if (/^\s*(billets?|billetterie|tickets?)\s*:/i.test(line)) {
      ticketUrl = ticketUrl ?? firstUrl(line);
    } else if (/^\s*(infos?|détails?|details?)\s*:/i.test(line)) {
      infoUrl = infoUrl ?? firstUrl(line);
    }
  }

  if (!ticketUrl && !infoUrl) {
    ticketUrl = firstUrl(rawDescription);
  }

  return { ticketUrl, infoUrl };
}

export async function fetchShows(): Promise<Show[]> {
  const url = process.env.GOOGLE_CAL_ICS_URL;
  if (!url) return [];

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) {
      console.error(`[shows] Calendar fetch failed: ${res.status}`);
      return [];
    }
    const text = await res.text();
    const rawEvents = parseICS(text);
    const now = Date.now();
    const shows: Show[] = [];

    for (const ev of rawEvents) {
      if (!ev.DTSTART) continue;
      const parsed = parseICSDate(ev.DTSTART);
      if (!parsed) continue;
      if (parsed.date.getTime() < now - 24 * 60 * 60 * 1000) continue;

      const summary = unescapeICS(ev.SUMMARY ?? "");
      const { tag, venue } = parseSummary(summary);
      if (tag !== band.calendarTag) continue;
      const rawDescription = ev.DESCRIPTION ? unescapeICS(ev.DESCRIPTION) : undefined;
      const description = rawDescription ? stripHtml(rawDescription) : undefined;
      const { ticketUrl, infoUrl } = extractLinks(rawDescription);
      const location = ev.LOCATION ? unescapeICS(ev.LOCATION) : undefined;
      const end = ev.DTEND ? parseICSDate(ev.DTEND)?.date : undefined;

      shows.push({
        id: ev.UID ?? `${parsed.date.toISOString()}-${summary}`,
        start: parsed.date,
        end,
        isAllDay: parsed.isDateOnly,
        title: venue ?? summary,
        venue: venue ?? location ?? undefined,
        location,
        ticketUrl,
        infoUrl,
        description,
      });
    }

    return shows.sort((a, b) => a.start.getTime() - b.start.getTime());
  } catch (err) {
    console.error("[shows] Failed to parse calendar:", err);
    return [];
  }
}
