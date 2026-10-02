export interface Testimonial {
  rating: number;
  text: string;
  source: string;
  // ISO date (YYYY-MM-DD) the review was left
  date: string;
  // Set only when `text` is an English translation of a review written in this language
  translatedFrom?: string;
}

// Real Google Play reviews for com.vicsothemes.hebrewforbeginners, taken from the
// Play Console review export. English text is quoted verbatim — do not rewrite,
// spell-correct or extend it. Translated reviews are faithful translations and are
// disclosed on the card. The export carries no reviewer names, so none are shown.
//
// The homepage carousel renders every record here, in order, as an equal card.
// Add real reviews by appending objects; no layout change is needed for 8–10+.
export const testimonials: Testimonial[] = [
  {
    rating: 5,
    text:   'A lot of information on the uses of the letters, plus a vowel study guide and much more. I have tried a lot of Hebrew alphabet apps and this is unique.',
    source: 'Google Play',
    date:   '2023-04-24',
  },
  {
    // Continuous excerpt from the start of a longer review
    rating: 5,
    text:   'Wow, Im suprised how well this app teaches the hebrew alef bet. I tried dualingo but it assumes you know vowels and words and their learning vowels and letters was very tedious.',
    source: 'Google Play',
    date:   '2026-01-15',
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
    // First two sentences. Original: «Очень хорошее приложение для начинающих с нуля.
    // Единственное из многих на которое я оформила подписку.»
    rating: 5,
    text:   'A very good app for complete beginners. It’s the only one of the many apps I tried that I subscribed to.',
    source: 'Google Play',
    date:   '2026-05-28',
    translatedFrom: 'Russian',
  },
  {
    // Opening sentence. Original: «Le doy 5 estrellas porque es muy buena app para
    // aprender hebreo a nivel básico.»
    rating: 5,
    text:   'I give it 5 stars because it’s a very good app for learning Hebrew at a basic level.',
    source: 'Google Play',
    date:   '2026-08-15',
    translatedFrom: 'Spanish',
  },
];
