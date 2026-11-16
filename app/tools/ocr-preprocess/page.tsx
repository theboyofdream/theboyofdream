"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { preprocessForOcr } from "@/lib/ocr-preprocess";

export default function OcrPreprocessPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fileName, setFileName] = useState("");
  const [processed, setProcessed] = useState(false);
  const [threshold, setThreshold] = useState(0.4);
  const [imageLoaded, setImageLoaded] = useState(false);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    setProcessed(false);
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d")?.drawImage(img, 0, 0);
      setImageLoaded(true);
    };
    img.src = URL.createObjectURL(file);
  }

  function runPipeline() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    preprocessForOcr(imageData, threshold);
    ctx.putImageData(imageData, 0, 0);
    setProcessed(true);
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = (fileName.replace(/\.[^.]+$/, "") || "ocr-processed") + ".png";
    a.click();
  }

  return (
    // Paper/scan personality: warm off-white, ink-black text, terminal-green accent
    <main className="flex min-h-svh flex-col items-center gap-4 bg-[#F4F1E8] p-6 text-[#241f16]">
      <Link href="/tools" className="self-start font-mono text-xs text-[#6d6450] hover:underline">← tools</Link>

      <h1 className="font-mono text-2xl font-bold tracking-wide">OCR_PREPROCESSOR<span className="animate-pulse text-[#15803d]">_</span></h1>
      <p className="font-mono text-xs text-[#6d6450]">blur → dilate → invert → threshold · tuned for tesseract</p>

      <div className="w-full max-w-3xl border-2 border-dashed border-[#241f16]/40 bg-[#EDEAE0] p-4">
        <input type="file" accept="image/*" onChange={onFile} className="font-mono text-xs file:mr-3 file:border file:border-[#241f16] file:bg-[#241f16] file:px-3 file:py-1 file:font-mono file:text-[#F4F1E8]" />
        <div className="mt-3 flex items-center gap-3 font-mono text-xs text-[#6d6450]">
          <span>THRESHOLD={threshold.toFixed(2)}</span>
          <input type="range" min={0} max={1} step={0.01} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="accent-[#15803d]" />
        </div>
        <div className="mt-3 flex gap-2 font-mono">
          <button type="button" disabled={!imageLoaded} onClick={runPipeline} className="border-2 border-[#241f16] bg-[#15803d] px-4 py-1.5 text-xs font-bold text-[#F4F1E8] transition enabled:hover:bg-[#116630] disabled:opacity-40">RUN_PIPELINE</button>
          {processed && (
            <button type="button" onClick={download} className="border-2 border-[#241f16] bg-[#241f16] px-4 py-1.5 text-xs font-bold text-[#F4F1E8] hover:bg-[#3a3428]">DOWNLOAD.png</button>
          )}
        </div>
      </div>
      <canvas ref={canvasRef} className="max-w-full border-2 border-[#241f16] shadow-[6px_6px_0_#241f16]" />
      <p className="font-mono text-[10px] text-[#6d6450]">runs locally in this tab. nothing uploads.</p>
    </main>
  );
}
