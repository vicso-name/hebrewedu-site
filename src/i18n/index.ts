// Typed UI-chrome dictionary. Lesson/editorial content (letter names, lesson
// bodies) is NOT here — that's the lesson pipeline's job (docs/LESSON_PIPELINE.md).
// This only covers the hardcoded English strings inventoried in
// docs/I18N_AUDIT.md §2: nav, footer, consent banner, lesson-route chrome,
// and the alphabet-hub route.
//
// `Dictionary` is an explicit interface (not `typeof en`) so a string value
// never gets accidentally narrowed to a literal type — en.ts and fr.ts are
// each checked against the same interface, and TypeScript's excess-property
// check on object literals makes a missing or extra key a type error.

export type Locale = 'en' | 'fr';

export interface StageCopy {
  title: string;
  description: string[];
}

export interface ResourceLink {
  href: string;
  label: string;
  tag: string;
  text: string;
}

export interface FeatureCopy {
  title: string;
  description: string;
}

export interface JourneyStepCopy {
  title: string;
  body: string;
  meta: string[];
  alt: string;
}

export interface SupportingFeatureCopy {
  title: string;
  desc: string;
}

export interface Dictionary {
  common: {
    brand: string;
    getTheApp: string;
    openMenu: string;
    closeMenu: string;
    storeLabels: {
      google_play: string;
      app_store: string;
    };
    /** Nav CTA on locales with no dedicated "get the app" phrase of their own (e.g. fr's "Application"). */
    application: string;
    /** "Games" label used where the destination is English-only, suffixed appropriately per locale. */
    gamesEnLabel: string;
    /** "Blog" label used where the destination is English-only, suffixed appropriately per locale. */
    blogEnLabel: string;
    /** Layout.astro's skip link (pageClass path). Lesson/hub routes use their own
     *  skipToLesson/skipToCourse instead. */
    skipToContent: string;
    /** Landmark/region labels read only by assistive tech — translated for the
     *  same reason visible chrome is (docs/I18N.md: parity rules). */
    aria: {
      primaryNav: string;
      homeLink: string;
      footerNav: string;
      breadcrumb: string;
      langSwitch: string;
      consent: string;
    };
    /** Suffix marking a link whose destination is English-only ("(en anglais)"),
     *  appended where the link's own label is otherwise fully translated. Empty on en. */
    enOnlySuffix: string;
  };
  nav: {
    home: string;
    play: string;
    alphabetCourse: string;
    phrases: string;
    verbs: string;
    cursive: string;
    blog: string;
  };
  footer: {
    play: string;
    blog: string;
    hebrewPhrases: string;
    hebrewVerbs: string;
    hebrewCursive: string;
    terms: string;
    privacy: string;
    copyright: (year: number) => string;
    privacyChoices: string;
  };
  consent: {
    text: string;
    privacyPolicy: string;
    decline: string;
    accept: string;
  };
  lesson: {
    skipToLesson: string;
    breadcrumbRoot: string;
    lessonLabel: (order: number, name: string) => string;
    stageNames: { theory: string; examples: string; practice: string; results: string };
    eyebrow: (order: number, total: number) => string;
    localPreview: string;
    stepOf: (step: number, total: number) => string;
    theory: { nextCta: string };
    examples: { nextCta: string };
    stagesAria: string;
    /** Practice stage. The `*Template` entries are consumed by
     *  src/lib/lessons/practice-client.ts at runtime — Practice.astro forwards them
     *  as the #lesson-practice-strings JSON payload (same transport as that
     *  component's #lesson-grading payload), since a client module can't import a
     *  dictionary per locale. Placeholders: {answered} {total} {correct} {attempted}
     *  {unanswered} {list} {count} {matched} {step} {stage}. */
    practice: {
      heading: string;
      intro: string;
      noScript: string;
      progressAria: string;
      progressTemplate: string;
      meterTemplate: string;
      questionCount: (index: number, total: number) => string;
      types: { matchPairs: string; trueFalse: string; choice: string };
      /** Display text for a TRUE_FALSE exercise's two options. The normalized
       *  lesson stores the canonical English 'True'/'False' as the option label
       *  (src/lib/lessons/normalize.mjs synthesizes them, and grading keys off the
       *  option id, never the label), so the visible wording is UI chrome. */
      booleanLabels: { true: string; false: string };
      unavailable: { title: string; body: string };
      matchBoardAria: string;
      leftAria: (label: string) => string;
      rightAria: (label: string) => string;
      pairMatches: string;
      explanation: string;
      nextQuestion: string;
      seeResults: string;
      checkAnswer: string;
      retryQuestion: string;
      sourceAnswerSummary: string;
      sourceAnswerLabel: string;
      overallScoreTemplate: string;
      resultsSummaryTemplate: string;
      skippedTemplate: string;
      noneSkipped: string;
      unavailableNoteTemplate: string;
      stageAnnouncementTemplate: string;
      pairsAllMatched: string;
      pairsPartialTemplate: string;
      pairsNotAMatch: string;
      chooseFirst: string;
      answerCorrect: string;
      answerIncorrectWithExplanation: string;
      answerIncorrect: string;
      chooseAgain: string;
    };
    results: {
      heading: string;
      intro: string;
      overallScoreLabel: string;
      stats: { correct: string; attempted: string; incorrect: string; unanswered: string };
      reviewMistakes: string;
      answerUnanswered: string;
      sessionNote: string;
      noScript: string;
      tryAgain: string;
      nextLesson: (label: string) => string;
      backToCourse: string;
    };
  };
  hub: {
    /** <title>/og:title and meta description for this locale's hub page (mirrors courseTitle/courseDescription). */
    pageTitle: string;
    pageDescription: string;
    skipToCourse: string;
    eyebrow: string;
    title: string;
    lead: string;
    startLearning: string;
    exploreCurriculum: string;
    availability: string;
    /** Shown instead of `availability` when no lesson is published for this locale yet (no Hero CTA target). */
    noLessonsYet: string;
    firstLessonEyebrow: string;
    meetAleph: string;
    firstLessonText: string;
    firstLessonMeta: string;
    pathEyebrow: string;
    pathTitle: string;
    pathText: string;
    curriculumAriaLabel: string;
    startLessonAria: (order: number, name: string) => string;
    lessonOrderLabel: (order: number) => string;
    startLessonCta: string;
    comingSoon: string;
    howEyebrow: string;
    howTitle: string;
    howText: string;
    stages: { theory: StageCopy; examples: StageCopy; practice: StageCopy; results: StageCopy };
    keepExploringEyebrow: string;
    resourcesTitle: string;
    resourcesText: string;
    resources: ResourceLink[];
    keepLearningEyebrow: string;
    appTitle: string;
    appText: string;
  };
  /** The full homepage (src/pages/index.astro + src/components/home/*), rendered
   *  by the shared HomePage.astro for both / and /fr/ (Stage B rework). */
  home: {
    /** <title>/og:title fallback and meta description for this locale's home page (mirrors site.title/site.description). */
    title: string;
    seoTitle: string;
    description: string;
    hero: { eyebrow: string; title: string; lead: string; screenshotAlt: string };
    pillars: { heading: string; lead: string; features: [FeatureCopy, FeatureCopy, FeatureCopy, FeatureCopy] };
    journey: {
      heading: string;
      lede: string;
      tabsAriaLabel: string;
      steps: [JourneyStepCopy, JourneyStepCopy, JourneyStepCopy, JourneyStepCopy];
    };
    resources: {
      heading: string;
      lede: string;
      items: { href: string; title: string; description: string }[];
      /** The 5th card (Hebrew phrases), appended by the component only when phrasesPublished(). */
      phrasesItem: { title: string; description: string };
    };
    reading: {
      eyebrow: string;
      heading: string;
      lead: string;
      valueHeading: string;
      valueBody: string;
      capabilities: [string, string, string];
      altLibrary: string;
      altStory: string;
    };
    supporting: {
      heading: string;
      lede: string;
      features: [SupportingFeatureCopy, SupportingFeatureCopy, SupportingFeatureCopy];
    };
    testimonials: {
      heading: string;
      lead: string;
      /** Disclosure shown once near the heading when the quotes are translated
       *  for this locale (src/data/testimonials.ts's `fr` field) — empty/unused on en. */
      translationNote: string;
      /** Label for the scrollable reviews region (assistive tech only). */
      reviewsAria: string;
      translatedFromPrefix: string;
      starsAriaLabel: (rating: number) => string;
    };
    faq: { title: string; items: { q: string; a: string }[] };
    downloadCta: { heading: string; lead: string };
  };
  /** The app-download modal (`AppPromoModal.astro`), shown once per session on
   *  content pages. Which routes it appears on and how often is policy, not
   *  copy — that lives in `src/lib/app-promo.mjs` (docs/APP_PROMO.md). */
  appPromo: {
    eyebrow: string;
    title: string;
    lead: string;
    points: [string, string, string];
    /** Dismiss action, worded as a deferral rather than a refusal. */
    later: string;
    /** aria-label on the icon close button. */
    close: string;
  };
  /** ShareButtons.astro: plain share links (no third-party scripts). */
  share: {
    /** Visible label before the row of share buttons. */
    label: string;
    /** aria-label of the single share button that opens the menu. */
    menu: string;
    facebook: string;
    whatsapp: string;
    telegram: string;
    copyLink: string;
    /** Announced (and shown) after the link is copied. */
    copied: string;
  };
  /** The 404 page (`src/pages/404.astro`). Link labels come from `nav`, so
   *  this is only the page's own copy. */
  notFound: {
    /** <title> and meta description — noindex, but both still show in a tab. */
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    lead: string;
    /** Primary CTA back to the home page. */
    home: string;
    /** Small heading above the suggested links. */
    suggestions: string;
  };
  /** PhraseCard.astro's "Said by/to" row and gender-variant toggle — the only
   *  phrases-page chrome that needs a locale-aware accessible label, since EN's
   *  axis-agnostic "Man"/"Woman" doesn't fit FR (tu/vous and speaker/addressee
   *  interact there in a way EN doesn't need to spell out). */
  phrases: {
    saidBy: string;
    saidTo: string;
    variantToggle: {
      speaker: { male: string; female: string };
      addressee: { male: string; female: string };
    };
  };
  /** /learn/hebrew-verbs/ (VerbsPage.astro and its client explorer). Verb
   *  headwords, translations and forms are data (src/data/hebrew-verbs.json),
   *  never dictionary entries. `*Template` entries use {placeholder} tokens. */
  verbs: {
    title: string;
    description: string;
    breadcrumbHome: string;
    breadcrumbPage: string;
    eyebrow: string;
    h1: string;
    lead: string;
    heroSearchLabel: string;
    heroSearchButton: string;
    heroSuggestLabel: string;
    heroPopular: string;
    /** Labels after the binyan, free-verb and app-verb counts. */
    heroStats: [string, string, string];
    rootsTitle: string;
    rootsLead: string;
    chartEyebrow: string;
    chartH2: string;
    chartLead: string;
    chartCols: { binyan: string; meaning: string; past: string; present: string; future: string; infinitive: string };
    chartCaption: string;
    /** Link from a chart row to that example verb's full table. */
    chartOpenTemplate: string;
    noInfinitive: string;
    roles: { paal: string; nifal: string; piel: string; pual: string; hifil: string; hufal: string; hitpael: string };
    howEyebrow: string;
    howH2: string;
    howLead: string;
    /** One card per step; the Hebrew examples come from the verb data (hebrew-verbs.mjs howExamples). */
    howSteps: { title: string; body: string }[];
    explorerEyebrow: string;
    explorerH2: string;
    explorerLead: string;
    searchLabel: string;
    searchPlaceholder: string;
    filterLabel: string;
    filterAll: string;
    /** {shown} {free} */
    countTemplate: string;
    noResults: string;
    listLabel: string;
    freeTag: string;
    appTag: string;
    noScriptList: string;
    root: string;
    usage: string;
    tenses: { present: string; past: string; future: string; imperative: string };
    colPerson: string;
    colForm: string;
    persons: Record<string, string>;
    passiveNote: string;
    lockedTitle: string;
    /** {verb} */
    lockedTextTemplate: string;
    /** {binyan} */
    lockedMoreTemplate: string;
    ctaEyebrow: string;
    ctaH2: string;
    ctaText: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
    keepLearningH2: string;
    resources: { href: string; title: string; description: string }[];
    sourceNote: string;
  };
  /** /learn/hebrew-cursive/ (CursivePage.astro and its client, cursive-client.ts).
   *  Letters, pairs and example words are data (src/lib/hebrew-cursive.mjs);
   *  `pairTips` and `examples` follow that module's order. `*Template` entries
   *  use {placeholder} tokens. */
  cursive: {
    title: string;
    description: string;
    breadcrumbHome: string;
    breadcrumbPage: string;
    /** WebApplication name in the page's JSON-LD. */
    appName: string;
    eyebrow: string;
    h1: string;
    lead: string;
    examplesLabel: string;
    /** Short gloss per example word. */
    examples: string[];
    outputLabel: string;
    printLabel: string;
    inputLabel: string;
    inputPlaceholder: string;
    /** Shown when the input holds Latin letters. */
    latinHint: string;
    padLabel: string;
    padSpace: string;
    padBackspace: string;
    copyLink: string;
    linkCopied: string;
    download: string;
    /** File name (no extension) of the saved image. */
    downloadFile: string;
    breakdownTitle: string;
    /** {name} */
    finalTemplate: string;
    chartEyebrow: string;
    chartH2: string;
    chartLead: string;
    /** {name}: accessible label of a chart card, which opens the tracer. */
    chartPracticeTemplate: string;
    pairsEyebrow: string;
    pairsH2: string;
    pairsLead: string;
    pairTips: string[];
    howEyebrow: string;
    howH2: string;
    howSteps: { title: string; body: string }[];
    practiceEyebrow: string;
    practiceH2: string;
    practiceLead: string;
    practicePickLabel: string;
    /** {name} */
    practiceCanvasTemplate: string;
    practiceClear: string;
    practicePrev: string;
    practiceNext: string;
    practiceModel: string;
    /** {name} */
    practiceLessonTemplate: string;
    practiceNoScript: string;
    sheetsH3: string;
    sheetsLead: string;
    sheetAll: string;
    sheetWord: string;
    sheetChart: string;
    /** Heading printed on the sheets. */
    sheetTitle: string;
    sheetChartTitle: string;
    sheetFooter: string;
    ctaEyebrow: string;
    ctaH2: string;
    ctaText: string;
    faqTitle: string;
    faq: { q: string; a: string }[];
    keepLearningH2: string;
    resources: { href: string; title: string; description: string }[];
    /** {link}: the font credit, a link to the font's repository. */
    fontNote: string;
  };
  /** Blog chrome, rendered by the shared BlogIndexPage/BlogPostPage templates
   *  for both /blog/ and /fr/blog/. Article bodies are content (the `blog` /
   *  `blogFr` collections), never dictionary entries. */
  blog: {
    /** <title>/og:title and meta description for this locale's listing page. */
    indexTitle: string;
    indexDescription: string;
    eyebrow: string;
    h1: string;
    lead: string;
    /** Shown instead of the listing when this locale has no published post yet. */
    emptyTitle: string;
    emptyBody: string;
    latestHeading: string;
    featuredFlag: string;
    readArticle: string;
    /** Separator between `readArticle` and the post title in the featured
     *  card's screen-reader-only suffix. Locale-dependent typography: French
     *  high punctuation takes a no-break space before the colon. */
    readArticleTitlePrefix: string;
    allArticles: string;
    relatedHeading: string;
    faqTitle: string;
    ctaText: string;
    /** Cross-link the vocabulary post adds to this locale's phrases page.
     *  `{link}` is replaced with an <a> whose label is `phrasesPromptLink`. */
    phrasesPrompt: string;
    phrasesPromptLink: string;
    /** `categoryKey` in a post's frontmatter resolves here, so the EN and FR
     *  category taxonomies stay a single list instead of two free-text sets. */
    categories: {
      hebrewLearning: string;
      hebrewReading: string;
      hebrewAlphabet: string;
      alphabetGuide: string;
      studyGuide: string;
      productUpdates: string;
      founderStory: string;
      learningDesign: string;
    };
  };
}

import { en } from './en';
import { fr } from './fr';

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale = 'en'): Dictionary {
  return dictionaries[locale];
}
