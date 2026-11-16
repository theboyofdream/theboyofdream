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
          filters: [
            {
              criteria: [{ filterType: 7, value: `${publisher}.${name}` }],
            },
          ],
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
      setMessage("Invalid Marketplace URL — expected itemName=<publisher>.<name>");
      return;
    }
    const [publisher, name] = match[1].split(".");
    setStatus("working");
    setMessage("Finding download link…");
    try {
      const direct = `https://ms-vscode.gallery.vsassets.io/_apis/public/gallery/publisher/${publisher}/extension/${name}/latest/assetbyname/Microsoft.VisualStudio.Services.VSIXPackage`;
      const ok = await downloadFile(direct, `${name}.vsix`);
      if (!ok) {
        const apiUrl = await getVsixDownloadLink(publisher, name);
        await downloadFile(apiUrl, `${name}.vsix`);
      }
      setStatus("success");
      setMessage("Download started.");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Couldn’t fetch the .vsix — check the URL and try again.");
    }
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-5 p-6">
      <Link href="/tools" className="text-sm text-muted-foreground hover:underline self-start ml-[max(0px,calc(50vw-22rem))]">
        ← tools
      </Link>
      <h1 className="text-3xl font-bold">VS Code extension downloader</h1>
      <p className="max-w-xl text-center text-muted-foreground">
        Paste a Marketplace extension link to download its <code>.vsix</code> —
        for manual/offline installs.
      </p>
      <form onSubmit={onSubmit} className="flex w-full max-w-xl flex-col gap-3">
        <input
          type="url"
          required
          autoFocus
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://marketplace.visualstudio.com/items?itemName=WallabyJs.console-ninja"
          className="w-full rounded-lg border bg-background px-4 py-2 outline-none focus:ring-2"
        />
        <button
          type="submit"
          disabled={status === "working"}
          className="rounded-lg border bg-primary px-4 py-2 text-primary-foreground transition disabled:opacity-60"
        >
          {status === "working" ? "Working…" : "Download"}
        </button>
      </form>
      {message && (
        <p
          role="status"
          className={
            status === "error"
              ? "text-destructive"
              : status === "success"
                ? "text-green-600"
                : "text-muted-foreground"
          }
        >
          {message}
        </p>
      )}
      <small className="max-w-xl text-center text-muted-foreground">
        Install manually with <code>code --install-extension &lt;file&gt;.vsix</code>.
      </small>
    </main>
  );
}
