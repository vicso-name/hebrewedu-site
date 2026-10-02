export interface Faq {
  q: string;
  a: string;
}

// Single source for the homepage FAQ: rendered by components/home/Faq.astro and
// emitted as FAQPage JSON-LD by pages/index.astro, so the two cannot drift.
export const faqs: Faq[] = [
  {
    q: 'Do I need to know Hebrew before using the app?',
    a: 'No. HebrewEdu is designed for beginners and starts with the foundations.',
  },
  {
    q: 'Does the app only teach the Hebrew alphabet?',
    a: 'No. The alphabet is the starting point. HebrewEdu also includes structured lessons, practice, vocabulary and beginner reading material.',
  },
  {
    q: 'Can I learn at my own pace?',
    a: 'Yes. Lessons and exercises are designed for short, repeatable study sessions.',
  },
];
