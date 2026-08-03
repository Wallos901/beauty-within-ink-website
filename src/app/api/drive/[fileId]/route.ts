import { NextRequest, NextResponse } from "next/server";
import { getDriveImageStream } from "@/lib/drive";

// Cache images for 1 hour on the CDN / browser
const CACHE_CONTROL = "public, max-age=3600, stale-while-revalidate=86400";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> },
) {
  const { fileId } = await params;

  if (!fileId || !/^[a-zA-Z0-9_-]+$/.test(fileId)) {
    return NextResponse.json({ error: "Invalid file ID." }, { status: 400 });
  }

  try {
    const { stream, contentType } = await getDriveImageStream(fileId);

    // Buffer the Node.js stream fully before responding — avoids
    // Web ReadableStream bridge issues in the Next.js runtime.
    const chunks: Buffer[] = [];
    for await (const chunk of stream as AsyncIterable<Buffer>) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    const buffer = Buffer.concat(chunks);

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": CACHE_CONTROL,
      },
    });
  } catch (err) {
    console.error("[drive/image] error fetching file:", err);
    return NextResponse.json(
      { error: "Could not retrieve image." },
      { status: 500 },
    );
  }
}
