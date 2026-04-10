// src/app/api/export/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createExcelBuffer, createCsvBuffer } from '@/utils/excel-tools';
import type { TransactionRow } from '@/stores/useResultStore';

export async function POST(req: NextRequest) {
  try {
    const { transactions, format = 'xlsx' } = await req.json() as { transactions: TransactionRow[], format: string };

    if (!transactions || transactions.length === 0) {
      return NextResponse.json({ error: 'No data to export' }, { status: 400 });
    }

    let response: Response;

    switch (format) {
      case 'csv': {
        const csvData = createCsvBuffer(transactions);
        response = new Response(csvData, {
          status: 200,
          headers: {
            'Content-Disposition': 'attachment; filename="statements.csv"',
            'Content-Type': 'text/csv',
          },
        });
        break;
      }
      case 'json': {
        const jsonData = JSON.stringify(transactions, null, 2);
        response = new Response(jsonData, {
          status: 200,
          headers: {
            'Content-Disposition': 'attachment; filename="statements.json"',
            'Content-Type': 'application/json',
          },
        });
        break;
      }
      case 'xlsx':
      default: {
        const excelBuffer = createExcelBuffer(transactions);
        const excelBytes = new Uint8Array(excelBuffer);
        response = new Response(excelBytes, {
          status: 200,
          headers: {
            'Content-Disposition': 'attachment; filename="statements.xlsx"',
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          },
        });
        break;
      }
    }

    return response;
  } catch (error: unknown) {
    console.error('Export Error:', error);
    return NextResponse.json({ error: 'Failed to generate export file' }, { status: 500 });
  }
}
