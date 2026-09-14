# Portfolio

My personal portfolio — a single-page site built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Motion**, showcasing my experience, projects, and skills as a Frontend Engineer.

## Tech

- **Next.js 16** (App Router, Turbopack) — statically prerendered
- **TypeScript**
- **Tailwind CSS v4** — theme tokens defined in `src/app/globals.css`
- **Motion** (`motion/react`) for animation
- **next/font** — Inter & JetBrains Mono, self-hosted at build time
- **next/image** for optimized project screenshots

## Structure

```
src/
├── app/
│   ├── globals.css     # Tailwind theme tokens, keyframes, base styles
│   ├── layout.tsx      # fonts, metadata, Open Graph
│   └── page.tsx        # gate → workspace orchestration
├── components/         # one file per section, plus shared primitives
├── content/site.ts     # ← all copy, jobs, projects and skills live here
└── lib/hooks.ts        # reduced motion, in-view, scroll spy, count-up
```

**All content is in [`src/content/site.ts`](src/content/site.ts).** To add a job or
project, edit that file — the components are driven entirely by it and are typed,
so TypeScript will flag anything missing.

Project screenshots live in `public/projects/`.

## Running locally

```bash
npm install
npm run dev     # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # ESLint
```

## Deploying to Vercel

The app needs no configuration — Vercel detects Next.js and infers the build
settings.

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Leave every setting at its default (Framework: Next.js, Build: `next build`,
   Output: `.next`) and click **Deploy**.

Every push to `main` then redeploys production, and every pull request gets its
own preview URL.

To add a custom domain, open the project in Vercel → **Settings → Domains**.
After changing the production URL, update `siteUrl` in
[`src/app/layout.tsx`](src/app/layout.tsx) so canonical and Open Graph tags point
at the right place.

## Notes on motion

Animations respect `prefers-reduced-motion` in two places: a `MotionConfig` with
`reducedMotion="user"` wraps the page, and `globals.css` neutralizes the
CSS-driven animations. The full page is server-rendered behind the intro gate, so
crawlers and visitors without JavaScript still get the complete content.

## Contact

- Email: aliadelali671@gmail.com
- LinkedIn: [linkedin.com/in/aly-adel](https://linkedin.com/in/aly-adel)
- GitHub: [github.com/AlyAdelAly](https://github.com/AlyAdelAly)
