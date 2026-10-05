# Alef Bet Rush release workflow

Alef Bet Rush is owned, verified and built by the separate `hebrewedu-playables` / `playable-debug` project. This Astro repository consumes only its production web artifact. Do not copy game source, import Phaser into Astro, or add workspace dependencies between the repositories.

## Release

In the playables repository:

```sh
pnpm verify
pnpm build:web
```

In this Astro repository:

```sh
npm run sync:alef-bet-rush -- <path-to-playables-repo>/dist/web/alef-bet-rush/
npm run build
```

Review the generated artifact and changes before committing. Committing `public/game-builds/alef-bet-rush/` is supported and keeps GitHub Pages deployments self-contained. No cross-repository CI is configured. The first integration consumes the existing production build; it does not claim to have rerun the upstream release verification.

The sync command accepts exactly one directory argument. It validates `index.html`, runtime script references, local HTML/CSS and bundled asset references, nonempty files, and all 22 audio manifest entries. It rejects symlinks, overlapping source/destination trees, external or root-relative asset URLs, missing files and empty files. It stages and validates the complete copy before removing the previous destination, preserving the deployed artifact when input validation fails. A successful sync replaces the whole directory to remove stale files; hashed filenames remain unchanged.

Every copied HTML document gets `<meta name="robots" content="noindex, follow" />`; existing robots tags are replaced and runtime canonical tags removed. The source build is never modified. Do not edit bundled JavaScript or CSS in Astro. Fix game defects upstream, build, and sync again.

## Routes and loading

- Canonical product page: `https://hebrewedu.com/play/alef-bet-rush/`.
- Game hub: `https://hebrewedu.com/play/`.
- Focused player (noindex): `/play/alef-bet-rush/game/`.
- Internal runtime: `/game-builds/alef-bet-rush/index.html`.

Only landing routes appear in navigation, SEO links, structured data and sitemap. Do not disallow the runtime in robots.txt: crawlers must be able to fetch its noindex directive. Static artifact HTML bypasses the Astro layout and its default index metadata.

The landing page has a direct “Play Now” link to `/play/alef-bet-rush/game/` in the same tab. The former inline game-mount component is removed: the landing no longer embeds the game or contains its iframe activation script. The player route renders the iframe pointing to `/game-builds/alef-bet-rush/index.html`.

The player is a standalone document without the site Nav/Footer or JSON-LD. It has `noindex, follow`, points its canonical to the product landing, and is absent from the explicit sitemap route list. A keyboard-accessible Back to Alef Bet Rush link returns to `/play/alef-bet-rush/`.

The player uses a `100dvh` grid (with a `100vh` fallback), a compact top bar in normal flow, and a zero-minimum remaining row filled by the iframe. Safe-area padding protects the Back control. The trusted same-origin iframe has no sandbox attribute or additional permissions delegation. This migration does not modify the bundled game artifact. Iframe isolation separates the game document and styles; it is not a security boundary against trusted same-origin code. Audio still requires interaction inside the game.

## Focused player validation

Checks for the standalone-player migration:

- `npm run build` emits `/play/alef-bet-rush/game/index.html`; `git diff --check` passes.
- Chromium checks at 320×568, 375×667, 390×844, 768×1024, 1280×900 and 1440×900 verify the viewport-height document, remaining-height iframe, canvas rendering, and absence of horizontal or vertical overflow. Resizing to landscape and back preserves the layout.
- The landing contains no iframe or inline game mount and requests no game artifact assets before activation. Keyboard activation of Play Now navigates to the player in the same tab; browser Back and the player's Back link return to the landing.
- The player renders no site navigation, footer or JSON-LD. Its robots directive is `noindex, follow`, its canonical points to the landing, and it is absent from the sitemap.
- The player has a dark document background and a visible keyboard focus outline on its Back link. These styles belong to the standalone document.

These checks cover routing, initial game rendering and browser layout. This migration does not claim to reverify mission completion, audio playback, save persistence, in-game Home behaviour or Google Play popups. Physical mobile browser behaviour has not been checked in this task.

## First integration validation (historical inline player)

The following records predate this migration and were not rerun for the standalone-player change. They are historical checks, not current validation results.

Artifact: 27 files, 2,007,414 bytes (about 1.91 MiB), including the noindex HTML transformation. JavaScript, CSS and all hashed assets are copied unchanged.

- `npm run build` passes and produces both `/play/` routes and all existing routes.
- Generated product HTML contains the title, description, canonical, structured data, educational sections, FAQs and links without executing JavaScript.
- Sitemap includes both canonical landing routes and no game-build URL.
- Chromium QA at 320×568, 390×844, 768×1024 and 1280×900: zero runtime requests before Play; runtime boots after keyboard activation; canvas exactly fits the iframe; no horizontal overflow; player height stays unchanged; no game page errors.
- No audio playback starts at boot. Playback API instrumentation confirms letter audio starts after mission interaction. Audible output still needs a human listening check.
- Real answer progress saves to localStorage, survives leaving the mission and survives reloading/relaunching the game.
- Galaxy Map and mission entry respond to keyboard input. Leaving a mission returns to the map.
- A real keyboard-driven run completed all three First Signal missions (44 correct answers), reached the first-planet milestone CTA, and opened the correct Google Play popup from inside the iframe. Its dialog stayed within the frame at all four requested sizes.
- The page-level app CTA opens the correct Google Play destination in a new tab. Automated navigation intercepts that destination rather than checking Google's live store response.
- Existing home, blog, privacy, website privacy, terms and hub routes return 200 with no horizontal overflow at all four widths.
- Sync negative checks reject missing audio and missing index without altering the existing artifact; successful sync removes a stale file.

QA screenshots and detailed measurements are available locally under `/tmp/alef-astro-qa/`; these are not deployment assets.

## Limitations

Approved artwork lives in `src/assets/play/alef-bet-rush-key-art.png`. The shared `KeyArt.astro` component uses Astro Picture to produce AVIF/WebP with a JPEG fallback at 320, 480, 640, 960 and 1280 pixels wide. The featured hub card loads lazily. The removed landing-page game preview is no longer an artwork placement; the shared image component and hub artwork are unchanged by this migration. Only the product page uses the derived 1200×630 JPEG social image at `/images/play/alef-bet-rush-og.jpg`; the hub retains the existing site social image. The approved PNG is the single source asset; do not replace or regenerate it.

Browser QA is Chromium emulation, not physical iOS/Android device testing. Progress is browser-local, not cross-device. The game's own canvas accessibility and lifecycle behavior remain owned by the upstream project. Sync checks known production asset references and the complete audio manifest; browser boot/network QA remains part of every release to catch dynamically constructed references.
