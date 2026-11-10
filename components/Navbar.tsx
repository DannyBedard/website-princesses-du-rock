"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ExternalLinkIcon from "@/components/ExternalLinkIcon";
import { band } from "@/lib/band";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/shows", label: "Spectacles" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl flex-col items-center justify-center gap-2 px-4 sm:h-24 sm:gap-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${band.name}, accueil`}
          className="text-base font-bold uppercase tracking-[0.2em] text-foreground sm:text-2xl sm:tracking-[0.25em]"
        >
          {band.name}
        </Link>
        <div className="flex items-center gap-3 sm:gap-10">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs font-medium uppercase tracking-[0.1em] sm:tracking-[0.2em] transition-colors sm:text-sm ${
                  active
                    ? "text-accent2"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={band.musicUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Musique sur Bandcamp, ouvre un nouvel onglet"
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] sm:tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground sm:text-sm"
          >
            Musique
            <ExternalLinkIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </a>
        </div>
      </div>
    </nav>
  );
}
