/** Prefijo BASE_URL (GitHub Pages: /nocteca/). Absolutos http(s)/data/blob sin tocar. */
export function assetUrl(path: string | undefined | null): string {
  if (!path) return "";
  if (/^(https?:|data:|blob:)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL || "/";
  const clean = path.replace(/^\//, "");
  return `${base.endsWith("/") ? base : `${base}/`}${clean}`;
}
