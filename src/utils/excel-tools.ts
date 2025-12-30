// src/utils/excel-tools.ts
import * as XLSX from 'xlsx';
import type { TransactionRow } from '@/types/transaction';

export function createExcelBuffer(data: TransactionRow[]): Buffer {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Bank Transactions');

  return XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}
