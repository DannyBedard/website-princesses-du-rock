import SocialIcon from "@/components/SocialIcon";
import { band } from "@/lib/band";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-foreground/10 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm text-foreground/60">
            © {currentYear} {band.name}. Tous droits réservés.
          </div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href={`mailto:${band.email}`}
              className="text-sm text-foreground/60 transition-colors hover:text-accent2"
            >
              {band.email}
            </a>
            {band.socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-foreground/60 transition-colors hover:text-accent2"
              >
                <SocialIcon platform={s.platform} />
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
