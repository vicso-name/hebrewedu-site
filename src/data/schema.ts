import { site } from './site';

// The one description of the app used in structured data. Only the homepage
// emits it (in its graph); other pages pass their own schema or none.
//
// No aggregateRating — there is no verifiable rating source in the repo.
export const appSchema = {
  "@type": "MobileApplication",
  "@id": `${site.url}/#app`,
  "name": "Learn Hebrew – Read & Speak",
  "alternateName": ["HebrewEdu", "Alef-Bet Tutor"],
  "description": "A Hebrew learning app for beginners: learn the alphabet step by step, practise vocabulary and verbs, and read beginner Hebrew with audio and translation.",
  "applicationCategory": "EducationApplication",
  "operatingSystem": "Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "Viktor Sokoliuk"
  },
  "url": `${site.url}/`,
  "downloadUrl": [site.stores.googlePlay.url, site.stores.appStore.url],
  "screenshot": `${site.url}/screenshots/app-home.jpg`,
  "featureList": [
    "Hebrew alphabet (Aleph Bet) with sounds and Nikud",
    "Structured lessons",
    "Practice exercises",
    "Vocabulary and review",
    "Verb dictionary with binyanim",
    "Beginner reading with translation and audio"
  ],
  "inLanguage": "en"
};
