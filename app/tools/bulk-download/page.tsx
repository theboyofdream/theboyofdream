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
    setNote(
      list.length === 0
        ? "No valid URLs found (one per comma or line, http/https only)."
        : `${list.length} link${list.length > 1 ? "s" : ""} ready.`
    );
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
    setNote(
      "Triggered downloads (browser may block mass downloads — allow them if prompted). CORS-protected files can’t be fetched cross-origin; these use direct links instead."
    );
  }

  return (
    <main className="flex min-h-svh flex-col items-center gap-4 p-6">
      <Link href="/tools" className="self-start text-sm text-muted-foreground hover:underline">
        ← tools
      </Link>
      <h1 className="text-3xl font-bold">Bulk file downloader</h1>
      <p className="max-w-xl text-center text-muted-foreground">
        Paste comma-separated URLs → get a numbered download list, or fire them all.
      </p>
      <textarea
        value={raw}
        onChange={(e) => setRaw(e.target.value)}
        rows={6}
        className="w-full max-w-xl rounded-lg border bg-background p-3 font-mono text-sm outline-none focus:ring-2"
        placeholder="https://example.com/a.pdf, https://example.com/b.zip"
      />
      <div className="flex gap-3">
        <button type="button" onClick={buildList} className="rounded-lg border px-4 py-2 hover:bg-accent">
          Build list
        </button>
        <button
          type="button"
          onClick={downloadAll}
          disabled={urls.length === 0}
          className="rounded-lg border bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          Download all
        </button>
      </div>
      {note && <p className="text-sm text-muted-foreground">{note}</p>}
      {urls.length > 0 && (
        <ol className="w-full max-w-xl list-decimal space-y-1 pl-6 text-sm">
          {urls.map((url, i) => (
            <li key={i}>
              <a href={url} download={fileNameFor(url, i)} className="break-all underline">
                {fileNameFor(url, i)}
              </a>
            </li>
          ))}
        </ol>
      )}
    </main>
  );
}
