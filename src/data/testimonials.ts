export interface Testimonial {
  rating: number;
  text: string;
  source: string;
  // ISO date (YYYY-MM-DD) the review was left
  date: string;
  // Set only when `text` is an English translation of a review written in this language
  translatedFrom?: string;
  // FR homepage display only: a translation of `text` (or, where noted, of the
  // original-language quote in the comment above it) into French. Not part of
  // the review record itself — never read for EN, never exported as `text`.
  fr: string;
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
    fr:     "Beaucoup d'informations sur l'usage des lettres, ainsi qu'un guide d'étude des voyelles et bien plus encore. J'ai essayé beaucoup d'applications sur l'alphabet hébreu, et celle-ci est unique.",
  },
  {
    // Continuous excerpt from the start of a longer review
    rating: 5,
    text:   'Wow, Im suprised how well this app teaches the hebrew alef bet. I tried dualingo but it assumes you know vowels and words and their learning vowels and letters was very tedious.',
    source: 'Google Play',
    date:   '2026-01-15',
    fr:     "Waouh, je suis surpris de voir à quel point cette application enseigne bien l'alef bet hébreu. J'avais essayé Duolingo, mais elle suppose que l'on connaît déjà les voyelles et les mots, et apprendre les voyelles et les lettres y était très laborieux.",
  },
  {
    // Complete opening sentence of a longer review
    rating: 5,
    text:   "Great app for learning the basic vocabulary and mastering the alphabet, which itself can be quite challenging if you aren't used to abjads.",
    source: 'Google Play',
    date:   '2023-10-15',
    fr:     "Excellente application pour apprendre le vocabulaire de base et maîtriser l'alphabet, qui peut lui-même être assez difficile si l'on n'est pas habitué aux abjads.",
  },
  {
    rating: 5,
    text:   "I just began using this app, and I'm really amazed by it! The app is easy to use, and the lessons are interactive, making learning alphabet a piece of cake.",
    source: 'Google Play',
    date:   '2024-01-28',
    fr:     "Je viens de commencer à utiliser cette application, et j'en suis vraiment impressionné ! Elle est facile à utiliser, et les leçons sont interactives, ce qui rend l'apprentissage de l'alphabet très simple.",
  },
  {
    // First two sentences. Original: «Очень хорошее приложение для начинающих с нуля.
    // Единственное из многих на которое я оформила подписку.»
    rating: 5,
    text:   'A very good app for complete beginners. It’s the only one of the many apps I tried that I subscribed to.',
    source: 'Google Play',
    date:   '2026-05-28',
    translatedFrom: 'Russian',
    // Translated directly from the Russian original quoted above, not from `text`.
    fr:     "Une très bonne application pour les débutants qui partent de zéro. C'est la seule, parmi beaucoup d'autres, à laquelle je me suis abonnée.",
  },
  {
    // Opening sentence. Original: «Le doy 5 estrellas porque es muy buena app para
    // aprender hebreo a nivel básico.»
    rating: 5,
    text:   'I give it 5 stars because it’s a very good app for learning Hebrew at a basic level.',
    source: 'Google Play',
    date:   '2026-08-15',
    translatedFrom: 'Spanish',
    // Translated directly from the Spanish original quoted above, not from `text`.
    fr:     "Je lui donne 5 étoiles parce que c'est une très bonne application pour apprendre l'hébreu à un niveau basique.",
  },
];
