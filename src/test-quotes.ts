import { Quote } from "@/quote";

const testQuotes: Quote[] = [
  { 
    author: "Miguel de Cervantes", 
    contents: "There is madness in too much sanity, and the greatest madness of all is to see things as they are instead of as they should be",
    tags: [],
    work: "Don Quixote",
  },

  { 
    author: "Friedrich Nietzsche", 
    contents: "Too bad! Same old story! Once you've finished building your house you notice you've accidentally learned something that you really should have known—before you started.",
    tags: [],
    work: "Beyond Good and Evil",
  },

  { 
    author: "Mary Shelley", 
    contents: "I have love in me the likes of which you can scarcely imagine and rage the likes of which you would not believe. If I cannot satisfy the one, I will indulge the other.",
    tags: [ "gothic" ],
    work: "Frankenstein",
  },

  {
    author: "Mary Shelley",
    contents: "If I cannot inspire love, I will cause fear!",
    tags: [ "gothic" ],
    work: "Frankenstein",
  },

  {
    author: "Richard Feynman",
    contents: "Study hard what interests you the most in the most undisciplined, irreverent, and original manner possible.",
    tags: [ "inspirational" ],
  },
];

export function randomQuote(): Quote {
  return randomElement(testQuotes);
}

export function randomFromAuthor(author: string): Quote {
  return randomElement(testQuotes.filter(quote => quote.author === author));
}

function randomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
