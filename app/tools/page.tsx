import Link from "next/link";

const TOOLS = [
  {
    href: "/tools/vsix-downloader",
    name: "VS Code extension downloader",
    description: "Download .vsix files from Marketplace URLs",
  },
  {
    href: "/tools/compliment",
    name: "Compliment generator",
    description: "Random compliments, for science",
  },
  {
    href: "/tools/ocr-preprocess",
    name: "OCR pre-processor",
    description: "Blur → dilate → invert → threshold for Tesseract",
  },
  {
    href: "/tools/bulk-download",
    name: "Bulk file downloader",
    description: "Comma-separated URLs → numbered downloads",
  },
];

export default function ToolsIndexPage() {
  return (
    <main className="flex min-h-svh flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">tools</h1>
      <p className="text-muted-foreground">Tiny utilities, right in this app.</p>
      <ul className="grid w-full max-w-2xl gap-3">
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link
              href={t.href}
              className="block rounded-xl border p-4 transition hover:bg-accent"
            >
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.description}</div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
