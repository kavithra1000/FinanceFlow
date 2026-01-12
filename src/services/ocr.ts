
export function requiresOCR(text: string): boolean {
  if (!text) return true;

  const normalized = text.replace(/\s+/g, '');
  return normalized.length < 50; // threshold (tweak if needed)
}
