/** Wouter `useSearch()` string (with or without leading `?`) → unit id or null */
export function parseUnitIdFromSearch(search: string): string | null {
  const s = search.startsWith("?") ? search.slice(1) : search;
  if (!s) return null;
  return new URLSearchParams(s).get("unit");
}
