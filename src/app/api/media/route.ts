import { NextRequest, NextResponse } from "next/server";
import { head } from "@vercel/blob";

export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  try {
    // Get blob metadata and serve via signed URL with caching
    const blob = await head(pathname);
    if (!blob) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Fetch the actual blob content
    const response = await fetch(blob.url);
    const headers = new Headers(response.headers);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    headers.set("Access-Control-Allow-Origin", "*");

    // For videos, we need to handle range requests
    const rangeHeader = request.headers.get("range");
    if (rangeHeader && blob.contentType?.startsWith("video/")) {
      const contentLength = parseInt(headers.get("content-length") || "0");
      const parts = rangeHeader.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : contentLength - 1;
      const chunkSize = end - start + 1;

      const rangeResponse = await fetch(blob.url, {
        headers: { Range: `bytes=${start}-${end}` },
      });
      const rangeHeaders = new Headers(rangeResponse.headers);
      rangeHeaders.set("Content-Range", `bytes ${start}-${end}/${contentLength}`);
      rangeHeaders.set("Accept-Ranges", "bytes");
      rangeHeaders.set("Content-Length", String(chunkSize));
      rangeHeaders.set("Cache-Control", "public, max-age=31536000, immutable");
      rangeHeaders.set("Access-Control-Allow-Origin", "*");

      return new NextResponse(rangeResponse.body, {
        status: 206,
        headers: rangeHeaders,
      });
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Blob media error:", error);
    return NextResponse.json({ error: "Failed to load media" }, { status: 500 });
  }
}
