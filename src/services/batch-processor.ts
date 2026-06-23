// src/services/batch-processor.ts
import { extractTextFromBuffer } from '@/utils/pdf-tools';
import { cleanExtractedText } from '@/utils/clean-text';
import { getStructuredData } from './ai-service';
import type { TransactionRow } from '@/types/transaction';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function processFilesBatch(files: File[]): Promise<{ success: TransactionRow[]; failed: { fileName: string; error: string }[] }> {
  const tasks = files.map(async (file) => {
    try {
      console.log(`Processing ${file.name}`);

      const buffer = Buffer.from(await file.arrayBuffer());
      const rawText = await extractTextFromBuffer(buffer);

      const cleanedText = cleanExtractedText(rawText);
      const transactions = await getStructuredData(cleanedText, buffer);

      // Validate and filter out any invalid transactions
      const valid = transactions
        .filter(tx => tx.date && tx.description && (typeof tx.debit === 'number' || typeof tx.credit === 'number'))
        .map(tx => ({
          date: tx.date.trim(),
          description: tx.description.trim(),
          debit: tx.debit ?? undefined,
          credit: tx.credit ?? undefined,
          balance: tx.balance ?? undefined,
        }));

      if (valid.length > 0) {
        return { type: 'success' as const, data: valid };
      } else {
        return {
          type: 'failed' as const,
          fileName: file.name,
          error: 'No valid transactions found in the file.',
        };
      }
    } catch (error) {
      console.error(`Failed ${file.name}`, error);
      return {
        type: 'failed' as const,
        fileName: file.name,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });

  const results = await Promise.all(tasks);

  const allTransactions: TransactionRow[] = [];
  const failedFiles: { fileName: string; error: string }[] = [];

  for (const res of results) {
    if (res.type === 'success') {
      allTransactions.push(...res.data);
    } else {
      failedFiles.push({
        fileName: res.fileName,
        error: res.error,
      });
    }
  }

  // Return both successful transactions and failed files with reasons
  return {
    success: allTransactions,
    failed: failedFiles,
  };
}

