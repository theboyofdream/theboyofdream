import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

const REPO_DOCS = process.env.TINY_UTILITIES_REPO
  ? path.join(process.env.TINY_UTILITIES_REPO, "docs", "tools")
  : "D:/tiny-utilities/docs/tools";
const RAW_BASE = "https://raw.githubusercontent.com/theboyofdream/tiny-utilities/main/docs/tools";

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return NextResponse.json({ error: "Invalid tool slug" }, { status: 400 });
  }

  // Prefer the local clone (always in sync while developing), fall back to GitHub raw.
  try {
    const md = await readFile(path.join(REPO_DOCS, `${slug}.md`), "utf8");
    return new NextResponse(md, { headers: { "content-type": "text/markdown; charset=utf-8" } });
  } catch {
    const res = await fetch(`${RAW_BASE}/${slug}.md`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Doc not found" }, { status: 404 });
    }
    return new NextResponse(await res.text(), { headers: { "content-type": "text/markdown; charset=utf-8" } });
  }
}
