export type Game = {
  slug: string;
  title: string;
  description: string;
  url: string;
};

// Add a new game by adding an entry here — the dashboard grid and the
// embed page both read from this list, nothing else needs to change.
export const games: Game[] = [
  {
    slug: "words-words-words",
    title: "Words Words Words",
    description: "A word game.",
    url: "https://wordswordswords-kappa.vercel.app/",
  },
];

export function getGame(slug: string): Game | undefined {
  return games.find((g) => g.slug === slug);
}
