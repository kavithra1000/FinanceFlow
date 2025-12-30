import { extractText } from 'unpdf';

/**
 * Extracts text from a PDF buffer and formats it with page headers.
 * Uses unpdf for native ESM/TypeScript support.
 */
export async function extractTextFromBuffer(
  fileBuffer: Buffer | Uint8Array
): Promise<string> {
  try {
    // 1. unpdf prefers Uint8Array, but can handle Buffer in many environments.
    // Explicitly converting ensures compatibility.
    const data = new Uint8Array(fileBuffer);

    // 2. Setting mergePages to false returns an array of strings (one per page)
    const { text } = await extractText(data, { mergePages: false });

    // 3. Ensure we are treating 'text' as an array
    const pages = Array.isArray(text) ? text : [text];

    // 4. Map through pages to add headers and join them
    return pages
      .map((page, index) => `--- PAGE ${index + 1} ---\n${page.trim()}`)
      .join('\n\n');
      
  } catch (error) {
    // Cast error to provide helpful messages
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error extracting PDF text:', message);
    throw new Error(`Failed to extract text from PDF: ${message}`);
  }
}