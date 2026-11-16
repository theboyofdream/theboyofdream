import { Fragment, type ReactNode } from "react";

const INLINE_RE = /(`[^`\n]+`)|(\*\*[^*\n]+\*\*)|(\[[^\]\n]+\]\([^)\n]+\))|(\*[^*\n]+\*)/g;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const match of text.matchAll(INLINE_RE)) {
    const idx = match.index ?? 0;
    if (idx > last) out.push(text.slice(last, idx));
    const tok = match[0];
    if (tok.startsWith("`")) {
      out.push(<code key={`${keyPrefix}-c${i}`} className="rounded bg-black/10 px-1 py-0.5 text-[0.85em] font-mono">{tok.slice(1, -1)}</code>);
    } else if (tok.startsWith("**")) {
      out.push(<strong key={`${keyPrefix}-b${i}`}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("[")) {
      const m = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      if (m) {
        const href = /^https?:\/\//.test(m[2]) ? m[2] : `https://github.com/theboyofdream/tiny-utilities/blob/main/${m[2].replace(/^\.?\//, "")}`;
        out.push(<a key={`${keyPrefix}-a${i}`} href={href} target="_blank" rel="noreferrer" className="underline underline-offset-2 font-semibold">{m[1]}</a>);
      } else out.push(tok);
    } else if (tok.startsWith("*")) {
      out.push(<em key={`${keyPrefix}-i${i}`}>{tok.slice(1, -1)}</em>);
    }
    last = idx + tok.length;
    i += 1;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source }: { source: string }) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // fenced code
    const fence = /^```/.exec(line);
    if (fence) {
      const buf: string[] = [];
      i += 1;
      while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i += 1; }
      i += 1; // closing fence
      blocks.push(<pre key={key++} className="my-3 overflow-x-auto border border-black/20 bg-black/85 p-3 text-[11px] leading-snug text-green-300 font-mono">{buf.join("\n")}</pre>);
      continue;
    }

    // heading
    const h = /^(#{1,4})\s+(.*)$/.exec(line);
    if (h) {
      const level = h[1].length;
      const cls = level === 1 ? "text-2xl font-bold mt-2 mb-3" : level === 2 ? "text-lg font-bold mt-4 mb-2 border-b border-current/20 pb-1" : "text-sm font-bold mt-3 mb-1 uppercase tracking-wide opacity-90";
      blocks.push(<div key={key++} className={cls} role="heading" aria-level={level}>{renderInline(h[2], `h${key}`)}</div>);
      i += 1;
      continue;
    }

    // hr
    if (/^\s*---+\s*$/.test(line)) {
      blocks.push(<hr key={key++} className="my-4 border-t border-black/25" />);
      i += 1;
      continue;
    }

    // list (unordered or ordered, with optional task checkboxes)
    if (/^\s*([-*]|\d+\.)\s+/.test(line)) {
      const ordered = /^\s*\d+\.\s+/.test(line);
      const items: ReactNode[] = [];
      while (i < lines.length && /^\s*([-*]|\d+\.)\s+/.test(lines[i])) {
        let item = lines[i].replace(/^\s*([-*]|\d+\.)\s+/, "");
        let checkbox: ReactNode = null;
        const task = /^\[([ xX])\]\s+/.exec(item);
        if (task) {
          checkbox = <span aria-hidden="true" className="mr-1.5 font-mono">{task[1].toLowerCase() === "x" ? "☑" : "☐"}</span>;
          item = item.slice(task[0].length);
        }
        items.push(<li key={items.length} className="leading-snug">{checkbox}{renderInline(item, `li${key}-${items.length}`)}</li>);
        i += 1;
      }
      blocks.push(ordered
        ? <ol key={key++} className="my-2 list-decimal space-y-1 pl-6">{items}</ol>
        : <ul key={key++} className="my-2 list-disc space-y-1 pl-6">{items}</ul>);
      continue;
    }

    // blank
    if (!line.trim()) { i += 1; continue; }

    // paragraph: gather until blank or block start
    const buf: string[] = [line];
    i += 1;
    while (i < lines.length && lines[i].trim() && !/^(#{1,4}\s|```|\s*([-*]|\d+\.)\s|\s*---+\s*$)/.test(lines[i])) {
      buf.push(lines[i]);
      i += 1;
    }
    blocks.push(<p key={key++} className="my-2 leading-relaxed">{renderInline(buf.join(" "), `p${key}`)}</p>);
  }

  return <Fragment>{blocks}</Fragment>;
}
