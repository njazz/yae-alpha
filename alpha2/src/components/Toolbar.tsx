// src/components/Toolbar.tsx
import React from "react";

type ToolbarProps = {
  onStart: () => void;
  onStop: () => void;
  onToggleGraph: () => void;
  onShare: () => void;
  status: String;
  audioRunning: boolean;
};

export default function Toolbar({
  onStart,
  onStop,
  onToggleGraph,
  onShare,
  status,
  audioRunning,  
}: ToolbarProps) {
  return (
    <div
      style={{
        width: "78%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
        background: "#222",
      }}
    >
      {/* Buttons */}
      <div>
        <button
          onClick={onStart}
          disabled={audioRunning}
          style={{ marginRight: "10px" }}
        >
          Start Audio
        </button>
        <button onClick={onStop} disabled={!audioRunning}>
          Stop Audio
        </button>
&nbsp;&nbsp;
        <button
  onClick={onToggleGraph}
  // style={{
  // //   background: "none",
  // //   border: "none",
  // //   padding: "6px 12px",
  // //   color: "#fff",
  // //   cursor: "pointer",
  //   // fontSize: "14px",
  // //   transition: "background 0.2s",
  //   // backgroundColor: 
  // }}
  // onMouseOver={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
  // onMouseOut={(e) => (e.currentTarget.style.background = "none")}
>
  Display Graph
</button>

      </div>

      {/* Status placeholder */}
      <div id="dspstatus" style={{ color: "#0f0" }}>
        {/*{audioRunning ? "Running" : "Stopped"}*/ status }
      </div>

      {/* Right side group */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button onClick={onShare}>Share</button>
        {/* Scope + Sonogram will be separate components */}
      </div>
    </div>
  );
}
