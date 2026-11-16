import { composeToolcraftApp } from "@/toolcraft/runtime/react";

import { appSchema } from "./app-schema";
import { KomorebiRenderer } from "./komorebi/komorebi-renderer";

export const appComposition = composeToolcraftApp(appSchema, {
  scene: { canvasContent: <KomorebiRenderer /> },
});
