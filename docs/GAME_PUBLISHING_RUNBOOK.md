# HebrewEdu Game Publishing Runbook

Canonical workflow for new games and updates on **hebrewedu.com**. Game source development and production builds belong to `hebrewedu-playables` (local checkout: `playable-debug`). Production web artifacts are synchronized into `hebrewedu-site`; Astro owns the catalog, indexable SEO/product landing, focused player and deployment integration. Games are self-contained and need no runtime backend. **Distribution is web-only.**

## 1. Production architecture

| Public path | Purpose | Indexing / canonical |
|---|---|---|
| `/play/<game>/` | SEO/product landing; search entry point | Indexable; self canonical |
| `/play/<game>/game/` | Focused player | `noindex, follow`; canonical points to landing |
| `/game-builds/<game>/index.html` | Synced runtime | `noindex, follow`; runtime canonical removed by sync |

```text
GAME REPO
  | build:web
  v
dist/web/<game>/
  | sync:<game>
  v
SITE REPO: public/game-builds/<game>/
  | same-origin iframe
  v
/play/<game>/game/
  ^ Play Now
/play/<game>/
  ^ Read More
/play/
```

The player embeds trusted same-origin runtime HTML. Game code remains owned by the game repository: **never manually edit runtime files in the site repository**. Sync preserves generated JS/CSS and hashed assets, modifying HTML indexing metadata only. Commit the synced artifact so GitHub Pages builds are self-contained; no cross-repository CI performs the sync.

Only landing pages belong in SEO links and the sitemap. Do not block player/runtime crawling in `robots.txt`: crawlers must see their noindex directives.

## 2. Naming contract

Set `GAME=<game-slug>`; production examples are `alef-bet-rush` and `hebrew-mahjong`.

| Item | Contract |
|---|---|
| Game package | `@hebrewedu/$GAME` under `games/$GAME/` |
| Build output | Game repo: `dist/web/$GAME/` |
| Landing URL | `https://hebrewedu.com/play/$GAME/` |
| Player URL | `https://hebrewedu.com/play/$GAME/game/` |
| Runtime URL | `https://hebrewedu.com/game-builds/$GAME/index.html` |
| Site runtime | `public/game-builds/$GAME/` |
| Site landing | `src/pages/play/$GAME/index.astro` |
| Site player | `src/pages/play/$GAME/game/index.astro` |
| Sync script | `scripts/sync-$GAME.mjs` |
| Site package command | `sync:$GAME` |

Each game needs its own stable `gameId`, persistence namespace and analytics location identifiers. Web storage derives `hebrewedu.playables.<encoded-gameId>.save`; new games must not copy Alef Bet Rush's legacy shared-key migration. Landing CTA examples: `alef_bet_rush_continue` and `hebrew_mahjong_continue`.

## 3. Scenario A — Publish a NEW game

### Phase 1 — Game repository

Use Node and pnpm versions declared in the game repo (`Node >=22.13.0`, `pnpm@12.6.0` at time of writing). Install with `pnpm install --frozen-lockfile` if needed; site dependencies use `npm ci`.

```sh
GAME=example-game # replace with the actual package slug
GAME_REPO=/Users/kasutaja/Desktop/playable-debug
SITE_REPO=/Users/kasutaja/Developer/web/hebrewedu-site
cd "$GAME_REPO"
git status --short
git branch -vv
pnpm typecheck
pnpm test:core
# Run the game's relevant learning/content/layout/audio/storage tests (see below).
pnpm --filter "@hebrewedu/$GAME" build:web
test -s "dist/web/$GAME/index.html"
```

Follow the game repo's `docs/RELEASE_CHECKLIST.md`, `docs/UI_UX_CONTRACT.md` and `docs/AUDIO_CONTRACT.md`. Verify relative local asset paths, no unintended external runtime requests, readiness, pause/resume, resize including 320×568, gesture-triggered audio and isolated persistence. Record the source commit and checks actually passed.

Existing validation commands:

- Alef Bet Rush: `pnpm verify` runs its established verification suite and build; its build validates and emits the 22-letter audio manifest.
- Hebrew Mahjong: `pnpm --filter @hebrewedu/hebrew-mahjong test` runs its game-owned tests; run shared checks above and its filtered production build too.
- New game: inspect its `package.json` and select existing relevant tests. Do not assume it has a `test` script or requires Alef Bet Rush-specific checks.

The root `pnpm build:web`, `pnpm build` and `pnpm verify` currently target Alef Bet Rush. Always use the filtered build for the selected game. Both production Vite configs use `base: './'` and output to `dist/web/$GAME/`.

### Phase 2 — Site sync integration

Create `scripts/sync-$GAME.mjs` from the existing [Mahjong sync](../scripts/sync-hebrew-mahjong.mjs) or [Alef sync](../scripts/sync-alef-bet-rush.mjs); change destination, temporary-directory prefix, usage text and diagnostics to the new slug.

Every sync must:

- Accept exactly one production source directory; validate it and reject overlapping source/destination trees.
- Reject symlinked entries, unsupported entries and a symlink destination. Existing scripts resolve the source root through `realpath`; they do not reject a root path merely because it resolves through a symlink.
- Require a complete, nonempty root `index.html` with a runtime script and nonempty assets.
- Validate supported HTML/CSS/bundled asset references: relative local paths, no path escapes, missing files, external or root-relative asset URLs. Static checks do not catch every dynamically constructed URL; browser network QA is required.
- Stage a complete copy, transform HTML, validate again, then replace the entire destination to remove stale files. Existing scripts remove the old destination then rename the stage; this is staged replacement, **not a fully atomic swap**. Validation failure before replacement preserves the old artifact; keep the previous committed artifact available for recovery.
- Enforce `<meta name="robots" content="noindex, follow" />` in every runtime HTML document, replacing old crawler tags and removing canonical tags.
- Leave source files and generated game logic unchanged; fail loudly on invalid artifacts.

Alef Bet Rush's sync additionally requires `letter-audio-manifest.json` with 22 unique entries. Mahjong has local recorded audio but no such manifest requirement. Do not blindly duplicate game-specific validation.

Add to site `package.json` scripts:

```json
"sync:<game>": "node scripts/sync-<game>.mjs"
```

Replace `<game>` with the slug, then:

```sh
cd "$SITE_REPO"
git status --short
git branch -vv
npm run "sync:$GAME" -- "$GAME_REPO/dist/web/$GAME"
test -s "public/game-builds/$GAME/index.html"
git diff -- "public/game-builds/$GAME/"
```

Confirm destination contents, unchanged hashed assets and injected noindex metadata.

### Phase 3 — Player route

Create `src/pages/play/$GAME/game/index.astro`, using [Mahjong's player](../src/pages/play/hebrew-mahjong/game/index.astro) or [Alef's player](../src/pages/play/alef-bet-rush/game/index.astro) as the reference. Replace every game name, slug, title and canonical.

- Standalone document: no normal Nav/Footer, JSON-LD or duplicate SEO content.
- Compact, keyboard-accessible Back link to `/play/$GAME/`.
- `100dvh` viewport grid with `100vh` fallback; safe-area padding and `minmax(0, 1fr)` remaining row filled by iframe, without overflow.
- Same-origin iframe source `/game-builds/$GAME/index.html`, descriptive title, no sandbox or extra permissions delegation under the current trusted-artifact architecture.
- Robots `noindex, follow`; canonical `https://hebrewedu.com/play/$GAME/`.
- Verify mobile, desktop and orientation changes.

### Phase 4 — SEO/product landing

Before writing copy, define actual mechanics, educational objective, audience, exact taught/excluded content, primary search intent, title/description, H1, launch CTA, FAQ, schema and app progression CTA. Inspect existing `/play/` pages; avoid blindly reusing another game's primary keyword or unnecessary keyword cannibalization.

Create `src/pages/play/$GAME/index.astro` using existing landings and HebrewEdu components/styles:

- Indexable, self canonical, exactly one H1; accurate feature claims only.
- Primary launch CTA to `/play/$GAME/game/`; internal link back to `/play/`.
- `WebPage`, `VideoGame` / `WebApplication` and `BreadcrumbList` schema using the landing URL.
- Visible accurate FAQ; add `FAQPage` only for this page's eligible content, without duplicating FAQ markup elsewhere or through both component and page. Currently `Faq.astro` renders visible questions only, and Mahjong adds its schema at page level; inspect the component before adding schema.
- Final HebrewEdu learning/app CTA where appropriate, with a game-specific `StoreButtons` location.
- Add the landing to `staticPages` in `src/pages/sitemap.xml.ts` with an accurate last-modified date. Never add the player or runtime.

Scope examples: Alef Bet Rush teaches recognition and names of 22 standard letters through 24 missions/8 planets. Mahjong matches letters to their names on layered free-tile boards, introducing 22 letters in 7 sets. Letter names are not all contextual word sounds; neither landing should claim that alphabet practice teaches full reading, final forms or niqqud.

### Phase 5 — Catalog

Update `src/pages/play/index.astro` with a card using current components, design tokens and `home.css` / `play.css`:

| Action | Target | Visual priority |
|---|---|---|
| Read More | `/play/$GAME/` | Secondary (`btn-outline`) |
| Play Now | `/play/$GAME/game/` | Primary (`btn-primary`) |

Use accurate scope copy and the shared 16:9 artwork frame. Review catalog FAQ claims such as which games are available. Keep the HebrewEdu visual system; do not create a disconnected neon/game-portal design.

### Phase 6 — Key art

Recommended new-game asset: `public/images/play/<game>-key-art.jpg`, roughly 16:9, approximately 1200px wide, reasonably compressed. Mahjong uses a 1200×675 JPEG at this path. Set dimensions, useful alt text and lazy loading on catalog images.

Do not place unused multi-megabyte source artwork in `public/` or commit it solely for archival purposes. Optimize the web asset first. Alef Bet Rush is an existing exception: its approved source is in `src/assets/play/`, processed by `KeyArt.astro` into responsive formats, with a separate social JPEG. Do not blindly copy that game's component or replace its approved artwork.

### Phase 7 — Local validation

```sh
cd "$SITE_REPO"
npm run build
git diff --check
git status --short
npm run preview
```

Open the preview URL printed by Astro and visually check `/play/`, `/play/$GAME/` and `/play/$GAME/game/`:

- Read More and Play Now targets, Back link and keyboard navigation.
- Mobile (including 320×568), desktop and orientation layout; consistent artwork crop.
- Launch, input, resize, pause/resume, audible audio after interaction inside the iframe.
- Progress survives reload where applicable, without altering another game's progress. Mahjong saves during play with a roughly five-second debounce; allow the save to finish or leave via a normal saving transition before reload.
- No missing assets/404s or unintended runtime external requests in browser Network/Console.
- Built HTML indexing/canonicals and sitemap match sections 1 and 4.

### Phase 8 — Commit + push

These are separate repositories; use separate logical commits and stage explicit intended paths only. Review `git diff`, `git diff --check`, `git status --short` and `git branch -vv` in each repo. Never mix unrelated changes. Commit source changes in the game repo and synced runtime/integration changes in the site repo; an already committed source release needs no empty game commit.

Example site message: `git commit -m "feat: publish <Game Name>"` (choose a suitable message). Push only after validation succeeds and the current branch/upstream is the expected one. Stop and report branch ambiguity or unrelated dirty work rather than pushing.

The site deploys automatically through `.github/workflows/deploy.yml` on pushes to `main` using GitHub Actions → GitHub Pages. A push to another branch does not publish it. Do not silently switch branches; follow the repository's review/merge process. Wait for successful deployment before production QA. The game repo push alone does not deploy a game.

### Phase 9 — Production QA

```sh
GAME=hebrew-mahjong # or the released slug
for url in \
  "https://hebrewedu.com/play/$GAME/" \
  "https://hebrewedu.com/play/$GAME/game/" \
  "https://hebrewedu.com/game-builds/$GAME/index.html"
do
  curl -L -sS -o /dev/null -w "%{http_code}  %{url_effective}\n" "$url"
done
```

Expected: **all 200**, with the intended final URLs. Fetch deployed HTML and headers for SEO inspection:

```sh
for path in "play/$GAME/" "play/$GAME/game/" "game-builds/$GAME/index.html"
do
  curl -fLsS -D - "https://hebrewedu.com/$path"
done
```

| Document | Required result |
|---|---|
| Landing | 200; indexable (no HTML/header noindex); self canonical |
| Player | 200; `noindex, follow`; canonical → landing |
| Runtime | 200; `noindex, follow`; no runtime canonical |

Check production sitemap includes the landing and excludes player/runtime. Repeat launch, interaction-triggered audio, persistence, pause/resume and responsive/mobile checks; inspect Network for missing assets/404s. Confirm deployed hashed assets match the intended synced version. HTTP 200 alone does not prove a working game.

## 4. Scenario B — Update an EXISTING game

Normal runtime-only updates use this few-minute path once game-side verification passes. Keep the existing landing, player, catalog card, artwork and SEO schema unless they actually changed.

```sh
GAME=hebrew-mahjong # existing slug; alef-bet-rush also supported
GAME_REPO=/Users/kasutaja/Desktop/playable-debug
SITE_REPO=/Users/kasutaja/Developer/web/hebrewedu-site
cd "$GAME_REPO"
git status --short
git branch -vv
# Pass docs/RELEASE_CHECKLIST.md and relevant tests from phase 1.
pnpm --filter "@hebrewedu/$GAME" build:web
cd "$SITE_REPO"
git status --short
git branch -vv
npm run "sync:$GAME" -- "$GAME_REPO/dist/web/$GAME"
npm run build
git diff --check
git status --short
git diff -- "public/game-builds/$GAME/"
```

Review the runtime diff and local player behavior. Commit only the refreshed artifact and intentionally changed integration files; commit game source separately if changed. Push using phase 8's branch/validation rules, wait for deployment and repeat phase 9's HTTP, indexing, launch, audio, persistence and mobile QA.

Update landing/catalog when gameplay scope, supported letters/content, educational promise, CTA, screenshots/key art or justified SEO metadata changes. Update landing sitemap `lastmod` when the landing changes, not automatically for every runtime refresh.

## 5. DO NOT

- Do not manually edit `public/game-builds/<game>/` or treat Astro as game source code.
- Do not make `/play/<game>/game/` indexable or canonicalize the landing to the player.
- Do not reuse another game's persistence namespace or analytics location identifiers.
- Do not blindly reuse another game's SEO copy or Alef Bet Rush-specific manifests.
- Do not ship unused multi-megabyte artwork into public assets.
- Do not commit/push a release before the site build and `git diff --check` succeed.
- Do not restore YouTube Playables-specific requirements.
- Do not add a backend dependency just to publish a self-contained game.

## 6. 30-second release checklist

**NEW GAME**

- [ ] Game-side verification + filtered `build:web`
- [ ] Sync script + package command
- [ ] Sync artifact
- [ ] Player route
- [ ] Landing + sitemap entry
- [ ] `/play/` card
- [ ] Optimized key art
- [ ] Site build
- [ ] Diff check + intended-files/branch review
- [ ] Separate commits/pushes + successful deployment
- [ ] Production 200/noindex/canonical QA
- [ ] Play/audio/persistence/mobile QA

**EXISTING GAME UPDATE**

- [ ] Game-side verification + filtered `build:web`
- [ ] Sync artifact
- [ ] Site build
- [ ] Diff check + runtime/branch review
- [ ] Separate commits/pushes + successful deployment
- [ ] Production QA

## 7. Troubleshooting

| Symptom | Action |
|---|---|
| Sync rejects artifact / missing `index.html` | Use the filtered production build output, not source or dev output. Read the error; fix upstream and rebuild. Check relative paths, nonempty local assets, symlinks and only that game's required manifests. |
| Runtime assets 404 | Check iframe URL, deployed hashed files and Vite relative base. Resync the complete output; never patch generated asset URLs in Astro. |
| Player works locally, not production | Confirm site `main` deployment succeeded and includes the synced files; compare deployed HTML/assets and browser Network errors. |
| Player/runtime accidentally indexable | Fix player metadata or sync transformation, rebuild/resync, deploy and inspect actual HTML/headers. Do not hide them with a robots.txt block. |
| Stale deployment/cache | Check GitHub Actions deployment and committed asset hashes first; hard reload and inspect Network. Do not invent a cache-purge service. |
| Image heavily cropped | Review the 16:9 `object-fit: cover` frame; prepare artwork with important content inside the frame or intentionally adjust its positioning. |
| Progress appears shared between games | Check distinct stable `gameId` and storage keys upstream; new games must not read Alef Bet Rush's legacy shared key. Rebuild/resync after fixing source. |
| Audio fails before first interaction | Browser gesture policy is expected. Interact inside the game, check mute and audio requests; boot must work without audio. Retry from a later trusted gesture, not automatic focus/frame loops. |
