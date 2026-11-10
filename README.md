# Les Princesses du Rock

Site du band, créé à partir de [website-template](https://github.com/DannyBedard/website-template). Next.js 15, Tailwind CSS 4, hébergé sur Netlify.

## Développement

```bash
npm install
npm run dev
```

## Contenu

- Nom, description, vidéo et réseaux sociaux : [lib/band.ts](lib/band.ts)
- Couleurs : variables CSS dans [app/globals.css](app/globals.css)
- Logo : [public/logo.webp](public/logo.webp)

## Spectacles

Les dates viennent du Google Calendar public pointé par `GOOGLE_CAL_ICS_URL` (`.env.local` en local, variable d'environnement sur Netlify). Seuls les événements dont le titre commence par `[princessesrock]` sont affichés, le reste du titre est le nom de la salle. Dans la description de l'événement, une ligne `Billets : <url>` ou `Infos : <url>` devient un bouton. Le calendrier est relu au plus une fois par heure.

## Formulaire de contact

Netlify Forms. Les champs déclarés dans [public/__forms.html](public/__forms.html) doivent rester synchronisés avec [app/contact/page.tsx](app/contact/page.tsx).
