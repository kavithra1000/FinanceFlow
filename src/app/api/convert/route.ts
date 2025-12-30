// src/app/api/convert/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { processFilesBatch } from '@/services/batch-processor';
import { createExcelBuffer } from '@/utils/excel-tools';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    if (files.length > 10) return NextResponse.json({ error: 'Maximum 10 files allowed' }, { status: 400 });

    const allData = await processFilesBatch(files);
    const excelBuffer = createExcelBuffer(allData);
    const excelBytes = new Uint8Array(excelBuffer);

    return new Response(excelBytes, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="statements.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
