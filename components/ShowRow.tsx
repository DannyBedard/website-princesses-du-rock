import type { Show } from "@/lib/shows";

const LINK_LINE = /^\s*(billets?|billetterie|tickets?|infos?|détails?|details?)\s*:/i;

function formatDate(d: Date, isAllDay: boolean) {
  const day = d.toLocaleDateString("fr-CA", { day: "numeric" });
  const month = d.toLocaleDateString("fr-CA", { month: "short" }).replace(".", "");
  const weekday = d.toLocaleDateString("fr-CA", { weekday: "long" });
  const time = isAllDay
    ? undefined
    : d.toLocaleTimeString("fr-CA", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
  return { day, month, weekday, time };
}

export default function ShowRow({ show }: { show: Show }) {
  const { day, month, weekday, time } = formatDate(show.start, show.isAllDay);
  const text = (show.description ?? "")
    .split("\n")
    .filter((l) => l.trim() && !LINK_LINE.test(l))
    .join(" ");

  return (
    <li className="flex flex-col gap-4 py-6 sm:grid sm:grid-cols-[96px_1fr_auto] sm:items-center sm:gap-8 sm:py-8">
      <div className="flex items-baseline gap-2 sm:flex-col sm:items-start sm:gap-1">
        <span className="text-4xl font-bold leading-none text-accent sm:text-5xl">{day}</span>
        <span className="text-xs font-medium uppercase tracking-widest text-foreground/60 sm:text-sm">
          {month}
        </span>
      </div>

      <div className="min-w-0">
        <h3 className="text-lg font-semibold sm:text-xl">{show.venue ?? show.title}</h3>
        <p className="mt-1 text-sm text-foreground/60">
          <span className="capitalize">{weekday}</span>
          {time ? ` · ${time}` : ""}
          {show.location && show.location !== show.venue ? ` · ${show.location}` : ""}
        </p>
        {text && <p className="mt-2 text-sm text-foreground/70">{text}</p>}
      </div>

      {(show.ticketUrl || show.infoUrl) && (
        <div className="flex w-full flex-col gap-2 sm:w-fit sm:flex-row sm:items-center">
          {show.ticketUrl && (
            <a
              href={show.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-fit sm:py-2"
            >
              Billets
            </a>
          )}
          {show.infoUrl && (
            <a
              href={show.infoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center rounded-full border border-foreground/25 px-6 py-2.5 text-sm font-semibold text-foreground/70 transition-colors hover:border-foreground hover:text-foreground sm:w-fit sm:py-2"
            >
              Infos
            </a>
          )}
        </div>
      )}
    </li>
  );
}
