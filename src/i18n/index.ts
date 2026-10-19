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
  };
  nav: {
    home: string;
    play: string;
    alphabetCourse: string;
    phrases: string;
    blog: string;
  };
  footer: {
    play: string;
    blog: string;
    hebrewPhrases: string;
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
      translatedFromPrefix: string;
      starsAriaLabel: (rating: number) => string;
    };
    faq: { title: string; items: { q: string; a: string }[] };
    downloadCta: { heading: string; lead: string };
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
}

import { en } from './en';
import { fr } from './fr';

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale = 'en'): Dictionary {
  return dictionaries[locale];
}
