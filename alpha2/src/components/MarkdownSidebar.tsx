// src/components/MarkdownSidebar.tsx
import React , { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

type MarkdownSidebarProps = {
  markdown: string;
};

export default function MarkdownSidebar() {

  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    fetch("/docs/quickstart.md")
      .then((res) => res.text())
      .then(setMarkdown);
  }, []);

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
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  );
}
