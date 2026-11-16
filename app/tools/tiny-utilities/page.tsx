"use client";

import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { Markdown } from "@/components/tiny-utilities-markdown";

const REPO = "https://github.com/theboyofdream/tiny-utilities";

const TOOLS = [
  { name: "Pin to Top", binary: "pin-to-top.exe", type: "GUI", description: "Toggle topmost for the active window — wallpaper accent-colored border overlay + interactive window picker.", docs: `${REPO}/blob/main/docs/tools/pin-to-top.md` },
  { name: "Window Switcher", binary: "window-switcher.exe", type: "GUI", description: "Live thumbnail Alt+Tab replacement — 1-key direct jump hints, no visual hunting.", docs: `${REPO}/blob/main/docs/tools/window-switcher.md` },
  { name: "Find My Mouse", binary: "find-my-mouse.exe", type: "GUI", description: "High-visibility cursor locator — pulse-in/out disc centered on the pointer.", docs: `${REPO}/blob/main/docs/tools/find-my-mouse.md` },
  { name: "Mouse Spotlight", binary: "mouse-spotlight.exe", type: "GUI", description: "Dims the desktop for presentations, leaving an anti-aliased spotlight hole on the cursor.", docs: `${REPO}/blob/main/docs/tools/mouse-spotlight.md` },
  { name: "Color Picker", binary: "color-picker.exe", type: "GUI", description: "Floating magnifier with live HEX / RGB / HSL / CMYK — 1-key clipboard copy.", docs: `${REPO}/blob/main/docs/tools/color-picker.md` },
  { name: "Screen Capture", binary: "capture.exe", type: "GUI", description: "Screenshot suite — Snip, Window and Fullscreen modes + doodle annotation canvas.", docs: `${REPO}/blob/main/docs/tools/capture.md` },
  { name: "Pixel View", binary: "pixel-view.exe", type: "GUI", description: "Frameless image & animated GIF viewer with chunky nearest-neighbor pixel rendering.", docs: `${REPO}/blob/main/docs/tools/pixel-view.md` },
  { name: "IP Send", binary: "ip-send.exe", type: "GUI", description: "ASCII TUI payload composer with search, wrap and drag-and-drop — for IP Messenger LANs.", docs: `${REPO}/blob/main/docs/tools/ip-send.md` },
  { name: "Context Menu Manager", binary: "context-menu.exe", type: "GUI / CLI", description: "Cascading Explorer context-menu registry utility with XML backup/update. (Experimental)", docs: `${REPO}/blob/main/docs/tools/context-menu.md` },
  { name: "OCR Utility", binary: "ocr.exe", type: "GUI / CLI", description: "Zero-install OCR via Tesseract — auto language download, clipboard copy.", docs: `${REPO}/blob/main/docs/tools/ocr.md` },
  { name: "Command Manager", binary: "cmdx.ps1", type: "CLI", description: "PowerShell command dispatcher — .cmd/.ps1 dual-shims registered in User PATH.", docs: `${REPO}/blob/main/docs/tools/cmdx.md` },
];

const HOTKEYS = [
  ["Alt + Tab", "window-switcher", "Live thumbnail Alt+Tab replacement with 1-letter hint jumping"],
  ["Double-Tap Ctrl", "mouse-spotlight", "Dim screen, spotlight cursor — locator or meeting focus"],
  ["Win + Ctrl + T", "pin-to-top", "Pin / unpin active window topmost with accent border"],
  ["Win + Ctrl + O", "capture + ocr", "Snip → OCR: copy extracted text to clipboard"],
  ["Win + Ctrl + C", "color-picker", "Floating magnifier, 1-key Hex/RGB clipboard copy"],
  ["PrintScreen", "capture", "Fullscreen screenshot with doodle canvas"],
  ["Ctrl + PrintScreen", "capture", "Rectangular region snip + annotate"],
  ["Alt + I", "ip-send", "Quick LAN IP Messenger composer (requires IP Messenger)"],
];

type ThemeKey = "win95" | "winxp" | "win7" | "win8" | "win10" | "win11";

type Theme = {
  label: string;
  font: string;
  desktop: string;
  textOnDesktop: string;
  window: CSSProperties;
  titleBar: CSSProperties;
  titleText: CSSProperties;
  titleIcon: CSSProperties;
  body: CSSProperties;
  card: CSSProperties;
  cardBorder: string;
  accent: string;
  accentText: string;
  button: CSSProperties;
  buttonHoverBg: string;
  heading: string;
  subtle: string;
  code: string;
  kbd: CSSProperties;
  divider: string;
  badge: CSSProperties;
  input: CSSProperties;
};

const RAISED: CSSProperties = {
  border: "2px solid",
  borderColor: "#DFDFDF #0A0A0A #0A0A0A #DFDFDF",
};

const THEMES: Record<ThemeKey, Theme> = {
  win95: {
    label: "Windows 95",
    font: "'Courier New', monospace",
    desktop: "#008080",
    textOnDesktop: "#ffffff",
    window: { ...RAISED, background: "#C0C0C0", boxShadow: "2px 2px 10px rgba(0,0,0,0.5)", borderRadius: 0 },
    titleBar: { background: "#000080" },
    titleText: { color: "#ffffff", fontWeight: 700 },
    titleIcon: { background: "#C0C0C0", border: "1px solid #fff", color: "#000" },
    body: { background: "#C0C0C0", color: "#000" },
    card: { background: "#C0C0C0", ...RAISED, boxShadow: "1px 1px 4px rgba(0,0,0,0.4)", borderRadius: 0 },
    cardBorder: "#808080",
    accent: "#000080",
    accentText: "#ffffff",
    button: { ...RAISED, background: "#C0C0C0", color: "#000", borderRadius: 0 },
    buttonHoverBg: "#D4D4D4",
    heading: "#000000",
    subtle: "#444444",
    code: "#000080",
    kbd: { background: "#ffffff", border: "1px solid #808080", color: "#000", borderRadius: 0 },
    divider: "#808080",
    badge: { background: "#008080", border: "1px solid #808080", color: "#fff", borderRadius: 0 },
    input: { background: "#ffffff", border: "2px solid", borderColor: "#808080 #fff #fff #808080", color: "#000", borderRadius: 0 },
  },
  winxp: {
    label: "Windows XP",
    font: "Tahoma, 'Segoe UI', sans-serif",
    desktop: "url('/wallpapers/winxp.jpg') center/cover no-repeat, linear-gradient(180deg, #1B5FC1 0%, #3E7BD6 30%, #6FA8DC 52%, #8FCB6B 62%, #4E9A3F 78%, #2E6B24 100%)",
    textOnDesktop: "#ffffff",
    window: { background: "#ECE9D8", border: "1px solid #0831D9", borderRadius: "8px 8px 4px 4px", boxShadow: "2px 4px 18px rgba(0,20,60,0.55)", overflow: "hidden" },
    titleBar: { background: "linear-gradient(180deg, #0997FF 0%, #0053EE 8%, #0050EE 40%, #06F 88%, #003ED9 93%, #0035C7 100%)" },
    titleText: { color: "#ffffff", fontWeight: 700, textShadow: "1px 1px 2px rgba(0,0,40,0.8)" },
    titleIcon: { background: "#ffffff", border: "1px solid #0831D9", color: "#0053EE", borderRadius: 2 },
    body: { background: "#ECE9D8", color: "#000" },
    card: { background: "#FFFFFF", border: "1px solid #ACA899", borderRadius: "4px", boxShadow: "1px 1px 3px rgba(0,0,0,0.25)" },
    cardBorder: "#D6D3C6",
    accent: "#0054E3",
    accentText: "#ffffff",
    button: { background: "linear-gradient(180deg, #FFFFFF 0%, #ECEBE5 86%, #D8D0C4 100%)", border: "1px solid #003C74", color: "#000", borderRadius: "4px", boxShadow: "inset 0 0 0 1px #F1EFE2" },
    buttonHoverBg: "#F5F4EC",
    heading: "#00309C",
    subtle: "#4A4A3C",
    code: "#0054E3",
    kbd: { background: "#FFFFFF", border: "1px solid #ACA899", borderBottom: "2px solid #716F64", color: "#000", borderRadius: 3 },
    divider: "#D6D3C6",
    badge: { background: "#3B8AE4", border: "1px solid #1558B0", color: "#fff", borderRadius: 8 },
    input: { background: "#ffffff", border: "1px solid #7F9DB9", color: "#000", borderRadius: 0 },
  },
  win7: {
    label: "Windows 7",
    font: "'Segoe UI', Tahoma, sans-serif",
    desktop: "url('/wallpapers/win7.jpg') center/cover no-repeat, radial-gradient(ellipse at 70% 15%, #5A9BD5 0%, #2C5B8A 40%, #0F2A44 100%)",
    textOnDesktop: "#ffffff",
    window: { background: "rgba(240,245,250,0.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(10,40,70,0.7)", borderRadius: "8px", boxShadow: "0 0 0 1px rgba(255,255,255,0.5) inset, 0 6px 28px rgba(0,0,0,0.55)", overflow: "hidden" },
    titleBar: { background: "linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(210,225,240,0.35) 45%, rgba(160,185,210,0.35) 55%, rgba(200,215,235,0.5) 100%)" },
    titleText: { color: "#1E3A52", fontWeight: 600, textShadow: "0 1px 1px rgba(255,255,255,0.9)" },
    titleIcon: { background: "rgba(255,255,255,0.75)", border: "1px solid rgba(30,58,82,0.5)", color: "#1E3A52", borderRadius: "3px" },
    body: { background: "rgba(255,255,255,0.55)", color: "#1E3A52" },
    card: { background: "rgba(255,255,255,0.72)", border: "1px solid rgba(30,58,82,0.35)", borderRadius: "6px", boxShadow: "0 1px 3px rgba(0,20,40,0.25), inset 0 1px 0 rgba(255,255,255,0.9)" },
    cardBorder: "rgba(30,58,82,0.3)",
    accent: "#2B628B",
    accentText: "#ffffff",
    button: { background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(225,235,245,0.85) 50%, rgba(200,215,230,0.9) 100%)", border: "1px solid #2B628B", color: "#16324A", borderRadius: "4px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9)" },
    buttonHoverBg: "#EAF3FA",
    heading: "#1E3A52",
    subtle: "#3D5A76",
    code: "#2B628B",
    kbd: { background: "rgba(255,255,255,0.85)", border: "1px solid #9DB3C8", borderBottom: "2px solid #6E8CA6", color: "#16324A", borderRadius: 4 },
    divider: "rgba(30,58,82,0.3)",
    badge: { background: "linear-gradient(180deg,#7FA8C9,#3E6B8F)", border: "1px solid #24455F", color: "#fff", borderRadius: 10 },
    input: { background: "rgba(255,255,255,0.9)", border: "1px solid #7A9CBE", color: "#16324A", borderRadius: 3 },
  },
  win8: {
    label: "Windows 8",
    font: "'Segoe UI', sans-serif",
    desktop: "radial-gradient(circle at 50% 40%, #3FC0FF 0%, #0FA3E8 45%, #0078C8 100%)",
    textOnDesktop: "#ffffff",
    window: { background: "#FFFFFF", border: "none", borderRadius: 0, boxShadow: "0 0 0 2px #1BA1E2, 0 8px 30px rgba(0,0,0,0.4)" },
    titleBar: { background: "#FFFFFF" },
    titleText: { color: "#000000", fontWeight: 300 },
    titleIcon: { background: "#1BA1E2", border: "none", color: "#ffffff", borderRadius: 0 },
    body: { background: "#FFFFFF", color: "#000" },
    card: { background: "#F2F2F2", border: "none", borderLeft: "4px solid #1BA1E2", borderRadius: 0, boxShadow: "none" },
    cardBorder: "#E0E0E0",
    accent: "#1BA1E2",
    accentText: "#ffffff",
    button: { background: "#1BA1E2", border: "none", color: "#ffffff", borderRadius: 0, fontWeight: 600 },
    buttonHoverBg: "#3AB4EC",
    heading: "#000000",
    subtle: "#444444",
    code: "#1BA1E2",
    kbd: { background: "#F2F2F2", border: "1px solid #CCCCCC", color: "#000", borderRadius: 0 },
    divider: "#E0E0E0",
    badge: { background: "#00A3EE", border: "none", color: "#fff", borderRadius: 0 },
    input: { background: "#ffffff", border: "2px solid #1BA1E2", color: "#000", borderRadius: 0 },
  },
  win10: {
    label: "Windows 10",
    font: "'Segoe UI', sans-serif",
    desktop: "url('/wallpapers/win10.jpg') center/cover no-repeat, radial-gradient(ellipse 60% 90% at 50% 0%, rgba(140,220,255,0.9) 0%, rgba(60,140,220,0.35) 35%, transparent 70%), linear-gradient(180deg, #0E3054 0%, #14497B 55%, #0A2440 100%)",
    textOnDesktop: "#ffffff",
    window: { background: "#FFFFFF", border: "1px solid #005A9E", borderRadius: 0, boxShadow: "0 4px 24px rgba(0,0,0,0.45)" },
    titleBar: { background: "#FFFFFF", borderBottom: "1px solid #E5E5E5" },
    titleText: { color: "#000000", fontWeight: 400 },
    titleIcon: { background: "#0078D7", border: "none", color: "#ffffff", borderRadius: 0 },
    body: { background: "#FFFFFF", color: "#1B1B1B" },
    card: { background: "#F5F5F5", border: "1px solid #E0E0E0", borderRadius: 0, boxShadow: "none" },
    cardBorder: "#E0E0E0",
    accent: "#0078D7",
    accentText: "#ffffff",
    button: { background: "#0078D7", border: "1px solid #005A9E", color: "#ffffff", borderRadius: 0 },
    buttonHoverBg: "#2B88D8",
    heading: "#000000",
    subtle: "#444444",
    code: "#0078D7",
    kbd: { background: "#FFFFFF", border: "1px solid #CCCCCC", borderBottom: "2px solid #A0A0A0", color: "#1B1B1B", borderRadius: 2 },
    divider: "#E5E5E5",
    badge: { background: "#0078D7", border: "none", color: "#fff", borderRadius: 2 },
    input: { background: "#ffffff", border: "1px solid #7A7A7A", color: "#1B1B1B", borderRadius: 0 },
  },
  win11: {
    label: "Windows 11",
    font: "'Segoe UI Variable', 'Segoe UI', sans-serif",
    desktop: "url('/wallpapers/win11.jpg') center/cover no-repeat, radial-gradient(circle at 20% 30%, #4A7CE0 0%, transparent 55%), radial-gradient(circle at 80% 20%, #7A5AF5 0%, transparent 50%), radial-gradient(circle at 60% 85%, #2BB3C7 0%, transparent 55%), linear-gradient(135deg, #1B3A6B 0%, #0F2440 100%)",
    textOnDesktop: "#ffffff",
    window: { background: "rgba(249,249,249,0.88)", backdropFilter: "blur(24px) saturate(1.4)", border: "1px solid rgba(0,0,0,0.12)", borderRadius: "8px", boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.8)", overflow: "hidden" },
    titleBar: { background: "transparent" },
    titleText: { color: "#1B1B1B", fontWeight: 600 },
    titleIcon: { background: "#0067C0", border: "none", color: "#ffffff", borderRadius: "4px" },
    body: { background: "transparent", color: "#1B1B1B" },
    card: { background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
    cardBorder: "rgba(0,0,0,0.08)",
    accent: "#0067C0",
    accentText: "#ffffff",
    button: { background: "#0067C0", border: "1px solid rgba(0,0,0,0.15)", color: "#ffffff", borderRadius: "4px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.25)" },
    buttonHoverBg: "#1975C6",
    heading: "#1B1B1B",
    subtle: "#5A5A5A",
    code: "#0067C0",
    kbd: { background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.1)", borderBottom: "2px solid rgba(0,0,0,0.18)", color: "#1B1B1B", borderRadius: 4 },
    divider: "rgba(0,0,0,0.08)",
    badge: { background: "#0067C0", border: "none", color: "#fff", borderRadius: 10 },
    input: { background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,0,0,0.15)", borderBottom: "2px solid #0067C0", color: "#1B1B1B", borderRadius: "4px 4px 0 0" },
  },
};

const THEME_KEYS = Object.keys(THEMES) as ThemeKey[];

type Tool = (typeof TOOLS)[number];
const slugOf = (tool: Tool) => tool.docs.split("/").pop()!.replace(/\.md$/, "");

export default function TinyUtilitiesPage() {
  const [themeKey, setThemeKey] = useState<ThemeKey>("win95");
  const [openTool, setOpenTool] = useState<Tool | null>(null);
  const [maximized, setMaximized] = useState(true);
  const [minimized, setMinimized] = useState(false);
  const [doc, setDoc] = useState("");
  const [docState, setDocState] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const saved = window.localStorage.getItem("tiny-utilities-theme") as ThemeKey | null;
    if (saved && saved in THEMES) setThemeKey(saved);
  }, []);

  useEffect(() => {
    if (!openTool) return;
    setDocState("loading");
    setDoc("");
    setMaximized(false);
    setMinimized(false);
    fetch(`/api/tiny-utilities/docs/${slugOf(openTool)}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        setDoc(await res.text());
        setDocState("ready");
      })
      .catch(() => setDocState("error"));
  }, [openTool]);

  useEffect(() => {
    if (!openTool) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpenTool(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openTool]);

  const setTheme = (key: ThemeKey) => {
    setThemeKey(key);
    window.localStorage.setItem("tiny-utilities-theme", key);
  };

  const t = THEMES[themeKey];

  return (
    <main
      className="flex min-h-svh flex-col items-center gap-10 p-6 transition-colors duration-500"
      style={{ fontFamily: t.font, color: "#000" }}
    >
      {/* Stable wallpaper layer — content scrolls above it, never stretches */}
      <div aria-hidden="true" className="fixed inset-0 -z-10" style={{ background: t.desktop, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
      <nav aria-label="Breadcrumb" className="flex w-full max-w-5xl items-center justify-between text-xs" style={{ color: t.textOnDesktop }}>
        <ol className="flex items-center gap-2">
          <li><Link href="/" className="hover:underline">home</Link></li>
          <li aria-hidden="true" className="opacity-70">/</li>
          <li><Link href="/tools" className="hover:underline">tools</Link></li>
          <li aria-hidden="true" className="opacity-70">/</li>
          <li aria-current="page" className="font-bold">tiny-utilities</li>
        </ol>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <span className="opacity-80">Theme:</span>
            <select
              aria-label="Windows theme"
              value={themeKey}
              onChange={(e) => setTheme(e.target.value as ThemeKey)}
              className="cursor-pointer px-2 py-1 text-xs outline-none"
              style={t.input}
            >
              {THEME_KEYS.map((key) => (
                <option key={key} value={key}>{THEMES[key].label}</option>
              ))}
            </select>
          </label>
          <a href={REPO} target="_blank" rel="noreferrer" className="hover:underline">GitHub</a>
          <a href={`${REPO}/releases/latest`} target="_blank" rel="noreferrer" className="hover:underline">Releases</a>
        </div>
      </nav>

      {/* Hero merged into the desktop backdrop */}
      <header className="w-full max-w-5xl px-2 py-6">
        <h1 className="text-4xl font-bold leading-tight sm:text-6xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]" style={{ color: t.textOnDesktop }}>Tiny Windows<br />Productivity Utilities</h1>
        <p className="mt-4 max-w-xl text-sm" style={{ color: t.textOnDesktop }}>
          <strong>Zero runtimes. Zero background daemons. Zero bloat.</strong><br />
          <span className="opacity-85">Every tool is a single-instance native Win32 C binary. Launch it on a hotkey, do the job in milliseconds, gone.</span>
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-xs">
          <a href={`${REPO}/releases/latest/download/tiny-utilities-x64.zip`} className="px-4 py-2 font-bold transition-colors" style={t.button} onMouseEnter={(e) => (e.currentTarget.style.background = t.buttonHoverBg)} onMouseLeave={(e) => (e.currentTarget.style.background = (t.button.background as string) ?? "")}>⬇ x64 (Intel/AMD)</a>
          <a href={`${REPO}/releases/latest/download/tiny-utilities-arm64.zip`} className="px-4 py-2 font-bold transition-colors" style={t.button} onMouseEnter={(e) => (e.currentTarget.style.background = t.buttonHoverBg)} onMouseLeave={(e) => (e.currentTarget.style.background = (t.button.background as string) ?? "")}>⬇ ARM64 (Surface/Snapdragon X)</a>
        </div>
        <p className="mt-3 text-[10px] opacity-80" style={{ color: t.textOnDesktop }}>Individual .exe downloads on the <a href={`${REPO}/releases/latest`} target="_blank" rel="noreferrer" className="underline">releases page</a>. MIT License.</p>
      </header>

      {/* Utilities as window panels */}
      <section className="w-full max-w-5xl">
        <h2 className="mb-3 text-xl font-bold" style={{ color: t.textOnDesktop }}>C:\&gt; TINY\*.EXE</h2>
        <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <li key={tool.binary}>
              <button type="button" onClick={() => setOpenTool(tool)} className="h-full w-full p-3 text-left text-xs transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white" style={t.card} aria-label={`Open ${tool.name} docs`}>
                <div className="flex items-baseline justify-between gap-2 border-b pb-1" style={{ borderColor: t.cardBorder }}>
                  <h3 className="font-bold" style={{ color: t.heading }}>{tool.name}</h3>
                </div>
                <code className="mt-1 block text-[10px]" style={{ color: t.code }}>{tool.binary}</code>
                <p className="mt-1.5 leading-snug" style={{ color: t.subtle }}>{tool.description}</p>
                <span className="mt-2 inline-block text-[10px] font-bold underline" style={{ color: t.code }}>open ↗</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* Hotkeys as a registry-ish table */}
      <section className="w-full max-w-5xl" style={t.window}>
        <div className="px-2 py-0.5 text-xs font-bold" style={{ ...t.titleBar, ...t.titleText, borderBottom: t.divider ? `1px solid ${t.divider}` : undefined }}>shortcuts.ahk — HOW_I_USE_IT.md</div>
        <div className="p-4" style={t.body}>
          <p className="text-xs" style={{ color: t.subtle }}>Bundled AutoHotkey v2 script: <a href={`${REPO}/blob/main/shortcuts.ahk`} target="_blank" rel="noreferrer" className="underline">shortcuts.ahk</a>. Double-click next to the executables.</p>
          <table className="mt-2 w-full text-left text-[11px]">
            <thead>
              <tr className="border-b-2" style={{ borderColor: t.heading }}><th className="py-1 pr-2">Shortcut</th><th className="py-1 pr-2">Tool</th><th className="py-1">What it does</th></tr>
            </thead>
            <tbody>
              {HOTKEYS.map(([k, tool, what]) => (
                <tr key={k} className="border-b" style={{ borderColor: t.divider }}>
                  <td className="py-1 pr-2"><kbd className="px-1" style={t.kbd}>{k}</kbd></td>
                  <td className="py-1 pr-2 font-bold" style={{ color: t.code }}>{tool}</td>
                  <td className="py-1" style={{ color: t.subtle }}>{what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Full-screen tool window */}
      {openTool && !minimized && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={`${openTool.name} — docs`}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={() => setOpenTool(null)} />
          <div className={`relative flex flex-col overflow-hidden transition-all duration-200 ${maximized ? "m-0 h-svh w-full" : "m-auto h-[82svh] w-[min(1100px,94vw)]"}`} style={t.window}>
            <div className="flex items-center gap-2 px-3 py-1.5 select-none" style={t.titleBar} onDoubleClick={() => setMaximized((v) => !v)}>
              <span className="flex h-4 w-4 items-center justify-center text-[9px]" style={t.titleIcon}>T</span>
              <span className="text-xs" style={t.titleText}>{openTool.binary} — {openTool.name}</span>
              <span className="ml-auto flex items-stretch gap-1 text-[11px]" style={{ color: t.titleText.color as string }}>
                <button type="button" aria-label="Minimize" onClick={() => setMinimized(true)} className="flex h-6 w-7 items-center justify-center border border-current/60 hover:bg-white/25">_</button>
                <button type="button" aria-label={maximized ? "Restore" : "Maximize"} onClick={() => setMaximized((v) => !v)} className="flex h-6 w-7 items-center justify-center border border-current/60 hover:bg-white/25">{maximized ? "❐" : "□"}</button>
                <button type="button" aria-label="Close" onClick={() => setOpenTool(null)} className="flex h-6 w-7 items-center justify-center border border-current/60 hover:bg-red-600 hover:text-white">×</button>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 border-b px-4 py-1.5 text-[11px]" style={{ ...t.body, borderColor: t.divider }}>
              <a href={openTool.docs} target="_blank" rel="noreferrer" className="underline font-semibold" style={{ color: t.code }}>View on GitHub ↗</a>
              <a href={`${REPO}/releases/latest`} target="_blank" rel="noreferrer" className="underline" style={{ color: t.code }}>Download ↗</a>
              <a href={REPO} target="_blank" rel="noreferrer" className="underline" style={{ color: t.code }}>Repo ↗</a>
              <kbd className="ml-auto px-1.5 py-0.5 text-[9px]" style={t.kbd}>Esc</kbd>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto p-5 text-[13px]" style={t.body}>
              {docState === "loading" && <p style={{ color: t.subtle }}>Loading docs…</p>}
              {docState === "error" && (
                <p style={{ color: t.subtle }}>
                  Couldn&apos;t load the docs. <a href={openTool.docs} target="_blank" rel="noreferrer" className="underline" style={{ color: t.code }}>Read them on GitHub ↗</a>
                </p>
              )}
              {docState === "ready" && <Markdown source={doc} />}
            </div>
          </div>
        </div>
      )}

      {/* Minimized window — taskbar pill */}
      {openTool && minimized && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-2">
          <button type="button" onClick={() => setMinimized(false)} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold shadow-lg transition-transform hover:-translate-y-0.5" style={{ ...t.button, ...t.body, color: t.heading }} aria-label={`Restore ${openTool.name} window`}>
            <span className="flex h-4 w-4 items-center justify-center text-[9px]" style={t.titleIcon}>T</span>
            {openTool.binary} — {openTool.name}
            <span className="opacity-60">click to restore</span>
          </button>
        </div>
      )}

      {/* Build from source */}
      <section className="w-full max-w-5xl text-xs" style={{ color: t.textOnDesktop }}>
        <p className="border border-white/40 bg-black/20 p-4">
          <strong>Build it yourself?</strong> Clang toolchain, <code>build.ps1</code>, shared micro-headers in <code>src/common\</code> — see the <a href={`${REPO}/blob/main/docs/DEVELOPMENT.md`} target="_blank" rel="noreferrer" className="underline">Developer Guide</a>. · <a href={`${REPO}/blob/main/docs/HOW_I_USE_IT.md`} target="_blank" rel="noreferrer" className="underline">How I use it daily</a> · <a href={REPO} target="_blank" rel="noreferrer" className="underline">github.com/theboyofdream/tiny-utilities</a> · MIT © Abhishek Chaurasiya
        </p>
      </section>
    </main>
  );
}
