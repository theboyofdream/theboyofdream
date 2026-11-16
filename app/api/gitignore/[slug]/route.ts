// app/api/gitignore/[slug]/route.ts (Next.js 13+)
import { NextResponse } from "next/server"

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const res = await fetch(
    `https://www.toptal.com/developers/gitignore/api/${params.slug}`
  )
  const text = await res.text()
  return new NextResponse(text, {
    headers: { "Content-Type": "text/plain" },
  })
}
