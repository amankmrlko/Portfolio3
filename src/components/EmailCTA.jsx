import React, { useState } from 'react';
import { FaRegCopy } from "react-icons/fa6";

function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const email = "amankumar.lko@yahoo.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    });
  };

  return (
    <div 
      className={`email hover1 ${copied ? "gray-text" : "white-text"}`} 
      onClick={handleCopy}
      style={{ cursor: "pointer" }}
    >
      <p>
        <FaRegCopy size={12} />&nbsp;
        {copied ? "Copied" : "Email"}
      </p>
    </div>
  );
}

export default EmailCopy;
