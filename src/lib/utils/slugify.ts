export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[^a-z0-9\s-]/g, "") // Remove invalid chars
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-"); // Collapse dashes
}

export function unslugify(slug: string): string {
  if (!slug) return "";
  return slug.replace(/-/g, " "); // Replace hyphens with spaces
  // .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word (optional, but nice)
}
