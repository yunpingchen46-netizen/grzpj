import { list, put, del } from "@vercel/blob";

async function main() {
  const cmd = process.argv[2] || "list";

  if (cmd === "list") {
    const result = await list();
    console.log(result.blobs.length, "blobs");
    for (const b of result.blobs) console.log(" ", b.pathname, (b.size / 1024).toFixed(1) + "KB");
  } else if (cmd === "upload") {
    const file = process.argv[3];
    const pathname = process.argv[4];
    if (!file || !pathname) { console.log("usage: upload <file> <pathname>"); process.exit(1); }
    const { url } = await put(pathname, await import("fs").then(fs => fs.readFileSync(file)), { access: "public" });
    console.log("Uploaded:", pathname);
    console.log("URL:", url);
  } else if (cmd === "del") {
    await del(process.argv[3]);
    console.log("Deleted:", process.argv[3]);
  }
}

main().catch(e => { console.error("Error:", e.message); process.exit(1); });
