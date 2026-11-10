import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Merci",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Merci pour votre message!</h1>
      <p className="mx-auto mb-10 max-w-xl text-lg text-foreground/70">
        On l&apos;a bien reçu et on vous répond dès que possible.
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
