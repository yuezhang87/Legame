export function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  // A short random suffix keeps this collision-free without needing a
  // retry loop for duplicate titles ("Math Game", "Math Game" again, etc.)
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base || "game"}-${suffix}`;
}
