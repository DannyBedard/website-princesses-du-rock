# Les Princesses du Rock

Site du band, créé à partir de [website-template](https://github.com/DannyBedard/website-template). Next.js 15, Tailwind CSS 4.

En ligne sur GitHub Pages : https://dannybedard.github.io/website-princesses-du-rock/

## Déploiement

Le workflow [deploy-github-pages.yml](.github/workflows/deploy-github-pages.yml) construit un export statique (`NEXT_PUBLIC_STATIC_EXPORT=true`) et le publie à chaque push sur `main`, puis une fois par jour pour rafraîchir les spectacles. En export statique, le formulaire de contact est remplacé par un lien Facebook, parce que Netlify Forms n'existe pas sur GitHub Pages.

Sans cette variable, `npm run build` produit le build Next.js normal, prêt pour Netlify (`netlify.toml`).

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

Les dates viennent du Google Calendar public pointé par `GOOGLE_CAL_ICS_URL` (`.env.local` en local, secret GitHub Actions du même nom pour Pages). Seuls les événements dont le titre commence par `[princessesrock]` sont affichés, le reste du titre est le nom de la salle. Dans la description de l'événement, une ligne `Billets : <url>` ou `Infos : <url>` devient un bouton. Sur GitHub Pages, le calendrier est relu à chaque build.

## Formulaire de contact

Netlify Forms. Les champs déclarés dans [public/__forms.html](public/__forms.html) doivent rester synchronisés avec [app/contact/page.tsx](app/contact/page.tsx).
