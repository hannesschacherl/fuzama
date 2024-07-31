# Fuzama
Arbeitszeitmanagement am Beispiel einer 35h Woche

## Verwendete Technologien
- Nuxt3
- Vue3
- TypeScript
- TailwindCSS
- HeadlessUI
- HeroIcons
- Autoprefixer
- PostCSS

# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# bun
bun run dev
```

## Production

Build the application for production:

```bash
git tag v[versionsNummer]
git push origin v[versionsNummer]
```

Beim erstellen eines neuen Tags wird das Projekt mittels GitHub Actions gebaut.

Es wird ein release erstellt, dem die fertige .tar Datei angefügt wird.
Der Release hat den Tag Versionsnamen.


Locally preview production build:

```bash
# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
