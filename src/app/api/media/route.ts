import { NextRequest, NextResponse } from "next/server";
import { head } from "@vercel/blob";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    const blob = await head(pathname);
    if (!blob) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Private blob — must stream through server, redirect won't work
    const response = await fetch(blob.url);
    const headers = new Headers();
    headers.set("Content-Type", blob.contentType || "application/octet-stream");
    headers.set("Content-Length", String(blob.size));
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("Accept-Ranges", "bytes");

    // Handle video range requests
    const range = request.headers.get("range");
    if (range && blob.contentType?.startsWith("video/")) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : blob.size - 1;
      const chunkSize = end - start + 1;

      const rangeRes = await fetch(blob.url, { headers: { Range: `bytes=${start}-${end}` } });
      const rangeHeaders = new Headers(rangeRes.headers);
      rangeHeaders.set("Content-Range", `bytes ${start}-${end}/${blob.size}`);
      rangeHeaders.set("Accept-Ranges", "bytes");
      rangeHeaders.set("Content-Length", String(chunkSize));
      rangeHeaders.set("Cache-Control", "public, max-age=31536000, immutable");

      return new NextResponse(rangeRes.body, { status: 206, headers: rangeHeaders });
    }

    return new NextResponse(response.body, { status: 200, headers });
  } catch (error) {
    console.error("Blob media error:", error);
    return NextResponse.json({ error: "Failed to load media" }, { status: 500 });
  }
}
