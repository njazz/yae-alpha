// src/components/Scope.tsx
import React, { useRef, useEffect } from "react";

type ScopeProps = {
  buffer?: Float32Array; // optional, can be passed each frame
};

export default function Scope({ buffer }: ScopeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const { clientWidth: width, clientHeight: height } = canvas;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // useEffect(() => {
  //   if (!buffer) return;
  //   const canvas = canvasRef.current;
  //   if (!canvas) return;
  //   const ctx = canvas.getContext("2d");
  //   if (!ctx) return;

  //   const width = canvas.clientWidth;
  //   const height = canvas.clientHeight;

  //   ctx.clearRect(0, 0, width, height);
  //   ctx.strokeStyle = "#0f0";
  //   ctx.lineWidth = 2;
  //   ctx.beginPath();

  //   const step = buffer.length / width;

  //   for (let i = 0; i < width; i++) {
  //     const idx = Math.floor(i * step);
  //     const sample = buffer[idx] || 0;
  //     const y = (1 - (sample + 1) / 2) * height;
  //     if (i === 0) ctx.moveTo(i, y);
  //     else ctx.lineTo(i, y);
  //   }
  //   ctx.stroke();
  // }, [buffer]);

  // const canvasRef = useRef();
  const rafRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    function draw() {
      rafRef.current = requestAnimationFrame(draw);

      const buf = buffer.current;
      if (!buf) return;

      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = '#0f0';
      const step = (buf.length * 0.5) / width;

      for (let i = 0; i < width; i++) {
        const sample = buf[Math.floor(i * step)] || 0;
        const y = (1 - (sample + 1) / 2) * height;
        if (i === 0) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
      }

      ctx.stroke();
    }

    draw();

    return () => cancelAnimationFrame(rafRef.current);
  }, [buffer]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "200px", height: "100%", background: "#111" }}
    />
  );
}
