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

    // Fetch blob content fully before responding
    const startTime = Date.now();
    const res = await fetch(blob.url);
    const buffer = await res.arrayBuffer();
    console.log(`[media] ${pathname}: fetched ${buffer.byteLength} bytes in ${Date.now() - startTime}ms`);

    const headers = new Headers();
    headers.set("Content-Type", blob.contentType || "application/octet-stream");
    headers.set("Content-Length", String(buffer.byteLength));
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    const range = request.headers.get("range");
    if (range && blob.contentType?.startsWith("video/")) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : buffer.byteLength - 1;
      const sliced = buffer.slice(start, end + 1);

      const rangeHeaders = new Headers();
      rangeHeaders.set("Content-Type", blob.contentType);
      rangeHeaders.set("Content-Range", `bytes ${start}-${end}/${buffer.byteLength}`);
      rangeHeaders.set("Content-Length", String(sliced.byteLength));
      rangeHeaders.set("Accept-Ranges", "bytes");
      rangeHeaders.set("Cache-Control", "public, max-age=31536000, immutable");

      return new NextResponse(sliced, { status: 206, headers: rangeHeaders });
    }

    return new NextResponse(buffer, { status: 200, headers });
  } catch (error) {
    console.error("Blob media error:", error);
    return NextResponse.json({ error: "Failed to load media" }, { status: 500 });
  }
}
