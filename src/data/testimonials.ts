export interface Testimonial {
  rating: number;
  text: string;
  source: string;
  // ISO date (YYYY-MM-DD) the review was left
  date: string;
}

// Real Google Play reviews for com.vicsothemes.hebrewforbeginners, taken from the
// Play Console review export. The text is quoted verbatim — do not rewrite,
// spell-correct or extend it. The export carries no reviewer names, so none are shown.
//
// The homepage carousel renders every record here, in order, as an equal card.
// Add real reviews by appending objects; no layout change is needed for 8–10+.
export const testimonials: Testimonial[] = [
  {
    rating: 5,
    text:   'Wow, Im suprised how well this app teaches the hebrew alef bet. I tried dualingo but it assumes you know vowels and words and their learning vowels and letters was very tedious. This app is much better! Easy to understand but more importantly easier to memorize and it gives more context on vowels! Very helpful for Scholars!',
    source: 'Google Play',
    date:   '2026-01-15',
  },
  {
    rating: 5,
    text:   'A lot of information on the uses of the letters, plus a vowel study guide and much more. I have tried a lot of Hebrew alphabet apps and this is unique.',
    source: 'Google Play',
    date:   '2023-04-24',
  },
  {
    // Complete opening sentence of a longer review
    rating: 5,
    text:   "Great app for learning the basic vocabulary and mastering the alphabet, which itself can be quite challenging if you aren't used to abjads.",
    source: 'Google Play',
    date:   '2023-10-15',
  },
  {
    rating: 5,
    text:   "I just began using this app, and I'm really amazed by it! The app is easy to use, and the lessons are interactive, making learning alphabet a piece of cake.",
    source: 'Google Play',
    date:   '2024-01-28',
  },
  {
    rating: 5,
    text:   'Super app for learning Hebrew! interactive, easy to use.',
    source: 'Google Play',
    date:   '2026-07-23',
  },
  {
    rating: 5,
    text:   'JUST EXCELLENT HIGHLY RECOMMEND ❤️',
    source: 'Google Play',
    date:   '2026-02-18',
  },
  {
    rating: 5,
    text:   'so good for beginners',
    source: 'Google Play',
    date:   '2026-05-31',
  },
  {
    rating: 5,
    text:   'Easy to use 👍👍👍',
    source: 'Google Play',
    date:   '2026-05-03',
  },
];
