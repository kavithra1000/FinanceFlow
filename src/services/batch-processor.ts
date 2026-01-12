// src/services/batch-processor.ts
import { extractTextFromBuffer } from '@/utils/pdf-tools';
import { cleanExtractedText } from '@/utils/clean-text';
import { getStructuredData } from './ai-service';
import type { TransactionRow } from '@/types/transaction';
import { requiresOCR } from './ocr';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function processFilesBatch(files: File[]): Promise<{ success: TransactionRow[]; failed: { fileName: string; error: string }[] }> {
  const allTransactions: TransactionRow[] = [];
  const failedFiles: { fileName: string; error: string }[] = [];

  for (const [index, file] of files.entries()) {
    try {
      console.log(`Processing ${file.name} (${index + 1}/${files.length})`);

      const buffer = Buffer.from(await file.arrayBuffer());
      const rawText = await extractTextFromBuffer(buffer);

      if (requiresOCR(rawText)) {
        // If OCR is required, log the failure with a specific message
        failedFiles.push({
          fileName: file.name,
          error: 'OCR_NOT_SUPPORTED: This PDF appears to be scanned. OCR is not supported yet.',
        });
        continue; // Skip this file
      }

      const cleanedText = cleanExtractedText(rawText);
      const transactions = await getStructuredData(cleanedText);

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
        allTransactions.push(...valid); // Add to successful transactions
      } else {
        // If no valid transactions were found, mark as failure
        failedFiles.push({
          fileName: file.name,
          error: 'No valid transactions found in the file.',
        });
      }

      // Delay between processing files
      if (index < files.length - 1) await delay(1500);

    } catch (error) {
      console.error(`Failed ${file.name}`, error);
      // Log any unexpected errors with the file
      failedFiles.push({
        fileName: file.name,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Return both successful transactions and failed files with reasons
  return {
    success: allTransactions,
    failed: failedFiles,
  };
}

