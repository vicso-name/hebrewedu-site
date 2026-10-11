# Hebrew Alphabet Course first release

Release date: 2026-10-11. The owner approved only the Course Hub at
`/learn/hebrew-alphabet/` and Aleph at `/learn/hebrew-alphabet/aleph/`.

The explicit manifest in `src/data/alphabet-course.json` enables editorial approval,
publication and the actual release date for the hub and Aleph. Lessons 2–22 remain
unpublished, have no implemented routes, and appear as non-interactive Coming Soon
cards. Route generation, navigation, available curriculum, structured data and sitemap
entries share these gates. Importing a source or enabling a local preview grants no
publication approval.

Aleph retains all 11 study blocks and 14 original exercise IDs. Q4 is True, as approved
by the owner; results score out of 14. The accepted source checksum is
`97351799e0a4bc45718cf082486c6584b7acb55bc412aeaea43b81e3cab7bb6a`, fetched anonymously
on 2026-10-11 at 19:30:43 UTC. Normalized provenance is retained with the content;
private raw and historical snapshots are excluded from Git and all build output.
Block 7 includes the approved two vertically arranged dots beside the horizontal line.
The owner accepted unchanged Blocks 2 and 6. No additional editorial substitutions were
made. Original source images remain withheld; teaching uses the approved Hebrew Unicode
forms and written equivalents. The approved Theory → Examples → Practice → Results UX,
Rubik Hebrew font, restrained palette and responsive layouts are retained.

Rubik is copyright 2015 The Rubik Project Authors, licensed under SIL OFL 1.1.
The full copyright and license remain in `src/assets/fonts/Rubik-OFL.txt` and are
distributed at `/licenses/Rubik-OFL.txt` alongside the deployed font.

## Verified deployment workflow

Repository: `vicso-name/hebrewedu-site`. GitHub Pages uses the GitHub Actions workflow
`.github/workflows/deploy.yml`, the custom domain `hebrewedu.com`, and enforced HTTPS.
The production environment permits `main`. A push to `main` runs Node 22, `npm ci`,
`npm run build`, uploads `dist`, and deploys through `actions/deploy-pages@v4`.
Pushing this branch publishes production automatically. There is no separate manual
deployment command. These settings were verified through GitHub's Pages/environment
APIs and successful deployment history before the release.

## Validation

Pre-release checks passed: production build, exactly two generated/indexable course
routes with self-referencing canonicals and sitemap entries, 21 unavailable lesson
routes, all exercise keys and types, and preservation of 98 original page/public
artifacts. Existing page main content, metadata, canonicals, JSON-LD and game assets
are unchanged. Shared header/bundles, the two new sitemap entries and font license
are intended changes. No private source, credentials or unapproved media are emitted.

Chromium checks cover all 14 correct/incorrect answers, locking, retry, mistake review,
14-question results, stage navigation/state preservation, keyboard controls, Hebrew/RTL,
no-JavaScript reading, 320/375/390/1440px layouts and 200% text enlargement. WebKit covers
390px navigation and exercise/results behavior. Private browser evidence and logs stay
outside the release commit. Post-deployment checks repeat these against the live URLs
and inspect the public sitemap and all 21 unpublished lesson responses.

Reproduce the portable release tests and artifact checks:

```sh
node --test tests/alphabet-course-hub.test.mjs tests/lesson-1.test.mjs
npm run build
node scripts/check-alphabet-release.mjs
```

The two historical source-fidelity tests run only when their private snapshots exist.
Clean checkouts skip them explicitly; grading, schema, owner decisions and publication
checks still run using a synthetic adapter fixture. Builds need no snapshots, API
credentials or network lesson fetches.

For browser checks, serve `dist` locally, set `PLAYWRIGHT_MODULE` to an installed
Playwright module with Chromium/WebKit, and use:

```sh
COURSE_PUBLISHED=1 COURSE_PREVIEW_URL=http://127.0.0.1:4343 COURSE_WEBKIT=1 node scripts/check-alphabet-course-hub.mjs
LESSON_POC_PUBLISHED=1 LESSON_POC_URL=http://127.0.0.1:4343 LESSON_POC_WEBKIT=1 node scripts/check-lesson-1-browser.mjs
```

Both URLs can instead be set to `https://hebrewedu.com` for live validation. Optional
`COURSE_BASELINE` and `COURSE_BASELINE_SITEMAP` supply preserved private pre-release
evidence to the artifact checker; no baseline is silently rewritten to hide changes.
