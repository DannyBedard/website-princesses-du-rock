import Link from "next/link";
import Hero from "@/components/Hero";
import JsonLd from "@/components/JsonLd";
import { bandJsonLd } from "@/lib/structuredData";
import ShowRow from "@/components/ShowRow";
import VideoCard from "@/components/VideoCard";
import { band } from "@/lib/band";
import { fetchShows } from "@/lib/shows";

const PREVIEW_COUNT = 3;

export default async function Home() {
  const shows = (await fetchShows()).slice(0, PREVIEW_COUNT);

  return (
    <>
      <JsonLd data={bandJsonLd()} />
      <Hero />

      {shows.length > 0 && (
        <section className="mx-auto max-w-5xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-accent2">
              Prochains spectacles
            </h2>
            <Link
              href="/shows"
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              Toutes les dates
            </Link>
          </div>
          <ol className="divide-y divide-foreground/10 border-y border-foreground/10">
            {shows.map((show) => (
              <ShowRow key={show.id} show={show} />
            ))}
          </ol>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-accent2">
          En vidéo
        </h2>
        <VideoCard youtubeId={band.youtubeId} title={band.name} />
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className={band.members.length > 1 ? "grid gap-12 md:grid-cols-2" : "max-w-3xl"}>
          {band.members.map((member) => (
            <article key={member.name} className="border-l-2 border-accent pl-6">
              <h3 className="text-2xl font-bold leading-tight sm:text-3xl">{member.name}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-[0.2em] text-foreground/50">
                {member.role}
              </p>
              <div className="mt-5 space-y-4 text-foreground/75 leading-relaxed">
                {member.bio.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Un party, un festival, une salle?
            </h2>
            <p className="mt-3 text-lg text-foreground/70">
              Écrivez-nous avec la date et le lieu.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-accent px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Booker le band
          </Link>
        </div>
      </section>
    </>
  );
}
