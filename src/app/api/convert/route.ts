// src/app/api/convert/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { processFilesBatch } from '@/services/batch-processor';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];

    if (files.length > 10) {
      return NextResponse.json({ error: 'Maximum 10 files allowed' }, { status: 400 });
    }

    // Process the files and get success/failure data
    const { success, failed } = await processFilesBatch(files);

    // Return the JSON response for UI preview
    return NextResponse.json({
      transactions: success,
      summary: {
        successCount: success.length,
        failedCount: failed.length,
        failedFiles: failed,
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
  }
}
