// src/components/Sonogram.tsx
import React, { useRef, useEffect } from "react";

type SonogramProps = {
  analyzer: AnalyserNode | null;
};

export default function Sonogram({ analyzer }: SonogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawIdRef = useRef<number | null>(null);

  useEffect(() => {
    // if (!analyzer) return; // wait until analyzer is available


    // console.log("load!");

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Resize canvas to fill parent
    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const freqData = new Uint8Array(analyzer.frequencyBinCount);

    function heatmapColorForValue(value: number) {
      const t = value / 255;
      const r = Math.min(255, 255 * t * 2);
      const g = t > 0.5 ? Math.min(255, 255 * (t - 0.5) * 2) : 0;
      const b = 0.5 * r;
      return `rgb(${r},${g},${b})`;
    }

    const draw = () => {
      // console.log("draw");
      drawIdRef.current = requestAnimationFrame(draw);

      analyzer.getByteFrequencyData(freqData);

      // Shift existing canvas left
      const imgData = ctx.getImageData(1, 0, canvas.width - 1, canvas.height);
      ctx.putImageData(imgData, 0, 0);

      // Draw new column
      for (let y = 0; y < canvas.height; y++) {
        const value =
          freqData[Math.floor((y * freqData.length) / canvas.height)];
        ctx.fillStyle = heatmapColorForValue(value);
        ctx.fillRect(canvas.width - 1, canvas.height - 1 - y, 1, 1);
      }
    };

    draw();

    // Handle window resize
    const handleResize = () => {
      cancelAnimationFrame(drawIdRef.current!);
      resizeCanvas();
      draw();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (drawIdRef.current) cancelAnimationFrame(drawIdRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [analyzer]); // re-run whenever analyzer becomes available


  return (
    
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%" }}
    />

  );
}
