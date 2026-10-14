// Final owner-approved source copy is shown unchanged; original media stays withheld.
export const unavailableQuestions = new Set();
export const withheldExplanations = new Set();
export function exerciseExplanation(exercise) {
  return exercise.explanation;
}
export function studyText(block) {
  return block.text;
}

// Deterministic seed from a string (FNV-1a), so the same exercise ID always
// produces the same shuffle — stable across builds, no client/server mismatch.
function seedFromString(value) {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/**
 * Right-column display order for a MATCH_PAIRS exercise: a seeded shuffle of
 * `pairs`, fixed up into a derangement (no item stays opposite its own pair)
 * with no single constant offset — a plain rotation would make the answer
 * guessable (always "one row down"). Seeding on `seedKey` (the exercise ID)
 * keeps the order stable across builds without needing real randomness.
 */
export function derangedPairOrder(pairs, seedKey) {
  const n = pairs.length;
  if (n < 2) return pairs;
  const rand = mulberry32(seedFromString(seedKey));
  const order = pairs.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  // Fixed points (order[i] === i) would put a pair opposite itself; swapping
  // with the cyclic-next slot clears each one without introducing another,
  // since that neighbor index can never equal the position it receives.
  for (let i = 0; i < order.length; i++) {
    if (order[i] === i) {
      const j = (i + 1) % order.length;
      [order[i], order[j]] = [order[j], order[i]];
    }
  }
  // Guard against landing on a pure constant-offset rotation (still possible
  // by chance, and the only option at all for n === 2): for n >= 3, break it
  // by swapping the first two slots, then re-clear any fixed point that creates.
  const offset = (order[0] - 0 + n) % n;
  const isConstantOffset = order.every((value, i) => (value - i + n) % n === offset);
  if (isConstantOffset && n >= 3) {
    [order[0], order[1]] = [order[1], order[0]];
    for (let i = 0; i < order.length; i++) {
      if (order[i] === i) {
        const j = (i + 1) % order.length;
        [order[i], order[j]] = [order[j], order[i]];
      }
    }
  }
  return order.map(index => pairs[index]);
}
