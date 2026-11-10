export const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || undefined;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}
