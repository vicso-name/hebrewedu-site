export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  // Not known for the current reviews — leave unset until there is a real source.
  source?: string;
  date?: string;
  url?: string;
}

// The homepage carousel renders every record here, in order, as an equal card.
// Add real reviews by appending objects; no layout change is needed for 8–10+.
export const testimonials: Testimonial[] = [
  {
    name:   'Sarah M.',
    rating: 5,
    text:   'Finally an app that explains Hebrew letters properly. The audio is so clear and the structured lessons make it easy to track my progress.',
  },
  {
    name:   'David K.',
    rating: 5,
    text:   'I love the Reading Trainer feature. Being able to read actual Hebrew stories, even as a beginner, is incredibly motivating!',
  },
  {
    name:   'Miriam L.',
    rating: 5,
    text:   'The Alphabet Explorer is brilliant. I can see all 22 letters at a glance and the color coding between consonants and special forms is very helpful.',
  },
  {
    name:   'James R.',
    rating: 5,
    text:   'Perfect for beginners. I had no idea where to start with Hebrew, but this app guides you step by step. The offline mode is a huge bonus.',
  },
];
