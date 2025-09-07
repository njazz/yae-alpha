// src/components/NodeList.tsx
import React from "react";

type NodeListProps = {
  draggableItems: string[];
};

export default function NodeList({ draggableItems }: NodeListProps) {
  return (
    <div
      style={{
        width: "12vw",
        background: "#2e2e2e",
        color: "#fff",
        padding: "5px",
        fontFamily: "monospace",
      }}
    >
      {draggableItems.map((item) => (
        <div
          key={item}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("nodeLabel", item)}
          style={{
            padding: "8px",
            marginBottom: "4px",
            background: "#444",
            borderRadius: "4px",
            cursor: "grab",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
