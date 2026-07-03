import { NextRequest, NextResponse } from "next/server";
import { head } from "@vercel/blob";

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

    // Redirect to the direct signed URL — much faster than proxying
    return NextResponse.redirect(blob.url, 302);
  } catch (error) {
    console.error("Blob media error:", error);
    return NextResponse.json({ error: "Failed to load media" }, { status: 500 });
  }
}
