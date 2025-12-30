// src/types/transaction.ts
export interface TransactionRow {
  date: string;          // or Date (string is safer for Excel)
  description: string;
  debit?: number;
  credit?: number;
  balance?: number;
}
