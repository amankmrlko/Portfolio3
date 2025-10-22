import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeSnippet = ({ code, language = "javascript" }) => {
  const wrapperStyle = {
    margin: "1.5rem 0",
    borderRadius: "10px",
    overflowX: "auto",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  };

  const codeStyle = {
    padding: "16px 20px",
    borderRadius: "12px",
    fontSize: "12px",
    lineHeight: "18px",
    background: "#282c34",
    minWidth: "100%",
  };

  return (
    <div style={wrapperStyle}>
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        customStyle={codeStyle}
        showLineNumbers
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeSnippet;
