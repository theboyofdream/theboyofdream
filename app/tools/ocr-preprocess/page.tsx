"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { preprocessForOcr } from "@/lib/ocr-preprocess";

export default function OcrPreprocessPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
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
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
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
    <main className="flex min-h-svh flex-col items-center gap-4 p-6">
      <Link href="/tools" className="self-start text-sm text-muted-foreground hover:underline">
        ← tools
      </Link>
      <h1 className="text-3xl font-bold">OCR image pre-processor</h1>
      <p className="max-w-xl text-center text-muted-foreground">
        Blur → dilate → invert → threshold, tuned for Tesseract OCR. Everything
        runs locally in this tab; nothing is uploaded.
      </p>
      <input ref={inputRef} type="file" accept="image/*" onChange={onFile} />
      <label className="flex items-center gap-3 text-sm text-muted-foreground">
        Threshold ({threshold.toFixed(2)})
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </label>
      <div className="flex gap-3">
        <button
          type="button"
          disabled={!imageLoaded}
          onClick={runPipeline}
          className="rounded-lg border bg-primary px-4 py-2 text-primary-foreground disabled:opacity-50"
        >
          Run pipeline
        </button>
        {processed && (
          <button
            type="button"
            onClick={download}
            className="rounded-lg border px-4 py-2 hover:bg-accent"
          >
            Download PNG
          </button>
        )}
      </div>
      <canvas ref={canvasRef} className="max-w-full rounded-lg border" />
    </main>
  );
}
