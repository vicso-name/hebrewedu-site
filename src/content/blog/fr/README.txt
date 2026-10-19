FR blog posts live here, one Markdown file per post, named with its French
slug (the file name becomes /fr/blog/<slug>/).

The directory is intentionally empty for now: src/pages/fr/blog/[...index].astro
and [slug].astro build nothing until the first file lands, so there is no empty
FR listing to index and no half-paired hreflang. `astro build` logs
  [WARN] [content] The collection "blogFr" does not exist or is empty
until then — that warning is the expected state, not a problem.

Adding a post (docs/I18N.md §1 and §3, docs/seo/research/fr/BLOG_FR_PLAN.md):
  - `translationKey` must equal the EN post's id, which is what pairs the two
    for reciprocal hreflang;
  - `categoryKey` must be one of src/i18n's `blog.categories` keys;
  - French copy uses `tu`, and high punctuation takes a no-break space;
  - the post needs a row in docs/seo/core/pages.csv before it can be published
    (check:i18n rule 11), and /fr/blog/ needs one too once it starts building.

This file is .txt, not .md, so the `blogFr` glob ('*.md') never picks it up.
