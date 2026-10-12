# hebrewedu.com — Landing site

Astro static site for the **Learn Hebrew – Read & Speak** app.

**Start here:** [Project knowledge index](docs/PROJECT-KNOWLEDGE-INDEX.md) for current
state, approved decisions and documentation authority.

## Current course state and validation

As of 2026-10-12, the Course Hub and Aleph are published. Aleph has **14 active
exercises**, 11 study blocks and Q4's correct answer **True**; lessons 2–22 remain
unpublished. The homepage title is **Hebrew Alphabet App & Reading Practice**.
Current SEO research is Semantic Core v2 with **309 keyword rows**.

Follow the [current release procedure](docs/hebrew-alphabet-release.md). From the
repository root, the portable publication checks are:

```sh
node --test tests/alphabet-course-hub.test.mjs tests/lesson-1.test.mjs
npm run build
node scripts/check-alphabet-release.mjs
```

[check-alphabet-release.mjs](scripts/check-alphabet-release.mjs) validates the built
first-release state. [check-lesson-1-artifacts.mjs](scripts/check-lesson-1-artifacts.mjs)
is **obsolete for current publication validation**: it requires an unpublished,
noindex POC and no course sitemap entries. Historical POC, editorial and readiness
reports are reference-only; their earlier unpublished state, 11 available exercises
and Q4 False requirements do not override the released state. See the
[import workflow](scripts/alphabet-course/README.md) for the separate preserved
import checkpoint and checker prerequisites.

## Stack
- [Astro](https://astro.build) — static site generator
- Vanilla CSS with custom properties (no Tailwind)
- GitHub Actions → GitHub Pages deploy
- Custom domain: `hebrewedu.com`

## Project structure

```
src/
├── components/
│   ├── Nav.astro          # Sticky navigation
│   ├── Hero.astro         # Hero with phone mockup + floating letter cards
│   ├── Features.astro     # 3 feature cards with screenshots
│   ├── HowItWorks.astro   # 4-step process + phone
│   ├── Testimonials.astro # User reviews
│   ├── DownloadCTA.astro  # Indigo CTA section
│   └── Footer.astro       # Footer with nav + legal links
├── layouts/
│   └── Layout.astro       # Base HTML layout with SEO meta
├── pages/
│   ├── index.astro        # Home page
│   ├── terms.astro        # Terms of Service
│   ├── privacy.astro      # Privacy Policy
│   └── blog/
│       └── index.astro    # Blog (ready for content)
└── styles/
    └── global.css         # Design tokens + typography + utilities
```

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview build locally
npm run preview
```

## Screenshots

Place app screenshots in `public/screenshots/`:
- `screen-main.jpg`     → Main screen (Image 1)
- `screen-lessons.jpg`  → Alphabet Lessons (Image 2)
- `screen-trainer.jpg`  → Trainer Hub (Image 3)
- `screen-alphabet.jpg` → Alphabet Explorer (Image 4)
- `screen-reading.jpg`  → Reading Trainer (Image 5)

Recommended size: 600×1200px, WebP or JPG.

## Deploy

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Enable GitHub Pages in repo Settings → Pages → Source: GitHub Actions
4. Add custom domain `hebrewedu.com` in Settings → Pages → Custom domain
5. Point DNS at GitHub: A records → 185.199.108.153 / 109 / 110 / 111

## Design tokens

All design decisions live in `src/styles/global.css`:
- `--brand: #6366F1` — primary indigo
- `--brand-dark: #4F46E5` — hover state
- `--emerald: #10B981` — secondary accent
- `--amber: #F59E0B` — highlights, stars
- `--ink: #1F2937` — body text
- Font display: Bricolage Grotesque
- Font body: DM Sans

Game publishing and updates: follow the canonical [Game Publishing Runbook](docs/GAME_PUBLISHING_RUNBOOK.md).
