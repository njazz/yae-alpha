// src/components/CodeSidebar.tsx
import React from "react";

type CodeSidebarProps = {
  codeText: string;
};

export default function CodeSidebar({ codeText }: CodeSidebarProps) {
  return (
    <div
      style={{
        width: "300px",
        background: "#2e2e2e",
        color: "#fff",
        padding: "10px",
        fontFamily: "monospace",
        overflowY: "auto",
      }}
    >
      <pre>{codeText}</pre>
    </div>
  );
}
