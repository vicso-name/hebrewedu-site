# HebrewEdu — Phase 4: content quality and educational value audit

**Observed:** 2026-10-13. **Source revision:** `b3de862`. **Recommendation:** retain eight distinct outcomes, correct teaching errors first, then replace repeated reassurance with demonstrations and usable next steps. No merge or new page is justified by this review.

## Scope, evidence and confidence

Read the [project knowledge index](PROJECT-KNOWLEDGE-INDEX.md), [technical/internal-link audit](seo-eight-articles-technical-audit.md), [semantic ownership audit](seo-eight-articles-semantic-audit.md), and [October 13 five-candidate findings](/Users/kasutaja/Developer/seo-research/hebrewedu/semantic-core-v3-blog-candidates/2026-10-13/findings.md). Examined all eight Markdown articles below. Limited supporting reads covered the blog template/schema/styles, the game letter-audio manifest, and Aleph's media status; this was not another site audit. Technical observations and neighbor ownership are reused from the prior reports.

Free public dictionary, academic and Council of Europe checks were used only to verify content, not to research keywords or current SERPs. Sources appear beside the relevant findings. Article locations below use **original source line numbers**, valid at this revision; section names and quoted fragments make findings recoverable after edits.

- **Verified error (V):** the source example conflicts with a cited lexical/grammar reference, or a demonstration is objectively mislabeled.
- **Unsupported claim (U):** the article supplies no evidence for a number, universal outcome or comparative claim. This does **not** establish that the claim is false.
- **Expert review (E):** linguistic scope, naturalness, historical explanation, pedagogical advice or product behavior needs a qualified reviewer/current product evidence before replacement copy is approved.
- **Editorial gap (G):** a missing explanation, example, procedure or source-to-intent fit that can be observed directly.

These are source-based judgments, not a complete native-speaker certification, an AI-authorship detector or measured ranking scores. Familiar spellings and plausible translations are distinguished from externally checked examples. No inference is made that content quality caused “Discovered — currently not indexed.”

Phase 3B does not change this audit's ownership decisions: the two listening candidates had modest recorded volume; the other three candidates and all five difficulty values were provider-null. No candidate had SERP validation. Those are preserved observations, not new targets or editorial priority weights.

## Compact comparison matrix

Codes resolve to the source and public URL in each page review. Effort includes the recommended core editorial work and review, not optional new software/media. **Small:** localized copy/example/link correction. **Medium:** substantive section revision and reviewed tables/tasks within the existing page. **Large:** evidence reconstruction or a largely new teaching demonstration with specialist work. These are planning categories, not time quotes.

| Order / page | Does it answer the primary question? | Main educational strength | Main weakness / credibility risk | Most useful learning improvement | Effort |
|---|---|---|---|---|---|
| 1 — B: Binyanim | Partly: defines seven patterns, but teaches a wrong category | Root comparison and seven-pattern overview | לדבר under Pa'al; mixed finite/infinitive glosses; overgeneralized meanings | Corrected examples, qualified chart and Pa'al/Pi'el comparison | Medium |
| 2 — R: Root System | Partly: explains families, not how to identify a root reliably | Several concrete word families | Wrong pointed noun/verb combination; transliteration errors; automatic meaning promises | Highlight root consonants, one worked identification and a limit case | Medium |
| 3 — W: Word Count | Superficially: gives numbers without an auditable counting basis | Separates dictionary size from learner needs | Uncited 80,000–120,000 range and fluency thresholds propagated by links | Define counting units and replace guarantees with evidenced/task-based guidance | Large |
| 4 — L: Listening Practice | Partly: methods by level, but no actual selection examples | Transcript/replay/review routine | Unsupported 60–80% optimum, A1 misconception, missing resources | Can-do selection table and one complete listening workflow | Medium |
| 5 — H: Handwriting | Weakly: explains the feeling more than the forms | Reassures learners that print/cursive are the same alphabet | Identical print glyphs presented as a comparison; unsupported history | Genuine labeled print/cursive pairs and a short note with solution | Large |
| 6 — F: Sounds Fast | Partly: processing explanation, unreliable examples | Distinguishes recognition difficulty from perceived speed | “Shortening” example lengthens spelling; speed/culture generalizations | Annotated phrase/register comparison and a route to L | Medium |
| 7 — V: Verb Directory | Partly for branded feature discovery; fails as a web reference | Concrete feature inventory | No demonstration; “all 28” and platform/access claims unverified | One verified verb-card/search walkthrough and access details | Medium |
| 8 — M: Learning Mistakes | Mostly identifies mistakes; weak at helping readers change them | Memorable diagnostic humor | Ten negative instructions, late remedies, repeated habit sections | Mistake → replacement action → check table | Medium |

**Fast correction pass:** B and R's verified errors are small individual fixes even though completing either page's teaching outcome is medium. F's mislabeled shortening example is also a small correction; its position in the full-revision order does not justify leaving it wrong until later.

## Shared editorial findings and boundaries

### Credibility and style

All eight use the organization byline “HebrewEdu Team” (frontmatter L5); the [template](../src/pages/blog/[slug].astro) L82–92 displays that name and publication date, without a named Hebrew/pedagogy reviewer in that header. None of the eight bodies cites external evidence. This is especially consequential for W's counts, L's learning thresholds/times and B/R's explanations. An organization byline is acceptable, but it does not establish linguistic review or empirical support. Add a real reviewer credit and focused source notes where available; do not invent qualifications, test results or first-hand experience.

H L46–49 presents a first-person WhatsApp anecdote under a team byline; confirm the actual contributor and attribute it, or remove the personal testimony. V can use the team's firsthand product knowledge, but currently substitutes claims for a visible example. A verified demonstration would be a stronger credibility signal than more adjectives.

The recurring “brain adapts / sudden click / very human” endings add little after their first appearance: L L173–199, R L147–173, W L236–260, H L214–253 and F L149–163/L230–274. Emotional reassurance is useful, but these sections repeatedly stand in for observable practice and progress checks. Retain a short supportive ending and use the recovered space for an example, answer or exercise. Similar fragment-heavy openings recur in B L12–26, R L12–22, H L12–28 and V L14–45. These are editorial patterns consistent with generic generated copy; they do not prove AI authorship.

Use a consistent learner transliteration convention and state it briefly. `ch` versus `kh` in *michtav/mikhtav* is a convention choice; the /k/ versus /kh/ error in *hitkhatev* is a pronunciation issue. Add reviewed nikud to first teaching examples in B/R and to examples intended for beginner pronunciation. Keep an unpointed counterpart when unpointed recognition is the lesson. Do not add nikud mechanically to every real-world sample, especially handwritten notes.

### Links and promotion

The prior technical audit established that these pages are reachable; adding links is about the learner's next task. Its newest-only “Continue learning” finding remains relevant: [template](../src/pages/blog/[slug].astro) L48–51 selects by recency, not topic. Curating that shared module is a **separate future code change**, not a prerequisite to revising article bodies.

The default `showAppCta: true` in [content schema](../src/content.config.ts) L21 applies to all eight; none overrides it. [Template](../src/pages/blog/[slug].astro) L99–102 adds “Ready to start reading Hebrew?” and store buttons after the body. It is not an in-text interruption, but its promise fits alphabet/reading entry points better than intermediate listening or a verb feature. Future editorial approval can consider per-page suppression using the existing flag. Changing the shared CTA wording/logic requires separately scoped code work. No claim is made about observed mobile intrusiveness; no browser session was run.

### Existing media and proposed interaction

The [Rush audio manifest](../public/game-builds/alef-bet-rush/letter-audio-manifest.json) identifies **letter-name audio** and bundle paths. The public game bundles contain MP3s named for letters; no sentence/dialogue/verb recording was found in this bounded public asset inventory. [Aleph presentation rules](../src/lib/lessons/presentation.mjs) L1 explicitly withhold original media, and [Aleph content](../src/content/lessons/aleph.json) records `withheld-pending-review` media status. Do not repurpose those provisional lesson assets or fetch private originals for these articles.

Letter-name clips could help identify a letter in a future H comparison if identity and reuse suitability are checked; they cannot demonstrate connected speech in L/F or verb pronunciation in B/R/V. An audio recommendation below is conditional on an exact, approved recording becoming available. A dictionary's audio button is a verification resource, not permission to copy its recordings.

Prefer a readable static table or annotated example first. Any later reveal/toggle must retain the answer/example without JavaScript, support keyboard use, keep Hebrew direction and nikud legible, and explain what the learner is observing. A slider is justified only if it changes a meaningful variable in real approved audio; no vocabulary-to-fluency slider, decorative animation or generated hero image is recommended.

## B — What Are Hebrew Binyanim?

**Source:** [hebrew-binyanim-explained.md](../src/content/blog/hebrew-binyanim-explained.md). **URL:** `/blog/hebrew-binyanim-explained/`.

**Outcome and strengths:** The title/description L2–3 fit an introductory seven-pattern explainer, not a complete beginner grammar course. “What a Binyan Is” L30–36, the כ־ת־ב table L46–51 and seven-pattern table L63–71 give readers a usable initial framework. The לָמַד / לִמֵּד pair L105–107 correctly illustrates learned/taught; [Pealim's ללמד entry](https://www.pealim.com/dict/42-lelamed/) confirms the latter form. The root and mistakes links L120/L138 support distinct next questions. The opening L12–26 delays the actual definition with a fear narrative.

| Status / location | Concrete issue | Editorial action |
|---|---|---|
| **V — Start Here: Pa'al, L85–91**, versus Pi'el L109–110 | לדבר is listed as Pa'al, then correctly described as Pi'el later. [Pealim lists לְדַבֵּר as Pi'el](https://www.pealim.com/dict/2-ledaber/). | Move it to Pi'el and recheck category labels in both lists. This is a teaching error, not a transliteration preference. |
| **V — One Root, L50–51** | הִכְתִּיב and הִתְכַּתֵּב are finite past masculine singular forms, but their translations say “to dictate/to correspond.” *hitkhatev* also misrepresents the /k/. | Use “he dictated/he corresponded” and *hitkatev* if retaining these forms, or use actual infinitives consistently. See [להכתיב](https://www.pealim.com/dict/959-lehachtiv/) and [להתכתב](https://www.pealim.com/dict/960-lehitkatev/). |
| **G/E — Seven Binyanim, L66/L75** | “Passive of Pa'al” plus “three … passive forms” can lead beginners to treat Nif'al as exclusively passive. Passive is a valid common function, but Nif'al also has middle/intransitive uses; [Berman's form/function study](https://www.tau.ac.il/~rberman/papers/1979_Berman_Form%20and%20Function%20-%20Passives%2C%20middles%2C%20and%20impersonals%20in%20Modern%20Hebrew.pdf) explicitly distinguishes these. | Qualify as common functions, with a reviewed non-passive example. This is an incomplete teaching simplification, not a claim that passive Nif'al is wrong. |
| **U/E — L34–36, L101–112, L122–123, L182–192** | Predictable shapes/meaning shifts, “doubles” understanding for every root, and Pa'al/Pi'el covering the overwhelming majority in a first year overpromise regularity and frequency. | Remove the doubling claim; acknowledge weak roots, lexical meanings and missing pairs. Source any frequency claim or frame the sequence as an optional beginner strategy. The [HUJI-hosted Binyanim entry](https://pluto.huji.ac.il/~edit/papers/EHLL.Binyan.pdf) discusses semantic limits, including non-causative Hif'il verbs. |
| **G — Practical approach, L148–154** | Advises learning “one or two example sentences,” but supplies no complete Hebrew sentence. Also makes Hif'il/Hitpa'el wait months regardless of the learner's useful verbs. | Demonstrate the method using a reviewed sentence pair and allow useful verbs from any pattern early. |

**Learning/visual improvement:** Keep a seven-row reference table, adding one reviewed example per pattern, form labels and a “common use / limits” column. Add a focused Pa'al–Pi'el comparison using the existing learning/teaching pair, identical person/tense, nikud, English gloss and one sentence each. A small root → pattern → actual word diagram can show consonants versus pattern material; label the root by text as well as color. An optional identify-the-pattern reveal with explanations would test recognition; a full conjugation tool is unnecessary. No local verb audio currently supports a play button.

**Links/promotion:** Keep R for “what is a root?” and M for habits. W's L93 anchor promises needed verb vocabulary, but W primarily gives unsourced overall word counts; change that anchor/purpose after W is revised, or omit it. V L156 is contextual after a practical method, but verify the 334 claim and make the optional app step follow an on-page example.

**Future boundary / acceptance:** Edit this article's copy, examples, tables and links only in the first editorial package; require a Hebrew grammar review. Accept when each example has a correct pattern/form/gloss and readers can distinguish root from pattern and compare Pa'al/Pi'el without installing an app. Broad grammar, full tense paradigms, new keyword assignments and shared interactive code remain outside the page's remit. **Effort: medium; verified corrections small.**

## R — How the Hebrew Root System Works

**Source:** [how-the-hebrew-root-system-works.md](../src/content/blog/how-the-hebrew-root-system-works.md). **URL:** `/blog/how-the-hebrew-root-system-works/`.

**Outcome and strengths:** Title L2 and definition L28–34 fit a root-system explanation. The כ־ת־ב table and ד־ב־ר/ל־מ־ד/ש־מ־ר families L36–43/L65–85 make the shared-consonant concept tangible. The article acknowledges exceptions L106–114 and links to unpointed reading L96 and vocabulary methods L61. It does not fulfill the existing root-identification outcome: no word is analyzed step by step, and no failed guess is shown.

| Status / location | Concrete issue | Editorial action |
|---|---|---|
| **V — Root table L39** | כָּתַב (*katav*) is glossed “he wrote / reporter.” “Reporter” is כַּתָּב: same modern transliteration/unpointed letters, different nikud and grammatical category. [Pealim noun entry](https://www.pealim.com/dict/6084-katav/) verifies the distinction. | Split into labeled verb and noun rows. The unpointed “כתב — reporter” in the opening L14 is valid; do not incorrectly mark that as false. |
| **V — L43/L57/L138–139** | Past forms are translated as infinitives; *hitkhatev* has the wrong /kh/ for the marked consonant. | Align forms/translations, using the [dictate](https://www.pealim.com/dict/959-lehachtiv/) and [correspond](https://www.pealim.com/dict/960-lehitkatev/) entries. This repeats B's error and should be corrected together. |
| **V/E — Learning family L78** | *melaamed* misrepresents מְלַמֵּד (*melamed*). “Teacher” needs grammatical/register context rather than being the only gloss. | Correct transliteration; show the masculine singular participle “teaches/is teaching,” then explain its nominal use if retained. [Pealim's ללמד table](https://www.pealim.com/dict/42-lelamed/) confirms *melamed*; reviewer should choose the best everyday teacher example. |
| **U/G — L22/L61/L88/L100–114/L157** | Roots supposedly make acquisition dramatically faster, every root generates predictable categories, fluent readers use exactly this process, and exceptions become easy. | Replace automatic acquisition claims with a specific helpful inference plus a limitation. Knowing a family is not knowing every member's meaning/use. |
| **E — Exceptions L110** | “Two active consonants” does not distinguish a weak root's surface realization from the underlying root; quadriliteral roots are absent. | Have a reviewer add a compact scope note, without turning the article into historical morphology or a weak-root course. |

**Learning/visual improvement:** Annotate מִכְתָּב to identify כ־ת־ב and the additional material, then compare it with a reviewed form from another root. Show the procedure: recognize a possible word pattern, propose consonants, check a known family/dictionary, and confirm meaning in the sentence. Explicitly warn that removing every apparent prefix is unreliable. A text-labeled family tree and a pointed/unpointed noun-versus-verb comparison would teach more than the “Moment Root Logic Clicks” section L147–157. A three-item optional root reveal can include an explanation of why one case needs dictionary help; no root-extraction algorithm is proposed.

**Links/promotion:** Link “patterns called Binyanim” at L132 directly to B; currently the explanatory paragraph leads only to the product at L143. Keep V as optional organization support, but verify the promise that a “full word family” is available: a verb directory may not contain every related noun. W's L61 link reinforces an unsupported inference that roots reduce a required word total; remove that causal framing. Existing vocabulary and unpointed links are well matched.

**Future boundary / acceptance:** Restrict core work to this article's examples, one identification procedure, caveats and contextual links. Hebrew review must approve nikud, underlying roots, noun/verb labels and meanings. Accept when readers can identify a transparent example and know when to check a dictionary. B retains the seven-pattern lesson; Vocab retains memorization methods; Unpointed retains detailed vowel reconstruction. **Effort: medium; lexical corrections small.**

## W — How Many Words Are in Modern Hebrew?

**Source:** [how-many-words-are-in-the-modern-hebrew-language.md](../src/content/blog/how-many-words-are-in-the-modern-hebrew-language.md). **URL:** `/blog/how-many-words-are-in-the-modern-hebrew-language/`.

**Outcome and strengths:** Title and opening L18–27 address language size; the later sections distinguish that from learner goals. The root families L40–46/L203–206 are useful illustrations; unpointed כתב can legitimately mean reporter and כותב can mean a writer/writing person in context. The missing issue is not those basic translations. The difficulty lies in the unsupported measurements and what counts as “one word.”

| Status / location | Concrete issue | Editorial action |
|---|---|---|
| **U — Language size L27–38** | “80,000–120,000 actively recognized words” has no dictionary name, edition, inventory, counting unit or source. “Actively recognized” conflates language entries with speaker knowledge. | Establish a documented inventory and what it includes before retaining a number. If unavailable, give a transparent no-single-count answer, not a replacement guessed range. |
| **U — Learner goals L85–118/L128–140/L223–228** | 500–1000, 3000, 5000–8000 and 15,000+ are presented as reliable speaking/reading/near-native thresholds without Hebrew-specific evidence or assessment. | Source and qualify estimates where defensible; otherwise replace with task-based goals. Separate receptive/active vocabulary and headwords/inflections/word families. |
| **U — L99–104/L189–191** | Automatic cessation of mental translation at 1000–1500 words; deep knowledge of 1500 beats 10,000 flashcards “Every time.” | Remove guarantees. Give a bounded contrast between usable phrase knowledge and shallow recognition, without pretending a fixed number determines performance. |
| **U/E — L38/L66–69** | Hebrew is “small” relative to English and reuses patterns “more efficiently” without comparable inventory/methodology. | Explain the actual root-family relationship and avoid quantitative cross-language rankings. A reviewer should check the morphology comparison. |
| **G — L171–191/L249–260** | “Real Secret,” “Every time” and the final meaning-click story repeat reassurance instead of clarifying the count. | Replace these with the counting explanation and an example showing why knowing a root is not knowing all related words. |

**Missing information and visual improvement:** Add a counting-unit table: written token, distinct surface form, dictionary headword and root/family; show why one inflected verb can inflate a surface-form total while belonging to one lemma. Clarify inclusion of Biblical/technical/borrowed words and dictionary date/coverage. The article's own L31–36 questions are a good starting point, but they currently never resolve its numerical answer. A second table should map learner tasks to skills needed and a way to check success, with numerical ranges only if properly evidenced. Do not turn this into a frequency list or a vocabulary-to-fluency calculator. There is no empirical basis here for a slider converting a word count into a level, months or fluency.

**Links/promotion:** Reading-comprehension and unpointed links L132–134 are relevant; the vocabulary-method link L234 is an appropriate next step. V L232 is useful only as one verb resource, not evidence for 334 “high-frequency” verbs or “full conjugation.” The M anchor L175 overstates completeness (“every common … mistake”). Prior audit evidence gives W nine contextual inbound links, including L's “threshold” wording: W's unsourced numbers are therefore a priority beyond this page. This report identifies the dependency but does not authorize editing those other inbound articles.

**Future boundary / acceptance:** Reconstruct this existing quantitative explainer, with an accountable counting source or a clearly stated inability to give one definitive total. Do not fabricate a dictionary count or substitute English word-family research for a Hebrew threshold. Accept when every retained number has a unit/source/limitation and the reader understands why size does not determine fluency. Keep vocabulary techniques, long frequency lists and reading instruction with their existing owners. **Effort: large; softening guarantees alone would be small but would not finish the task.**

## L — Best Hebrew Listening Practice

**Source:** [best-hebrew-listening-practice.md](../src/content/blog/best-hebrew-listening-practice.md). **URL:** `/blog/best-hebrew-listening-practice/`.

**Outcome and strengths:** A1/A2/B1 sections L60–120 and pre-listen/replay/review L149–153 are practical foundations. The fast-speech and reading/listening-gap links L38/L107 fit the learner's questions. However, “Best … for Every Level” L2 promises more than an A1–B1 methods article provides; B2 appears only in an unsupported timetable. Readers are told to find graded podcasts/easy news without a named example, working link or sample-selection demonstration.

| Status / location | Concrete issue | Editorial action |
|---|---|---|
| **U/E — Sweet Spot L48–54** | “Most effective” at 60–80%; above 80% is insufficiently challenging. No definition of percentage or evidence. | Remove the universal optimum and distinguish task comprehension from lexical coverage. [Stæhr's primary study](https://doi.org/10.1017/S0272263109990039) found high lexical coverage important in a specific advanced English listening test; it does not set a Hebrew beginner percentage. Use task success and manageable unknown material instead. |
| **V/G — A1 L78** | Says the goal “is not comprehension” but “auditory letter recognition,” while defining word segmentation. Letters are written units; the stated task is recognizing sounds/words and meaning. | Teach recognition of familiar words/basic messages. The [Council of Europe self-assessment grid](https://europass.europa.eu/en/common-european-framework-reference-language-skills) includes comprehension at A1; A1 is not merely knowing some letters. |
| **G — A2 heading L82** | “Early Intermediate” can be used informally, but it is not the CEFR grouping: A1/A2 are Basic User and B1/B2 Independent User. | Use “A2 / elementary” or explain the informal label. The [Council of Europe level descriptions](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions) give the actual framework; avoid implying a standardized Hebrew placement classification. |
| **U/E — L69/L84/L105** | Children's songs are automatically manageable; A2 is tied to 500–1000 words; B1 tied to comfortable pointed reading. | Select clips by clarity, content, support and task; do not label difficulty from genre or word count alone. Present level labels as orientation, not a Hebrew placement test. |
| **U — L128/L155/L167–175** | Fixed 3000-word threshold, twenty minutes beating two hours, and months/years at 20–30 minutes/day have no evidence. | Remove hard ratios/timetables or provide an appropriate source with context. Link to revised W for count limitations, not a hard comprehension threshold. |
| **G — L24–38 versus L189** | Rejects incomprehensible exposure, then tells readers to keep going when they catch “almost nothing.” | Give an explicit fallback: shorter/easier clip, topic context or transcript support; explain when background listening can supplement focused work. |

**Learning/visual improvement:** Replace the time table with a compact selection table: current can-do ability → suitable clip properties → listening task → sign it is too difficult → adjustment. Demonstrate one session: choose a short segment, answer a gist question, check the transcript, replay to notice a phrase, then retell/check one detail. A transcript with highlighted phrase boundaries and a simple pass-by-pass checklist is educationally justified. Transcript-first can be offered as a scaffold; readers who can attempt gist first should also have that option.

A later revision can include a small, verified selection of resources with level/support/availability notes. No provider comparison or resource-discovery search was performed here. On-page audio/transcript exercises would be a separately approved media project: the local letter-name assets cannot provide them. A playback-speed control would make sense only for an exact approved clip, with a normal-speed target and no promise that slowing alone builds comprehension.

**Links/promotion:** Keep F and Comprehension, retune W's L128 anchor after W's evidence work, and consider the existing vocabulary-method owner for post-listen review. No inline app promotion appears; the shared reading CTA should be assessed for this listening intent rather than supplemented with more product pitches.

**Future boundary / acceptance:** Core package: narrow title/opening to the actual beginner/intermediate range, correct level explanations, revise claims and deliver a reproducible workflow/selection table. Accept when readers can choose a feasible clip and know what to do before/during/after listening. Retain a guide format; no promise of an on-page audio library or C1/C2 coverage. **Effort: medium; a hosted exercise library is outside this estimate.**

## H — Printed Versus Handwritten Hebrew

**Source:** [why-hebrew-handwriting-looks-completely-different-from-printed-hebrew.md](../src/content/blog/why-hebrew-handwriting-looks-completely-different-from-printed-hebrew.md). **URL:** `/blog/why-hebrew-handwriting-looks-completely-different-from-printed-hebrew/`.

**Outcome and strengths:** The title fits the difference question; L38–40 introduces *ktav dfus* versus *ktav yad*, and L243 correctly reassures that this is not a second alphabet. The printed alphabet and study-plan links L21/L128 offer useful prerequisites. Its description L3 and opening L12–28 focus on emotion rather than explaining the difference. The reader cannot leave able to recognize even the three highlighted cursive letters.

| Status / location | Concrete issue | Editorial action |
|---|---|---|
| **V/G — Some Letters, L82–84** | “printed מ vs handwritten מ” (also ע/ש) repeats the same Unicode glyph in plain Markdown, with no distinct cursive rendering. The comparison is absent. | Replace with genuine reviewed print/cursive forms, clearly labeled. The exact same code point can be valid in two fonts; here no font distinction is supplied. |
| **E — Why Changes, L55–71** | Handwriting allegedly evolved to be “more connected” and is explained as native simplification over years. This is an unsourced history and can imply joined Latin-style cursive. | Have a Hebrew handwriting specialist check the historical/function explanation and how letters are separated in the chosen modern hand. Do not present the current account as verified history. |
| **U/E — L101/L116–120/L187–189** | Everyone learned forms naturally; readers recognize “motion patterns”; adults adapt quickly if expectations change. | Describe practice and normal variation without prescribing a universal cognitive process or speed of adaptation. |
| **G — What Helps, L179–185** | Advises comparing forms and reading notes, but provides neither a real comparison nor a note to decode. | Supply both with an explained solution. |
| **G/E — L46–49/L150–173/L195–253** | Unattributed firsthand anecdote, extended psychological discussion and repeated messy-human endings outweigh the visual explanation. | Confirm anecdote attribution; condense repetition. Distinguish handwriting variation from absent nikud rather than treating both as one problem. |

**Learning/visual improvement:** This page warrants actual visual material: a small comparison table for the chosen difficult letters, with names, print form, conventional cursive form and one identifying feature. Follow with a short handwritten note beside a printed transcription/translation, indicating ordinary variation and final forms where relevant. Use authentic or specialist-approved forms; a generic font or AI-drawn glyph is not adequate evidence. Licensing/approval and readable text alternatives are dependencies for a later asset task, not work performed here.

A show-transcription reveal or letter-match exercise is optional after the static example teaches recognition. Keep both forms visible first; a decorative morphing animation or comparison slider would hide information the beginner needs together. Letter-name audio could help label these letters if approved for reuse, but audio does not explain the visual differences. No stroke-order curriculum is required to answer this comparison question.

**Links/promotion:** Existing alphabet/prerequisite links are relevant. The Unpointed link L169 can remain as a separate challenge with a clear distinction. The app CTA should not imply the app teaches cursive unless that capability is verified. Alphabet Hub/Aleph and current browser recognition games are not established handwriting instruction.

**Future boundary / acceptance:** Rewrite the explanation and define the reviewed visual brief within this page's comparison purpose. Asset creation and interactive implementation require later approval; no asset was created now. Accept when a reader can distinguish actual print/cursive examples and decode the supplied note with feedback. Do not expand into a full alphabet chart, stroke-order course or “read all handwriting” promise. **Effort: large because the core demonstration needs specialist-approved forms.**

## F — Why Hebrew Sounds So Fast

**Source:** [why-hebrew-sounds-so-fast.md](../src/content/blog/why-hebrew-sounds-so-fast.md). **URL:** `/blog/why-hebrew-sounds-so-fast/`.

**Outcome and strengths:** The title's “why” fits perceived-speed diagnosis. L72–95 usefully describes slow recognition/processing, and מה נשמע / *ma nishma* L55–62 is a plausible illustration of hearing words as one sequence. The reading-gap and mistakes links L159/L169 fit related obstacles. The title also promises “what to do,” but L193–204 gives general habits rather than a demonstrable next action.

| Status / location | Concrete issue | Editorial action |
|---|---|---|
| **V/G — Textbook Hebrew, L138–140** | Under “shorten things,” מה אתה עושה → מה אתה עושההה adds letters instead of shortening a form. It shows stylized elongation, not the claimed speech process. | Remove/relabel it; replace only with a reviewer-approved connected-speech example. The text itself proves the mismatch, without requiring a claim about the phrase's natural pronunciation. |
| **E — L139/L141** | אנלא יודע is informal orthographic representation without transliteration, sound explanation or register. בסדר/סבבה/טוב/יאללה are grouped loosely without distinct meanings/uses. | Explain one natural reduction carefully; review phonetics and register. Give each retained expression its own translation/use rather than implying interchangeable equivalents. |
| **U/E — L37/L43–51** | “Hebrew is relatively fast” and a broad list of swallowed vowels/shortened endings have no comparative rate study, speaker/register context or matching examples. | Distinguish measurable speech rate from perceived difficulty. Source a comparison if retaining one, otherwise lead with unfamiliar vocabulary, boundaries and connected speech. |
| **G/E — L103–119** | Different alphabet and missing written vowels are presented as causes of hearing difficulty. | Explain only the role of written scaffolding when reading alongside audio; ordinary listening does not omit spoken vowels because text omits nikud. |
| **U/G — L149–163/L179–181/L204/L230–274** | Light-switch improvement, surviving thousands of incomprehensible moments and a 40–60% progress rule become universal advice. | Treat sudden recognition as a possible experience, not the mechanism or requirement. Align difficulty advice with revised L and remove the unsupported percentage. |

**Tone:** “Aggressive beatboxing / machine-gun fire” L28–31, constant interruptions L64 and arguing-while-ordering-hummus L267–270 turn the diagnosis into a cultural caricature. Replace these with neutral learner observations or a clearly individual anecdote. Humor can stay without asserting how Israelis generally speak or making anxious learners feel mocked.

**Learning/visual improvement:** Add one annotated phrase comparison with careful word boundaries, translation and register; explain whether it shows boundary blending, an actual reduction or simply unfamiliar segmentation. A two-column “what you heard / what to notice” diagnostic table can separate unknown vocabulary, boundary recognition and reduced forms. A brief processing diagram is useful only as a simplified model, not a brain-science claim. Approved normal/clear speech audio would substantially improve the illustration, but no local phrase recording supports it. If later available, normal-versus-slower playback plus transcript is more useful than a decorative waveform.

**Links/promotion:** Add L in “What Actually Helps” L187 with a relevant active-practice anchor. Keep W only for qualified vocabulary goals after revision. The unpointed link is supporting written-reading context, not an explanation of spoken vowel loss. No inline product pitch appears; the shared reading CTA does not directly satisfy this question.

**Future boundary / acceptance:** Keep a short diagnosis and one worked example, then direct level-based training to L. A Hebrew speaker should review colloquial forms; a pedagogy reviewer should approve the practical recommendation. Accept when readers can name a specific source of perceived speed and try one suitable action. No unsupported language-speed ranking, full slang guide or duplicated listening curriculum. **Effort: medium; the mislabeled example correction is small.**

## V — Meet the New Verb Directory

**Source:** [meet-the-new-verb-directory.md](../src/content/blog/meet-the-new-verb-directory.md). **URL:** `/blog/meet-the-new-verb-directory/`.

**Outcome and strengths:** Frontmatter L2–6 clearly identifies an app feature/product update. The feature inventory L69–142 covers quantity, Binyan tags, roots/nikud, translations, forms and search. Promotion is appropriate for this page's purpose. Its educational value would come from showing how to use that structure; the article currently contains no actual Hebrew verb card, conjugation example, search result or screenshot.

| Status / location | Concrete issue | Editorial action |
|---|---|---|
| **U/E — L59/L71–79** | 334 “essential/high-frequency” verbs without a version, list, selection basis or product record. | Verify count in the released product and explain whether “essential” is editorial curation or corpus frequency. Do not label it false solely because the article gives no evidence. |
| **U/E — All 28 Forms, L117–129; description L3** | “All … full conjugation system” leaves included persons/tenses/moods unspecified. A display count does not prove completeness. | Verify the app's exact slots, variants and treatment of irregular/defective verbs. State precisely what is included/excluded; do not infer the 28-slot model from a typical paradigm. |
| **E/G — L105–109/L133–146** | Every card/search is said to support roots, nikud, English/Russian meaning, without a real worked example or any usage limit. | Demonstrate one reviewed verb and search query using current product evidence. Check translations, forms, search behavior and access limits. No Hebrew examples exist here to certify. |
| **E/G — availability L173–175** | Google Play availability, app naming and update instruction lack version/navigation/access information. | Confirm the branded feature's platform/version and free/premium access against current release evidence before rewriting. The site's broader two-platform context does not prove this feature exists on iOS. No store/app audit was run here. |
| **G — headings L12/L49/L67/L150/L171** | Five body `#` headings are additional H1s; the template already supplies the article H1 at L84. Section topics mix slogans with navigation. | Use H2/H3 and task-oriented labels. The [styles](../src/styles/blog.css) L333–346 visually normalize body H1s but do not repair the semantic hierarchy. |

**Style/promotion:** “We Decided to Fix That,” “most resources don't help,” “beautifully structured,” “grammar tables from 1997” and “No frustration” (L12/L33–39/L51–57/L144–146) are unsubstantiated comparison/marketing language. Replace with demonstrable behavior. The alphabet/word-count fear narrative L14–45 delays the feature answer; L154–179 repeats the same clarity promise. Start with what it is, where it is and one task it enables.

**Learning/visual improvement:** Show a current approved verb-card screenshot with a matching text table/annotations: root, Binyan, pointed infinitive, translation and a labeled sample form. Add a concrete lookup walkthrough and where the learner taps next. Real product evidence is more useful than an invented interface mockup. A small feature/access table would answer decision questions. The screenshot asset and product verification are later dependencies; no app files were investigated or visuals generated. A live conjugation browser would change the page's format and is outside this recommendation.

**Links/promotion:** Link B at L85 and R at L106 as optional concept help. The story link L152 is relevant creator context; M L160 interrupts product explanation, and W L14 imposes a supposed vocabulary-before-verbs stage. Remove or relocate those links to purposeful next-step notes. Provide a verified feature-specific update/store path; the shared “start reading” CTA is less direct than this page's app feature task.

**Future boundary / acceptance:** Preserve a branded feature guide, with a checked walkthrough, exact access facts, qualified counts and a single clear action. Current app behavior must be verified before substantive product copy is approved. Accept when readers know where the feature lives and what one lookup shows. Do not absorb web conjugation-chart, verb-list or tense-reference ownership; no app implementation or generic app comparison is included. **Effort: medium, subject to product evidence availability.**

## M — How Not to Learn Hebrew

**Source:** [how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently.md](../src/content/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently.md). **URL:** `/blog/how-not-to-learn-hebrew-a-complete-guide-to-failing-efficiently/`.

**Outcome and strengths:** The title/description L2–3 honestly signal humorous mistakes advice, and the ten steps identify recognizable obstacles: resource shopping, alphabet-only study, fear of speaking, unsuitable vocabulary and inconsistent practice. מים/תודה/איפה L100–102 have plausible standard translations. Alphabet, vocabulary and speed links suit those obstacles. The intended mistakes diagnosis is mostly satisfied; a practical improvement plan is not. This is not a complete self-study guide.

| Status / location | Concrete issue | Editorial action |
|---|---|---|
| **U — opening L18** | “Tested by thousands of learners worldwide” reads as invented evidence even in satire; no study/test is identified. | Remove it or make unmistakably fictional humor without an evidentiary claim. |
| **G — Steps 1–10 L24–219; remedies L260–264** | Negative instructions dominate; positive alternatives largely appear only at the end. Skimmers can miss the reversal. | Add an explicit “try this instead” action and observable check beneath each chosen mistake. Do not require the reader to infer advice from sarcasm. |
| **G — Steps 5/9 L116–130/L191–204** | Both describe unstable motivation/inconsistent habits; neither supplies a viable minimum routine or return-after-a-break plan. | Combine or differentiate them and demonstrate a small routine plus restart rule. |
| **G/E — alphabet L68; listening L147** | “Children … accidentally while eating yogurt” minimizes literacy instruction; replaying four seconds is mocked without separating useful repetition from unproductive fixation. | Keep humor away from the learning process being recommended. Explain a focused replay task and when to switch clips; align with L's repeat-listening method. |
| **U/E — L130/L210/L236–244/L262** | Permanent beginner guarantees, “every unsuccessful learner” and stereotyped speech-speed claims overgeneralize; “tolerate sounding stupid” can discourage learners seeking help. | Use concrete behaviors and neutral consequences. Review motivation framing for learners with different schedules, anxiety or accessibility needs. |

**Learning/visual improvement:** A compact table can provide mistake → replacement action → check. Examples: buy more resources → complete one existing short task → produce an answer; never speak → rehearse one useful phrase with feedback → use it in one bounded exchange; irregular bursts → choose a repeatable small session → record completion and resume after a miss. Add one reviewed Hebrew phrase in context rather than another abstract list. A printable/static self-check is sufficient. An optional selectable “my next action” checklist may aid planning; an interactive failure score, personality quiz or habit dashboard would add false measurement or needless scope.

**Links/promotion:** Keep the printed-alphabet and vocabulary-method paths. W L110 claims “exactly how many” words are needed; revise that anchor once W no longer promises numerical certainty. F explains the obstacle, while L can provide the practical method after the listening remedy. V L263 is a defensible optional verb resource, but its appearance inside the final general advice and the default store CTA should not turn an anti-resource-shopping piece into another purchase recommendation. Tie any app suggestion to a task already described; the reader must be able to act without an install.

**Future boundary / acceptance:** Preserve some satire but make correct advice independently scannable, reduce repeated sections and include specific next actions. Accept when a reader can select one obstacle and perform its remedy today. Keep general self-study curricula, alphabet scheduling, vocabulary systems and motivation-tool implementation outside this page. **Effort: medium; no custom UI needed.**

## Editorial priority and review gates

1. **Correct confirmed examples together:** B's לדבר category; B/R finite-versus-infinitive glosses and *hitkatev*; R's pointed reporter/verb row and *melamed*; F's lengthening-as-shortening example. Small corrections, then Hebrew review of the surrounding explanations to prevent a localized fix leaving contradictory advice.
2. **Complete B then R:** these articles teach foundational structures and already contain usable tables. Correcting labels alone is not enough; finish the comparison/identification tasks and state limits of pattern-based guessing.
3. **Rebuild W's evidence before preserving dependent numbers:** define the inventory/counting unit or give a transparent qualified answer. Then revise W references within L/B/R/F/M/V as those pages are approved. Separate future review is needed for inbound sources outside these eight; do not run a new repository-wide investigation now.
4. **Revise L's pedagogical core:** replace percentages/timetables, correct A1, add selection criteria and a full workflow. Preserve its distinct practice-guide outcome.
5. **Develop H's reviewed visual brief:** the central comparison cannot be delivered by prose alone. Asset approval is a dependency for the later complete page, not a reason to create visuals during discovery.
6. **Revise F and align with L:** correct the diagnostic example, cultural generalizations and difficulty advice; link to practical training.
7. **Verify and demonstrate V:** confirm product claims with an accountable owner/version and one actual lookup. Keep feature conversion distinct from a browser reference.
8. **Make M actionable:** retain memorable humor, supply plain remedies and remove unsupported testimony. This is lower priority than teaching errors, not permission to preserve its misleading claims.

The full-revision order follows educational harm, reuse and missing-task severity rather than length or keyword volume. Independent small corrections may proceed together in a later authorized pass; optional components should wait until their static lesson content is approved.

| Review gate | Concrete requirement | Scope boundary |
|---|---|---|
| Hebrew accuracy | B/R form labels, nikud, roots, transliterations and sentences; F colloquial examples; H forms and description reviewed by a qualified contributor | No automatic certification from this report; preserve approved Aleph content/owner decisions |
| Empirical claims | W count source/unit/date and any retained thresholds; L learning claims with appropriately scoped evidence | No invented replacement figures or transfer of English vocabulary thresholds into Hebrew |
| Product claims | V count, forms, platform/access and lookup verified against the current release | No investigation or modification of the separate app codebase authorized here |
| Teaching completeness | Each page achieves its stated outcome with at least one relevant demonstration/check where needed | No word-count or keyword-density quota; no forced multimedia quota |
| Media/component approval | Exact approved assets, clear learning purpose and text fallback before implementation | No assets, audio generation, new fonts, widgets or UI implementation in Phase 4 |
| Site-wide follow-up | Related-post/CTA changes reviewed as a separate shared-template proposal | No template, route, canonical, sitemap or navigation edit during this audit |

**Completion boundary:** Only this audit document was created. Article/code sources, earlier reports, Semantic Core v1/v2, candidate addenda and unrelated files were preserved. No paid API calls, keyword research, Rank Tracker runs, builds, visual assets, UI implementation, commits, pushes or deployment were performed. Stop for owner review; the recommendations do not authorize implementation.
