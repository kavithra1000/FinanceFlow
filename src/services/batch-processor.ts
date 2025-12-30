// src/services/batch-processor.ts
import { extractTextFromBuffer } from '@/utils/pdf-tools';
import { cleanExtractedText } from '@/utils/clean-text';
import { getStructuredData } from './ai-service';
import type { TransactionRow } from '@/types/transaction';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function processFilesBatch(files: File[]): Promise<TransactionRow[]> {
  const allTransactions: TransactionRow[] = [];

  for (const [index, file] of files.entries()) {
    try {
      console.log(`Processing ${file.name} (${index + 1}/${files.length})`);
      
      const buffer = Buffer.from(await file.arrayBuffer());
      const rawText = await extractTextFromBuffer(buffer);
      const cleanedText = cleanExtractedText(rawText);
      const transactions = await getStructuredData(cleanedText);

      // Validate
      const valid = transactions
        .filter(tx => tx.date && tx.description && (typeof tx.debit === 'number' || typeof tx.credit === 'number'))
        .map(tx => ({
          date: tx.date.trim(),
          description: tx.description.trim(),
          debit: tx.debit ?? undefined,
          credit: tx.credit ?? undefined,
          balance: tx.balance ?? undefined,
        }));

      allTransactions.push(...valid);
      if (index < files.length - 1) await delay(1500);

    } catch (error) {
      console.error(`Failed ${file.name}`, error);
    }
  }

  return allTransactions;
}
