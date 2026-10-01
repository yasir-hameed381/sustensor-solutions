import { extendTailwindMerge } from 'tailwind-merge';

import { clsx, type ClassValue } from 'clsx';

// Teach tailwind-merge the custom type scale from index.css; otherwise `text-h2` is mistaken
// for a colour and dropped whenever a `text-*` colour follows it.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'h4', 'lead', 'body', 'small', 'caption', 'eyebrow', 'micro', 'watermark', 'wordmark'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
