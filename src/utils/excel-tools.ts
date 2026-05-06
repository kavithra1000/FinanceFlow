// src/utils/excel-tools.ts
import * as XLSX from 'xlsx';
import type { TransactionRow } from '@/types/transaction';

export function createExcelBuffer(data: TransactionRow[]): Buffer {
  // Use explicit headers to ensure consistent column ordering
  const worksheet = XLSX.utils.json_to_sheet(data, {
    header: ['date', 'description', 'debit', 'credit', 'balance']
  });

  // Set explicit column widths to prevent #### issue in Excel
  // wch is 'width in characters'
  worksheet['!cols'] = [
    { wch: 12 }, // Date (YYYY-MM-DD fits in 10-12)
    { wch: 45 }, // Description (Longer for bank descriptions)
    { wch: 12 }, // Debit
    { wch: 12 }, // Credit
    { wch: 15 }, // Balance
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bank Transactions');

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

export function createCsvBuffer(data: TransactionRow[]): string {
  const worksheet = XLSX.utils.json_to_sheet(data, {
    header: ['date', 'description', 'debit', 'credit', 'balance']
  });
  
  const csv = XLSX.utils.sheet_to_csv(worksheet);
  
  // Add UTF-8 BOM (Byte Order Mark) to help Excel recognize the file's encoding 
  // and handle types (like dates) more gracefully.
  return "\ufeff" + csv;
}
