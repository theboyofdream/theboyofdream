"use client";

import Link from "next/link";
import { useState } from "react";
import { makeCompliment } from "@/lib/complimentr";

export default function ComplimentPage() {
  const [compliment, setCompliment] = useState("");

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 text-center">
      <Link href="/tools" className="text-sm text-muted-foreground hover:underline">
        ← tools
      </Link>
      <h1 className="text-3xl font-bold">Compliment Generator</h1>
      <p className="max-w-md text-muted-foreground">
        Random compliments, client-side. Migrated from the old{" "}
        <code>compliment-api</code> playground.
      </p>
      <p className="min-h-8 text-xl italic">
        {compliment || "want one?"}
      </p>
      <button
        type="button"
        onClick={() => setCompliment(makeCompliment())}
        className="rounded-lg border px-5 py-2 text-lg transition hover:bg-accent"
      >
        Compliment me
      </button>
    </main>
  );
}
