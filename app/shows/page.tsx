import type { Metadata } from "next";
import Link from "next/link";
import { fetchShows, type Show } from "@/lib/shows";
import JsonLd from "@/components/JsonLd";
import ShowRow from "@/components/ShowRow";
import { showJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  title: "Spectacles",
};

function groupShowsByYear(shows: Show[]): { year: number; shows: Show[] }[] {
  const groups = new Map<number, Show[]>();
  for (const show of shows) {
    const year = show.start.getFullYear();
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year)!.push(show);
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, shows]) => ({ year, shows }));
}

export default async function ShowsPage() {
  const shows = await fetchShows();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {shows.length > 0 && <JsonLd data={shows.map(showJsonLd)} />}
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent2">
        Spectacles
      </p>
      <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
        Prochaines dates
      </h1>

      {shows.length === 0 ? (
        <div className="mt-12 rounded-sm border border-foreground/15 px-6 py-12 text-center">
          <p className="text-lg text-foreground/70">
            Aucune date annoncée pour le moment.
          </p>
          <p className="mt-2 text-sm text-foreground/50">
            Revenez bientôt, ou{" "}
            <Link href="/contact" className="text-accent2 hover:underline">
              écrivez-nous
            </Link>{" "}
            pour un booking.
          </p>
        </div>
      ) : (
        <div className="mt-12 space-y-16">
          {groupShowsByYear(shows).map(({ year, shows: yearShows }) => (
            <section key={year}>
              <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-foreground/50">
                {year}
              </h2>
              <ol className="divide-y divide-foreground/10 border-y border-foreground/10">
                {yearShows.map((show) => (
                  <ShowRow key={show.id} show={show} />
                ))}
              </ol>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
