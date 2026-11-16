import * as React from "react";

import type { ToolcraftState } from "@/toolcraft/runtime";
import { useToolcraftSelector } from "@/toolcraft/runtime/react";

import { komorebi, type KomorebiOptions } from "./komorebi-engine";
import { readKomorebiOptions } from "./komorebi-values";

const selectValues = (state: ToolcraftState) => state.values;

export function KomorebiRenderer(): React.JSX.Element {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const handleRef = React.useRef<ReturnType<typeof komorebi> | null>(null);
  const optionsRef = React.useRef<KomorebiOptions>(readKomorebiOptions({}));
  const values = useToolcraftSelector(selectValues);

  React.useEffect(() => {
    Object.assign(optionsRef.current, readKomorebiOptions(values));
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (handleRef.current) handleRef.current.apply();
    else handleRef.current = komorebi(canvas, optionsRef.current);
  }, [values]);

  React.useEffect(
    () => () => {
      handleRef.current?.stop();
      handleRef.current = null;
    },
    [],
  );

  return (
    <canvas
      aria-hidden="true"
      ref={canvasRef}
      style={{ height: "100%", inset: 0, pointerEvents: "none", position: "absolute", width: "100%" }}
    />
  );
}
