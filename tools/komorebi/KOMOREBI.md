# Komorebi Lab (Toolcraft app)

Procedural tree-shadow / dappled-light generator for landing pages.

## Run
    npm install
    npm run dev

## What is wired
- src/app/komorebi/komorebi-engine.ts: canvas engine (4 modes, 3 depth layers, noise wind, light angle, invert/moonlight). Ported verbatim from the playground, @ts-nocheck for now.
- src/app/komorebi/komorebi-values.ts: maps Toolcraft values["komorebi.*"] to engine options and defaults.
- src/app/komorebi/komorebi-renderer.tsx: canvas component, redraws on control change.
- src/app/app-schema.ts: 4 sections (Foliage, Branches, Light, Wind) using built-in Toolcraft controls.
- src/app/app-composition.tsx: composeToolcraftApp(appSchema, { scene: { canvasContent } }).
- .claude/skills/*: Toolcraft skills (brainstorming, browser, figma, figma-implement-design, systematic-debugging, writing-plans). Re-run `npx skills add` with another --agent for Cursor/Codex.

Verified: tsc clean, vite build OK, app loads in Chromium with zero console errors.

## NOT done yet (Toolcraft contract in AGENTS.md)
`npm test` fails until the app leaves "starter" readiness. Have your agent finish:
1. src/app/app-acceptance-data.ts: switch readiness to product; fill exportIntent, interactionOwnership, viewInteraction, appControlSectionInventory for the 4 sections, acceptance entries per control.
2. src/app/app-performance.ts: declare the custom renderer, workload dimensions (density, count, spread), scenarios; add renderer.pipelineRegistration and sceneBoundsProvider.
3. Control applicability: hide branch-only controls in drift mode; spread/falloff only for canopy; count only for branch/canopy/compound.
4. Export: PNG via rasterFrameRenderer (transparent PNG for overlay use).
5. Optionally drive wind from the Toolcraft timeline clock for loopable video export.
6. App cover (docs/toolcraft/core/app-cover.md) and docs/toolcraft/agent-worklog.md.
7. Tighten engine types and remove @ts-nocheck.

Prompt for your agent:
> Read AGENTS.md and docs/toolcraft/workflow.md, then complete items 1-6 in KOMOREBI.md without changing the visual output of the komorebi engine.
