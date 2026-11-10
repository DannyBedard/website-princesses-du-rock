import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
};

const FIELD =
  "w-full rounded-sm border border-foreground/20 bg-background px-4 py-3 transition-colors focus:border-accent focus:outline-none";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-accent2">
        Contact
      </p>
      <h1 className="mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
        Booking
      </h1>
      <p className="mb-10 text-lg text-foreground/70 leading-relaxed">
        Pour un booking ou toute autre question, écrivez-nous. Plus on a de
        détails sur l&apos;événement, plus vite on peut vous répondre.
      </p>

      <form name="contact" method="POST" action="/__forms.html" className="space-y-6">
        <input type="hidden" name="form-name" value="contact" />
        <p className="hidden">
          <label>
            Ne pas remplir: <input name="bot-field" />
          </label>
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium">
              Nom
            </label>
            <input type="text" id="name" name="name" required placeholder="Votre nom" className={FIELD} />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">
              Courriel
            </label>
            <input type="email" id="email" name="email" required placeholder="vous@exemple.com" className={FIELD} />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="event-date" className="mb-2 block text-sm font-medium">
              Date de l&apos;événement <span className="text-foreground/50">(optionnel)</span>
            </label>
            <input type="date" id="event-date" name="event-date" className={FIELD} />
          </div>
          <div>
            <label htmlFor="event-place" className="mb-2 block text-sm font-medium">
              Lieu <span className="text-foreground/50">(optionnel)</span>
            </label>
            <input type="text" id="event-place" name="event-place" placeholder="Ville, salle" className={FIELD} />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder="Type d'événement, durée, détails techniques…"
            className={`${FIELD} resize-none`}
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}
