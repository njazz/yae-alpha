// src/components/Sonogram.tsx
import React, { useRef, useEffect } from "react";

type SonogramProps = {
  analyzer: AnalyserNode | null;
};

export default function Sonogram({ analyzer }: SonogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawIdRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyzer) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const freqData = new Uint8Array(analyzer.frequencyBinCount);

    function heatmapColorForValue(value: number) {
      const t = value / 255;
      if (t <= 0) return "rgb(0,0,0)";
      const r = Math.min(255, 255 * t * 2);
      const g = t > 0.5 ? Math.min(255, 255 * (t - 0.5) * 2) : 0;
      const b = 0.5 * r;
      return `rgb(${r},${g},${b})`;
    }

    const draw = () => {
      drawIdRef.current = requestAnimationFrame(draw);
      analyzer.getByteFrequencyData(freqData);

      // shift left
      const imgData = ctx.getImageData(1, 0, canvas.width - 1, canvas.height);
      ctx.putImageData(imgData, 0, 0);

      // draw new column
      for (let y = 0; y < canvas.height; y++) {
        const value =
          freqData[Math.floor((y * freqData.length) / canvas.height)];
        if (!!value)
          ctx.fillStyle = heatmapColorForValue(value);
        ctx.fillRect(canvas.width - 1, canvas.height - y, 1, 1);
      }
    };

    draw();
    return () => {
      if (drawIdRef.current) cancelAnimationFrame(drawIdRef.current);
    };
  }, [analyzer]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "200px", height: "100%", background: "#111" }}
    />
  );
}
