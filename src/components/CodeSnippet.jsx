import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi"; // icons for copy + success

const CodeSnippet = ({ code, language = "javascript" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code.trim());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset icon after 2s
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const wrapperStyle = {
    position: "relative",
    margin: "0",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  };

  const codeStyle = {
    padding: "16px 20px",
    fontSize: "13px",
    lineHeight: "19px",
    background: "#1c1c1c",
  };

  const buttonStyle = {
    position: "absolute",
    top: "15px",
    right: "10px",
    background: "rgba(255, 255, 255, 0.1)",
    border: "none",
    color: "#fff",
    padding: "5px 8px",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={wrapperStyle}>
      <button
        onClick={handleCopy}
        style={{
          ...buttonStyle,
          background: copied
            ? "rgba(76, 175, 80, 0.2)" // green tint when copied
            : "rgba(255, 255, 255, 0.1)",
        }}
        title={copied ? "Copied!" : "Copy code"}
      >
        {copied ? <FiCheck size={16} /> : <FiCopy size={16} />}
      </button>

      <SyntaxHighlighter
        language={language}
        style={tomorrow}
        customStyle={codeStyle}
        showLineNumbers
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
