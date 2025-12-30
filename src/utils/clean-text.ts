// src/utils/clean-text.ts
export function cleanExtractedText(rawText: string): string {
  const lines = rawText
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean); // remove empty lines

  const lineFrequency = new Map<string, number>();
  for (const line of lines) lineFrequency.set(line, (lineFrequency.get(line) || 0) + 1);

  const cleanedLines = lines.filter(line => {
    if (/^page\s*\d+/i.test(line)) return false;
    if (/^\d+\s*\/\s*\d+$/.test(line)) return false;
    if (/bank|statement|account|branch|address|telephone|email|website/i.test(line)) return false;
    if ((lineFrequency.get(line) || 0) > 2) return false;
    if (line.length < 3) return false;
    return true;
  });

  return cleanedLines.join('\n').replace(/\s{2,}/g, ' ').trim();
}
