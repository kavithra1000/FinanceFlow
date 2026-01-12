// src/app/api/convert/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { processFilesBatch } from '@/services/batch-processor';
import { createExcelBuffer } from '@/utils/excel-tools';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (files.length > 10) {
      return NextResponse.json({ error: 'Maximum 10 files allowed' }, { status: 400 });
    }

    // Process the files and get success/failure data
    const { success, failed } = await processFilesBatch(files);

    // Generate the Excel buffer for successful data
    const excelBuffer = createExcelBuffer(success);
    const excelBytes = new Uint8Array(excelBuffer); // Convert to Excel bytes

    // Return the Excel file along with a summary of successful and failed files
    return new Response(excelBytes, {
      status: 200,
      headers: {
        'Content-Disposition': 'attachment; filename="statements.xlsx"',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'X-Success-Count': success.length.toString(),
        'X-Failed-Count': failed.length.toString(),
        'X-Failed-Files': JSON.stringify(failed), // You can also send a JSON string of failed files here if needed
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
