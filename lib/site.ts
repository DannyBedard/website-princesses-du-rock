export const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "").replace(/\/$/, "") || undefined;

export function pageUrl(path: string): string {
  const suffix = staticExport && !path.endsWith("/") ? "/" : "";
  return `${siteUrl ?? ""}${path}${suffix}`;
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
