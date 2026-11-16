"use client";

import { useState } from "react";
import Link from "next/link";

type Status = "idle" | "working" | "error" | "success";

export default function VsixDownloaderPage() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function getVsixDownloadLink(publisher: string, name: string) {
    const res = await fetch(
      "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json;api-version=3.0-preview.1",
        },
        body: JSON.stringify({
          filters: [{ criteria: [{ filterType: 7, value: `${publisher}.${name}` }] }],
          flags: 0x1bf,
        }),
      }
    );
    const data = await res.json();
    const ext = data.results?.[0]?.extensions?.[0];
    if (!ext) throw new Error("Extension not found");
    const vsixAsset = ext.versions?.[0]?.files?.find(
      (f: { assetType: string }) =>
        f.assetType === "Microsoft.VisualStudio.Services.VSIXPackage"
    );
    if (!vsixAsset) throw new Error("No .vsix asset found");
    return vsixAsset.source as string;
  }

  async function downloadFile(url: string, filename: string) {
    const res = await fetch(url);
    if (!res.ok) return false;
    const blobUrl = URL.createObjectURL(await res.blob());
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(blobUrl);
    return true;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "working") return;
    const match = url.match(/itemName=([^&]+)/);
    if (!match) {
      setStatus("error");
      setMessage("✗ Invalid Marketplace URL — expected itemName=<publisher>.<name>");
      return;
    }
    const [publisher, name] = match[1].split(".");
    setStatus("working");
    setMessage("resolving…");
    try {
      const direct = `https://ms-vscode.gallery.vsassets.io/_apis/public/gallery/publisher/${publisher}/extension/${name}/latest/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`;
      const ok = await downloadFile(direct, `${name}.vsix`);
      if (!ok) {
        const apiUrl = await getVsixDownloadLink(publisher, name);
        await downloadFile(apiUrl, `${name}.vsix`);
      }
      setStatus("success");
      setMessage(`✓ ${name}.vsix — downloading`);
    } catch {
      setStatus("error");
      setMessage("✗ Couldn’t fetch the .vsix — check the URL.");
    }
  }

  return (
    // VS Code panel personality: #1e1e1e canvas, #007acc brand, Segoe-ish mono
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 bg-[#1e1e1e] p-6 text-[#cccccc]">
      <Link href="/tools" className="self-start text-xs text-[#6e6e6e] hover:text-[#cccccc] hover:underline">← tools</Link>

      <div className="flex w-full max-w-md flex-col gap-3 border border-[#3c3c3c] bg-[#252526] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <div className="flex items-baseline justify-between border-b border-[#3c3c3c] pb-2">
          <h1 className="flex items-center gap-2 text-base font-semibold text-[#e8e8e8]">
            <span className="inline-block h-3 w-3 border border-[#007acc] bg-[#007acc]" aria-hidden />
            vsix-downloader
          </h1>
          <a href="https://github.com/theboyofdream/vsix-downloader" target="_blank" rel="noreferrer" className="text-[11px] text-[#4fc1ff] hover:underline">github ↗</a>
        </div>
        <p className="text-xs text-[#9cdcfe]">Paste a VS Marketplace link. Get the .vsix. Sideload it.</p>
        <form onSubmit={onSubmit} className="flex flex-col gap-2">
          <input
            type="url"
            required
            autoFocus
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja"
            className="border border-[#3c3c3c] bg-[#1e1e1e] px-3 py-2 font-mono text-xs text-[#d4d4d4] outline-none placeholder:text-[#5a5a5a] focus:border-[#007acc]"
          />
          <button
            type="submit"
            disabled={status === "working"}
            className="flex items-center justify-center gap-2 bg-[#007acc] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1187cc] disabled:opacity-60"
          >
            {status === "working" ? (
              <>
                <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                working…
              </>
            ) : (
              "↓ DOWNLOAD"
            )}
          </button>
        </form>
        {message && (
          <p role="status" className={
            status === "error" ? "font-mono text-xs text-[#f48771]" : status === "success" ? "font-mono text-xs text-[#4ec9b0]" : "font-mono text-xs text-[#d7ba7d]"
          }>
            {message}
          </p>
        )}
        <p className="border-t border-[#3c3c3c] pt-2 text-[10px] text-[#6e6e6e]">
          Install: <code className="text-[#ce9178]">code --install-extension x.vsix</code>
        </p>
      </div>
    </main>
  );
}
