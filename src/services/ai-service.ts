// src/services/ai-service.ts
import { GoogleGenAI } from '@google/genai';
import type { TransactionRow } from '@/types/transaction';

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!
});

const transactionSchema = {
  type: 'object',
  properties: {
    transactions: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          date: { type: 'string', description: 'The transaction date in YYYY-MM-DD format.' },
          description: { type: 'string', description: 'Details or description of the transaction.' },
          debit: { type: 'number', description: 'Debit amount (outgoing/withdrawn money). Set to 0 if none.' },
          credit: { type: 'number', description: 'Credit amount (incoming/deposited money). Set to 0 if none.' },
          balance: { type: 'number', description: 'Running balance after the transaction. Set to 0 if none.' },
        },
        required: ['date', 'description', 'debit', 'credit', 'balance'],
      },
    },
  },
  required: ['transactions'],
};

export async function getStructuredData(
  rawText: string,
  fileBuffer?: Buffer,
  retryCount = 0
): Promise<TransactionRow[]> {
  try {
    const parts: any[] = [
      {
        text: `You are a bank statement parser. Extract ALL transactions from the provided content into the requested schema.`
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
        responseJsonSchema: transactionSchema,
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