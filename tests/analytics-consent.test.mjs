import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isConsentRegionTimeZone } from '../src/lib/analytics-consent.ts';

test('EEA/UK/CH timezones require consent', () => {
  for (const tz of ['Europe/Berlin', 'Europe/Paris', 'Europe/London', 'Europe/Zurich', 'Europe/Warsaw', 'Atlantic/Reykjavik', 'Atlantic/Canary', 'Atlantic/Madeira', 'Atlantic/Azores', 'Atlantic/Faroe']) {
    assert.equal(isConsentRegionTimeZone(tz), true, tz);
  }
});

test('non-EEA/UK/CH timezones do not require consent', () => {
  for (const tz of ['America/New_York', 'Asia/Jerusalem', 'Asia/Tokyo', 'Australia/Sydney', 'Africa/Cairo', 'America/Sao_Paulo']) {
    assert.equal(isConsentRegionTimeZone(tz), false, tz);
  }
});
