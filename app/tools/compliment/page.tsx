"use client";

import Link from "next/link";
import { useState } from "react";
import { makeCompliment } from "@/lib/complimentr";

export default function ComplimentPage() {
  const [compliment, setCompliment] = useState("");
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 bg-[#FFF7F0] p-6 text-center text-[#43302B]">
      <Link href="/tools" className="text-sm text-[#A0615A] hover:underline">← tools</Link>

      <div className="relative">
        <span aria-hidden className="absolute -top-7 -left-9 select-none font-serif text-7xl text-[#F9B4C0]">“</span>
        <h1 className="font-serif text-4xl italic text-[#B23A48]">Compliment Generator</h1>
        <span aria-hidden className="absolute -bottom-5 -right-9 select-none font-serif text-7xl text-[#F9B4C0]">”</span>
      </div>
      <p className="text-sm text-[#A0615A]">random compliments. for science.</p>

      <blockquote className="max-w-xl font-serif text-3xl leading-snug text-[#43302B] min-h-24">
        {compliment || "want one?"}
      </blockquote>

      <button
        type="button"
        onClick={() => { setCompliment(makeCompliment()); setCount((c) => c + 1); }}
        className="rounded-full border-2 border-[#B23A48] bg-[#B23A48] px-8 py-3 text-xl font-semibold text-[#FFF7F0] transition hover:bg-[#8C2D3A]"
      >
        Compliment me →
      </button>
      <p className="text-xs text-[#A0615A]">{count > 0 ? `compliment #${count} this session` : "press the button, believe in yourself"}</p>
    </main>
  );
}
