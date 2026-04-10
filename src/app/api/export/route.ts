// src/app/api/export/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createExcelBuffer } from '@/utils/excel-tools';
import type { TransactionRow } from '@/stores/useResultStore';

export async function POST(req: NextRequest) {
  try {
    const transactions = await req.json() as TransactionRow[];

    if (!transactions || transactions.length === 0) {
      return NextResponse.json({ error: 'No data to export' }, { status: 400 });
    }

    // Generate the Excel buffer
    const excelBuffer = createExcelBuffer(transactions);
    const excelBytes = new Uint8Array(excelBuffer);

    return new Response(excelBytes, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="statements.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  } catch (error: unknown) {
    console.error('Export Error:', error);
    return NextResponse.json({ error: 'Failed to generate Excel file' }, { status: 500 });
  }
}
