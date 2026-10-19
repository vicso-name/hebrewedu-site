import type { Dictionary } from './index';

// English dictionary. Every value here is the EN string that was already
// hardcoded in Nav/Footer/ConsentBanner/the lesson route/the hub route
// before this file existed — moving it here must not change a single
// rendered character (see docs/I18N_AUDIT.md §2).
export const en: Dictionary = {
  common: {
    brand: 'HEBREWEDU',
    getTheApp: 'Get the app',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    storeLabels: {
      google_play: 'Get it on Google Play',
      app_store: 'Download on the App Store',
    },
    // Unused on EN pages today (EN nav always renders getTheApp/nav.play) —
    // kept so fr.ts has a same-shaped counterpart to translate.
    application: 'App',
    gamesEnLabel: 'Games',
    blogEnLabel: 'Blog',
  },
  nav: {
    // Unused on EN pages today (the EN nav reaches home via the logo, not a nav link).
    home: 'Home',
    play: 'Play',
    alphabetCourse: 'Alphabet Course',
    phrases: 'Phrases',
    blog: 'Blog',
  },
  footer: {
    play: 'Play',
    blog: 'Blog',
    hebrewPhrases: 'Hebrew Phrases',
    terms: 'Terms',
    privacy: 'Privacy',
    copyright: (year) => `© ${year} HebrewEdu. All rights reserved.`,
    privacyChoices: 'Privacy choices',
  },
  consent: {
    text: 'We use Google Analytics to understand how this site is used. In your region, it only runs if you accept.',
    privacyPolicy: 'Privacy policy',
    decline: 'Decline',
    accept: 'Accept',
  },
  lesson: {
    skipToLesson: 'Skip to lesson',
    breadcrumbRoot: 'Hebrew Alphabet',
    lessonLabel: (order, name) => `Lesson ${order}: ${name}`,
    stageNames: { theory: 'Theory', examples: 'Examples', practice: 'Practice', results: 'Results' },
    eyebrow: (order, total) => `Hebrew alphabet · Lesson ${order} of ${total}`,
    localPreview: 'Local preview',
    stepOf: (step, total) => `Step ${step} of ${total}`,
    theory: { nextCta: 'Next: Examples' },
    examples: { nextCta: 'Next: Practice' },
    results: {
      heading: 'Your practice results',
      intro: 'Use your results to decide what to revisit.',
      overallScoreLabel: 'Overall score · correct answers out of available questions',
      stats: { correct: 'Correct', attempted: 'Attempted', incorrect: 'Incorrect', unanswered: 'Unanswered' },
      reviewMistakes: 'Review mistakes',
      answerUnanswered: 'Answer unanswered',
      sessionNote: 'Results are saved for this page visit only. They are not synced to the mobile app.',
      noScript: 'Interactive results need JavaScript. Read the questions above and expand their source answers to check your work.',
      tryAgain: 'Try again',
      nextLesson: (label) => `Next lesson: ${label}`,
      backToCourse: 'Back to the course',
    },
  },
  hub: {
    // Mirrors src/lib/alphabet-course.mjs's courseTitle/courseDescription exactly
    // (the hub route uses the dictionary value uniformly across locales).
    pageTitle: 'Hebrew Alphabet Course for Beginners | HebrewEdu',
    pageDescription: 'Learn the Hebrew alphabet step by step with beginner explanations, examples and interactive practice. Start with Aleph and explore the 22-letter learning path.',
    skipToCourse: 'Skip to course',
    eyebrow: 'Hebrew alphabet course · For beginners',
    title: 'Learn the Hebrew Alphabet Step by Step',
    lead: 'Start with one letter. Build your understanding through clear explanations, examples and practice, at your own pace.',
    startLearning: 'Start Learning',
    exploreCurriculum: 'Explore the curriculum',
    availability: 'Start with Aleph today. More letter lessons are coming soon.',
    // Unused on EN today (Aleph is always available) — kept for fr.ts's shape.
    noLessonsYet: 'The detailed lessons are coming soon.',
    firstLessonEyebrow: 'Your first lesson',
    meetAleph: 'Meet Aleph',
    firstLessonText: 'Recognize the letter, explore vowel marks and check your understanding.',
    firstLessonMeta: 'Lesson 1 of 22',
    pathEyebrow: 'Your learning path',
    pathTitle: 'One letter at a time',
    pathText: 'Follow the Hebrew alphabet in order. Aleph is ready to explore; the remaining lessons are coming soon.',
    curriculumAriaLabel: 'Hebrew alphabet curriculum',
    startLessonAria: (order, name) => `Start lesson ${order}: ${name}`,
    lessonOrderLabel: (order) => `Lesson ${order}`,
    startLessonCta: 'Start lesson',
    comingSoon: 'Coming Soon',
    howEyebrow: 'A guided learning experience',
    howTitle: 'How lessons work',
    howText: 'A clear next step, from your first explanation to your practice results.',
    stages: {
      theory: { title: 'Theory', description: ['Meet the letter and understand what you’re learning.'] },
      examples: { title: 'Examples', description: ['Look closely at Hebrew letters and their vowel marks.'] },
      practice: { title: 'Practice', description: ['Work through questions one at a time, with feedback.'] },
      results: { title: 'Results', description: ['See how you did and revisit questions you missed.'] },
    },
    keepExploringEyebrow: 'Keep exploring',
    resourcesTitle: 'Additional learning resources',
    resourcesText: 'Use a reference when you need it, or try a game for a change of pace.',
    resources: [
      { href: '/blog/hebrew-alphabet-complete-guide/', label: 'Hebrew Alphabet Guide', tag: 'Letter reference', text: 'Keep a full alphabet chart, letter names and final forms close at hand.' },
      { href: '/blog/how-to-read-hebrew-nikud/', label: 'Hebrew Vowels & Nikud Guide', tag: 'Vowel reference', text: 'Explore the marks that help you read Hebrew vowel sounds.' },
      { href: '/play/alef-bet-rush/', label: 'Alef Bet Rush', tag: 'Recognition game', text: 'Review Hebrew letter recognition with a browser game.' },
      { href: '/play/hebrew-mahjong/', label: 'Hebrew Mahjong', tag: 'Matching game', text: 'Get more familiar with letter shapes through matching.' },
    ],
    keepLearningEyebrow: 'Keep learning',
    appTitle: 'Continue learning in the app',
    appText: 'Explore HebrewEdu on your phone for more Hebrew learning and practice.',
  },
  home: {
    title: 'Learn the Hebrew Alphabet & Read Hebrew | HebrewEdu',
    seoTitle: 'Hebrew Alphabet App & Reading Practice',
    description: 'Learn the Hebrew alphabet step by step, practise vocabulary and verbs, and start reading beginner Hebrew with audio and translation.',
    hero: {
      eyebrow: 'A Hebrew learning app for beginners',
      title: 'Learn Hebrew, starting with the alphabet.',
      lead: 'Start with the Hebrew alphabet and pronunciation, then build vocabulary and grammar through lessons and exercises. Practise reading with audio and translation.',
      screenshotAlt: 'HebrewEdu home screen',
    },
    pillars: {
      heading: 'Build a foundation in Hebrew',
      lead: 'Connect letters and sounds with lessons, exercises and vocabulary, then put them to use in beginner reading.',
      features: [
        { title: 'Learn the foundations', description: 'Alphabet, sounds and Nikud made clear from the start.' },
        { title: 'Practice what you learn', description: 'Focused exercises help turn each lesson into a real skill.' },
        { title: 'Remember what matters', description: 'Return to words and material that need more practice.' },
        { title: 'Read real Hebrew', description: 'Move into beginner texts with translation and audio support.' },
      ],
    },
    journey: {
      heading: 'Build your Hebrew skills step by step',
      lede: 'Hebrew can feel difficult when everything is introduced at once. HebrewEdu breaks the process into manageable stages.',
      tabsAriaLabel: 'Learning path steps',
      steps: [
        {
          title: 'Start with the foundations',
          body: 'Learn Hebrew letters, their sounds and the reading patterns you need before moving on.',
          meta: ['Alphabet', 'Pronunciation', 'Nikud'],
          alt: 'Hebrew alphabet learning screen in HebrewEdu',
        },
        {
          title: 'Turn knowledge into skill',
          body: 'Practise what you learn with focused exercises instead of simply rereading explanations.',
          meta: ['Lessons', 'Exercises', 'Review'],
          alt: 'Alphabet practice hub in HebrewEdu',
        },
        {
          title: 'Master verbs and binyanim',
          body: 'Understand how Hebrew verbs are built, compare binyanim and explore real verb forms in one clear dictionary.',
          meta: ['Verbs', 'Binyanim', 'Dictionary'],
          alt: 'Hebrew verb dictionary with binyanim filters in HebrewEdu',
        },
        {
          title: 'Build vocabulary that stays with you',
          body: 'Learn useful words, return to difficult ones and reinforce what needs more practice.',
          meta: ['Vocabulary', 'Review', 'Difficult words'],
          alt: 'Hebrew vocabulary word card in HebrewEdu',
        },
      ],
    },
    resources: {
      heading: 'A guide for your next step',
      lede: 'Look up a letter, plan your practice, or try a short game.',
      items: [
        { href: '/blog/hebrew-alphabet-complete-guide/', title: 'Learn the Hebrew alphabet', description: 'Keep letter shapes, names, sounds and final forms close at hand.' },
        { href: '/blog/learn-hebrew-alphabet-7-days/', title: 'A seven-day alphabet plan', description: 'Give each day a focus, with time to practise and review the letters.' },
        { href: '/blog/how-to-read-hebrew-nikud/', title: 'Read Hebrew vowel marks', description: 'See how Nikud helps you sound out your first Hebrew words.' },
        { href: '/play/', title: 'Free Hebrew learning games', description: 'Practise recognising letters and recalling their names in your browser.' },
      ],
      phrasesItem: { title: 'Useful Hebrew phrases', description: 'Try everyday expressions, with meanings, pronunciation support and a quick practice.' },
    },
    reading: {
      eyebrow: 'Start reading',
      heading: "When you're ready, start reading real Hebrew.",
      lead: 'Reading is where letters, vocabulary and grammar finally come together. Beginner-friendly texts help you move from recognising words to understanding Hebrew in context.',
      valueHeading: 'Read with support, not guesswork',
      valueBody: 'Follow beginner-friendly Hebrew stories with built-in translation, audio and vocabulary help. Instead of decoding every line on your own, you can understand the text, hear how it sounds and keep moving forward with confidence.',
      capabilities: ['Reading', 'Translation', 'Audio'],
      altLibrary: 'HebrewEdu Reading Trainer story library',
      altStory: 'Beginner Hebrew story with reading tools in HebrewEdu',
    },
    supporting: {
      heading: 'Built for consistent progress',
      lede: 'A little Hebrew, often, goes further than a lot at once.',
      features: [
        { title: 'Structured lessons', desc: 'Learn concepts in an intentional order rather than randomly.' },
        { title: 'Review difficult material', desc: 'Come back to words and exercises that need more attention.' },
        { title: 'Learn at your own pace', desc: 'Short, repeatable study sessions make consistent practice easier.' },
      ],
    },
    testimonials: {
      heading: 'What learners say',
      lead: 'Learning Hebrew looks different for everyone. Here’s what our learners say.',
      // Unused on EN (the quotes are already English) — kept for fr.ts's shape.
      translationNote: '',
      translatedFromPrefix: 'Translated from',
      starsAriaLabel: (rating) => `${rating} out of 5 stars`,
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        { q: 'Do I need to know Hebrew before using the app?', a: 'No. HebrewEdu is designed for beginners and starts with the foundations.' },
        { q: 'Does the app only teach the Hebrew alphabet?', a: 'No. The alphabet is the starting point. HebrewEdu also includes structured lessons, practice, vocabulary and beginner reading material.' },
        { q: 'Can I learn at my own pace?', a: 'Yes. Lessons and exercises are designed for short, repeatable study sessions.' },
      ],
    },
    downloadCta: {
      heading: 'Ready to start learning Hebrew?',
      lead: 'Begin with the alphabet and build from there.',
    },
  },
};
