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
        height: "36px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
        background: "#222",
      }}
    >
      {/* Buttons */}
      <div>

        <div class="btn-group" style={{display: "flex", width:"180px", height: "36px"}}>

        <button
          onClick={onStart}
          disabled={audioRunning}
          class="btn btn-start"
        >
          Start
        </button>
        <button onClick={onStop} disabled={!audioRunning} class="btn btn-stop">
          Stop 
        </button>

      </div>


        

      </div>

      {/* Status placeholder */}
      <div id="dspstatus" style={{ color: "#0f0"}}>
        {/*{audioRunning ? "Running" : "Stopped"}*/ status }
      </div>

      {/* Right side group */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px", width:"180px", height: "36px" }}>
        <button
  onClick={onToggleGraph} 
  class="btn-basic"
>
  Graph
</button>
        <button onClick={onShare} class="btn-basic">Share</button>
        {/* Scope + Sonogram will be separate components */}
      </div>
    </div>
  );
}
