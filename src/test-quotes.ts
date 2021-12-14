import { Quote } from "@/quote";

const testQuotes: Quote[] = [
  { author: "Miguel de Cervantes", contents: "There is madness in too much sanity, and the greatest madness of all is to see things as they are instead of as they should be" },

  { author: "Friedrich Nietzsche", contents: "Too bad! Same old story! Once you've finished building your house you notice you've accidentally learned something that you really should have known—before you started."},

  { author: "Mary Shelley", contents: "I have love in me the likes of which you can scarcely imagine and rage the likes of which you would not believe. If I cannot satisfy the one, I will indulge the other."}
];

export function randomQuote(): Quote {
  return testQuotes[Math.floor(Math.random() * testQuotes.length)];
}
