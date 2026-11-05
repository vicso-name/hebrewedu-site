// The site's browser games, in learning order (alphabet → words → numbers →
// listening → conversation). Shared by GamesCarousel.astro; each game's
// visible name/tag/blurb lives in the i18n dictionaries under `games.items`,
// keyed by `slug`. `href` is always the game's landing page, never /game/.
import type { ImageMetadata } from 'astro';
import alefBetRush from '../assets/play/alef-bet-rush-key-art.png';
import hebrewMahjong from '../assets/play/hebrew-mahjong-key-art.png';
import hebrewWordSearch from '../assets/play/hebrew-word-search-key-art.jpg';
import hebrewWordBuilder from '../assets/play/hebrew-word-builder-key-art.jpg';
import hebrewCrossword from '../assets/play/hebrew-crossword-key-art.jpg';
import hebrewNumbersQuest from '../assets/play/hebrew-numbers-quest-key-art.jpg';
import hebrewFalafelStand from '../assets/play/hebrew-falafel-stand-key-art.jpg';
import hebrewShalomCity from '../assets/play/hebrew-shalom-city-key-art.jpg';

export type GameSlug =
  | 'alef-bet-rush'
  | 'hebrew-mahjong'
  | 'hebrew-word-search'
  | 'hebrew-word-builder'
  | 'hebrew-crossword'
  | 'hebrew-numbers-quest'
  | 'hebrew-falafel-stand'
  | 'hebrew-shalom-city';

/** Card accent, one per skill area. */
export type GameAccent = 'indigo' | 'emerald' | 'amber' | 'coral' | 'plum';

export interface Game {
  slug: GameSlug;
  href: string;
  keyArt: ImageMetadata;
  accent: GameAccent;
}

export const games: Game[] = [
  { slug: 'alef-bet-rush', href: '/play/alef-bet-rush/', keyArt: alefBetRush, accent: 'indigo' },
  { slug: 'hebrew-mahjong', href: '/play/hebrew-mahjong/', keyArt: hebrewMahjong, accent: 'indigo' },
  { slug: 'hebrew-word-search', href: '/play/hebrew-word-search/', keyArt: hebrewWordSearch, accent: 'emerald' },
  { slug: 'hebrew-word-builder', href: '/play/hebrew-word-builder/', keyArt: hebrewWordBuilder, accent: 'emerald' },
  { slug: 'hebrew-crossword', href: '/play/hebrew-crossword/', keyArt: hebrewCrossword, accent: 'emerald' },
  { slug: 'hebrew-numbers-quest', href: '/play/hebrew-numbers-quest/', keyArt: hebrewNumbersQuest, accent: 'amber' },
  { slug: 'hebrew-falafel-stand', href: '/play/hebrew-falafel-stand/', keyArt: hebrewFalafelStand, accent: 'coral' },
  { slug: 'hebrew-shalom-city', href: '/play/hebrew-shalom-city/', keyArt: hebrewShalomCity, accent: 'plum' },
];
