# Komorebi design system (vendored from tools/komorebi)

Everything in this folder is copied **as-is** from `D:\theboyofdream\tools\komorebi\src\toolcraft\ui\` (2026-11-16), so it can evolve independently. Tailwind v4 processes `./styles.css` (already `@import`ed in `app/globals.css`).

## Use it

```tsx
// whole kit
import { Slider, Palette, ColorValue, Select } from "@/components/komorebi";

// or single components
import { Slider } from "@/components/komorebi/components/primitives";
```

The barrel `index.ts` exports: control-layout, composites, controls, panel, primitives.

## Dependencies (already installed)

`@phosphor-icons/react`, `@base-ui/react`, `@dnd-kit/{core,sortable,utilities}`, `react-resizable-panels` — plus existing `class-variance-authority`, `clsx`, `tailwind-merge`, `sonner`, `react` 19.

## Notes

- Icons are Phosphor (`@phosphor-icons/react`) — not lucide-react. Use whichever per context; don't mix inside one control.
- These pieces expect the shadcn-style CSS variables (`--border`, `--radius-lg`, `--accent`, …) defined in `app/globals.css` — they are.
- Do NOT hand-edit files here expecting upstream sync — it's a snapshot, not a submodule. To re-sync, re-copy from `../../tools/komorebi/src/toolcraft/ui/` and overwrite.
- `styles.css` uses Tailwind v4 `@custom-variant` (e.g. `data-open`, `data-checked`…) — processed because it's imported in `globals.css`.
