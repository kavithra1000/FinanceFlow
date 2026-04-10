// src/services/ai-service.ts
import { GoogleGenAI } from '@google/genai';
import type { TransactionRow } from '@/types/transaction';

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

export async function getStructuredData(
  rawText: string,
  fileBuffer?: Buffer,
  retryCount = 0
): Promise<TransactionRow[]> {
  try {
    const parts: any[] = [
      {
        text: `You are a bank statement parser. Extract ALL transactions into a JSON array.
               Rules:
               1. Return ONLY a JSON object with key "transactions".
               2. Each transaction: {"date": "YYYY-MM-DD", "description": "text", "debit": number, "credit": number, "balance": number}.
               3. Use 0 if a debit or credit value is missing.
               4. For scanned documents, use your visual capability to read the text accurately.`
      }
    ];

    // If text is poor or missing, and we have a buffer, use visual processing
    if (fileBuffer && rawText.length < 100) {
      parts.push({
        inlineData: {
          data: fileBuffer.toString('base64'),
          mimeType: 'application/pdf',
        },
      });
    } else {
      parts.push({ text: `Text Content:\n${rawText}` });
    }

    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-lite', // Highly optimized for multimodal extraction
      contents: [{
        role: 'user',
        parts: parts
      }],
      config: {
        responseMimeType: 'application/json',
      }
    });

    const outputText = response.text;
    
    if (!outputText) {
      throw new Error("AI returned no content");
    }

    const parsed = JSON.parse(outputText);
    return (parsed.transactions as TransactionRow[]) || [];

  } catch (error: unknown) {
    if (error && typeof error === 'object') {
      const err = error as { status?: number; message?: string };

      if (err.status === 429 && retryCount < 3) {
        const waitTime = Math.pow(2, retryCount) * 2000;
        console.log(`[Quota] Rate limit hit. Retrying in ${waitTime / 1000}s...`);
        await new Promise(res => setTimeout(res, waitTime));
        return getStructuredData(rawText, fileBuffer, retryCount + 1);
      }
    }
    
    console.error('Gemini Error:', error);
    throw new Error('Failed to parse bank data. Check console for details.');
  }
}