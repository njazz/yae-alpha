// src/components/Tabs.tsx
import React, { useState } from "react";

type Tab = {
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
};

export default function Tabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Tab Headers */}
      <div style={{ display: "flex", background: "#333", color: "#fff" }}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            style={{
              flex: 1,
              padding: "8px",
              cursor: "pointer",
              background: activeIndex === index ? "#444" : "transparent",
              border: "none",
              color: "inherit",
              fontFamily: "monospace",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ flex: 1, overflow: "auto" }}>{(!!tabs[activeIndex]) ? tabs[activeIndex].content : "" }</div>
    </div>
  );
}
