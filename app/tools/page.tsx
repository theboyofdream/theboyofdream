import Link from "next/link";

// Each tool keeps its own personality — this page is a "shelf" showing
// each with a swatch of its true colors.
const TOOLS = [
  { href: "/tools/vsix-downloader", name: "vsix-downloader", desc: "Marketplace → .vsix, sideload it", swatch: "bg-[#007acc]", glyph: "↓" },
  { href: "/tools/compliment", name: "Compliment Generator", desc: "Random compliments, for science", swatch: "bg-[#B23A48]", glyph: "❝" },
  { href: "/tools/ocr-preprocess", name: "OCR pre-processor", desc: "Blur→dilate→invert→threshold for tesseract", swatch: "bg-[#15803d]", glyph: "▤" },
  { href: "/tools/bulk-download", name: "bulk-dl", desc: "Comma-separated URLs → numbered downloads", swatch: "bg-[#22C55E]", glyph: "█" },
  { href: "/tools/tiny-utilities", name: "tiny-utilities", desc: "Win32-native Windows productivity suite", swatch: "bg-[#008080]", glyph: "T" },
  { href: "/tools/komorebi", name: "komorebi-lab", desc: "toolcraft playground — canvas, state, renderer", swatch: "bg-violet-500", glyph: "木" },
];

export default function ToolsIndexPage() {
  return (
    <main className="flex min-h-svh flex-col items-center gap-8 bg-[#101418] p-6 text-[#e6e1d5]">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold">tools</h1>
        <p className="mt-1 text-sm text-[#8b8578]">tiny utilities, each in its own skin.</p>
      </div>
      <ul className="grid w-full max-w-3xl gap-3 sm:grid-cols-2">
        {TOOLS.map((t) => (
          <li key={t.href}>
            <Link href={t.href} className="group flex items-center gap-4 rounded-lg border border-[#23282e] bg-[#161b22] p-4 transition hover:border-[#3a414c]">
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md text-xl font-bold text-black/80 ${t.swatch}`}>{t.glyph}</span>
              <span>
                <span className="block font-semibold group-hover:underline">{t.name}</span>
                <span className="block text-xs text-[#8b8578]">{t.desc}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
