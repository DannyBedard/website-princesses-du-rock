import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:px-8">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent2">
        Erreur 404
      </p>
      <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
        Fausse note
      </h1>
      <p className="mx-auto mb-10 max-w-xl text-lg text-foreground/70">
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <div className="flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-accent px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Accueil
        </Link>
        <Link
          href="/shows"
          className="rounded-full border border-foreground/60 px-8 py-3 font-semibold transition-colors hover:bg-foreground hover:text-background"
        >
          Spectacles
        </Link>
      </div>
    </div>
  );
}
