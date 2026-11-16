"use client";

import { useState } from "react";
import Link from "next/link";

export default function BulkDownloadPage() {
  const [raw, setRaw] = useState("");
  const [urls, setUrls] = useState<string[]>([]);
  const [note, setNote] = useState("");

  function parseInput(value: string): string[] {
    return value
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => /^https?:\/\//i.test(s));
  }

  function buildList() {
    const list = parseInput(raw);
    setUrls(list);
    setNote(list.length === 0 ? "no valid URLs — one per comma or line, http(s) only" : `ok. ${list.length} link${list.length > 1 ? "s" : ""} queued`);
  }

  function fileNameFor(url: string, index: number) {
    try {
      const base = decodeURIComponent(
        new URL(url).pathname.split("/").filter(Boolean).pop() ?? "file"
      );
      return `${index + 1} ${base}`;
    } catch {
      return `${index + 1}-file`;
    }
  }

  function downloadAll() {
    urls.forEach((url, i) => {
      const a = document.createElement("a");
      a.href = url;
      a.download = fileNameFor(url, i);
      a.rel = "noopener";
      a.click();
    });
    setNote("fired. browser may block mass downloads — allow when prompted. CORS-locked files won't come through; these use direct links.");
  }

  return (
    // Terminal personality: near-black canvas, green phosphor, mono
    <main className="flex min-h-svh flex-col items-center gap-4 bg-[#0C0C0C] p-6 font-mono text-[#22C55E]">
      <Link href="/tools" className="self-start text-xs text-[#166534] hover:text-[#22C55E]">← tools</Link>

      <h1 className="text-2xl font-bold text-[#4ADE80] shadow-[0_0_18px_rgba(34,197,94,0.35)]">bulk-dl<span className="animate-pulse">█</span></h1>
      <p className="text-xs text-[#166534]">comma-separated URLs → numbered downloads</p>

      <textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={6}
        className="w-full max-w-2xl border border-[#14532D] bg-[#052E16] p-3 text-sm text-[#4ADE80] caret-[#22C55E] outline-none placeholder:text-[#166534] focus:border-[#22C55E]"
        placeholder="https://example.com/a.pdf, https://example.com/b.zip"
      />
      <div className="flex gap-2">
        <button type="button" onClick={buildList} className="border border-[#14532D] px-4 py-1.5 text-sm text-[#4ADE80] transition hover:bg-[#052E16]">[ build list ]</button>
        <button type="button" onClick={downloadAll} disabled={urls.length === 0} className="border border-[#22C55E] bg-[#14532D] px-4 py-1.5 text-sm text-[#4ADE80] transition hover:bg-[#166534] disabled:opacity-30">[ download all ]</button>
      </div>
      {note && <p className="text-xs text-[#166534]">{'> '}{note}</p>}
      {urls.length > 0 && (
        <ol className="w-full max-w-2xl space-y-1 text-sm">
          {urls.map((url, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-[#166534]">{String(i + 1).padStart(2, "0")}.</span>
              <a href={url} download={fileNameFor(url, i)} className="break-all text-[#4ADE80] underline decoration-[#14532D] hover:text-[#86EFAC]">{fileNameFor(url, i)}</a>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
