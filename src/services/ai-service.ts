// src/services/ai-service.ts
import { GoogleGenAI } from '@google/genai';
import type { TransactionRow } from '@/types/transaction';

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

export async function getStructuredData(rawText: string, retryCount = 0): Promise<TransactionRow[]> {
  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: [{
        role: 'user',
        parts: [{
          text: `You are a bank statement parser. Extract transactions into a JSON array.
                 Rules:
                 1. Return ONLY a JSON object with key "transactions".
                 2. Each transaction: {"date": "YYYY-MM-DD", "description": "text", "debit": number, "credit": number, "balance": number}.
                 3. Use 0 if a debit or credit value is missing.
                 4. Text: ${rawText}`
        }]
      }],
      config: {
        // Updated to camelCase for the latest 2025 SDK
        responseMimeType: 'application/json',
      }
    });

    // The SDK provides the .text property directly on the response
    const outputText = response.text;
    
    if (!outputText) {
      throw new Error("AI returned no content");
    }

    const parsed = JSON.parse(outputText);
    
    // Safety check to ensure we return an array
    return (parsed.transactions as TransactionRow[]) || [];

  } catch (error: unknown) {
    if (error && typeof error === 'object') {
      const err = error as { status?: number; message?: string };

      if (err.status === 429 && retryCount < 3) {
        const waitTime = Math.pow(2, retryCount) * 2000;
        console.log(`[Quota] Rate limit hit. Retrying in ${waitTime / 1000}s...`);
        await new Promise(res => setTimeout(res, waitTime));
        return getStructuredData(rawText, retryCount + 1);
      }
    }
    
    console.error('Gemini Error:', error);
    throw new Error('Failed to parse bank data. Check console for details.');
  }
}