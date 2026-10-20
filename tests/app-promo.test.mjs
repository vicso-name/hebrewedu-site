import { test } from 'node:test';
import assert from 'node:assert/strict';
import { APP_PROMO, appPromoEnabled } from '../src/lib/app-promo.mjs';

// The route policy behind the app-download modal (docs/APP_PROMO.md). Layout.astro
// asks this for every page it renders, so a regression here would start popping a
// modal on the home page or on the terms page.

test('content pages carry the modal', () => {
  for (const path of [
    '/learn/hebrew-alphabet/',
    '/learn/hebrew-alphabet/aleph/',
    '/learn/hebrew-phrases/',
    '/blog/',
    '/blog/how-to-read-hebrew-nikud/',
    '/play/',
    '/play/alef-bet-rush/',
    '/fr/apprendre/alphabet-hebreu/',
    '/fr/apprendre/alphabet-hebreu/bet/',
    '/fr/blog/voyelles-hebreu/',
  ]) {
    assert.equal(appPromoEnabled(path), true, path);
  }
});

test('both home pages are excluded — they already ask three times', () => {
  assert.equal(appPromoEnabled('/'), false);
  assert.equal(appPromoEnabled('/fr/'), false);
});

test('legal and privacy pages are excluded, in both locales', () => {
  for (const path of [
    '/terms/',
    '/privacy/',
    '/website-privacy/',
    '/fr/conditions/',
    '/fr/confidentialite/',
  ]) {
    assert.equal(appPromoEnabled(path), false, path);
  }
});

test('the 404 page is excluded', () => {
  assert.equal(appPromoEnabled('/404'), false);
});

test('fullscreen game players are excluded, hub and landing pages are not', () => {
  assert.equal(appPromoEnabled('/play/alef-bet-rush/game/'), false);
  assert.equal(appPromoEnabled('/play/hebrew-mahjong/game/'), false);
  assert.equal(appPromoEnabled('/play/hebrew-word-search/game/'), false);
  assert.equal(appPromoEnabled('/play/hebrew-mahjong/'), true);
});

test('a missing trailing slash resolves the same way', () => {
  assert.equal(appPromoEnabled(''), false); // normalizes to '/'
  assert.equal(appPromoEnabled('/terms'), false);
  assert.equal(appPromoEnabled('/blog'), true);
});

test('frequency policy stays inside sane marketing bounds', () => {
  assert.ok(APP_PROMO.minDwellMs >= 5_000, 'never interrupt an arriving reader');
  assert.ok(APP_PROMO.minDwellMs < APP_PROMO.dwellMs);
  assert.ok(APP_PROMO.scrollFraction > 0 && APP_PROMO.scrollFraction <= 1);
  assert.ok(APP_PROMO.snoozeDaysDismissed >= 7, 'a dismissal has to last longer than a session');
  assert.ok(APP_PROMO.snoozeDaysStoreClick > APP_PROMO.snoozeDaysDismissed);
});
