/**
 * wagtail.ts
 * Low-level utilities for interacting with the Wagtail CMS, including
 * draft preview token validation and page-level API helpers.
 */

const PREVIEW_SECRET = process.env.WAGTAIL_PREVIEW_SECRET ?? "";

/**
 * Validates a preview token passed from the Wagtail Admin.
 * Used in the Next.js /api/preview route handler.
 */
export function validatePreviewSecret(token: string | null): boolean {
  if (!PREVIEW_SECRET || !token) return false;
  return token === PREVIEW_SECRET;
}

/**
 * Builds a rendition URL for a Wagtail image based on filter spec.
 * Requires the image ID and a filter_spec (e.g., "fill-800x450").
 */
export function buildRenditionUrl(
  apiBase: string,
  imageId: number,
  filterSpec: string = "fill-800x450"
): string {
  return `${apiBase}/api/images/${imageId}/?format=json&filter_spec=${filterSpec}`;
}
