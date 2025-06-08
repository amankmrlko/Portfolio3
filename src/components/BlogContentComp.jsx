import React from "react";

function BlogContentComp({ heading, content }) {
  const formatContent = (content) => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div>
      <div className="blog-content">
        <h2 className="white-text">{heading}</h2>
        <p className="gray-text">{formatContent(content)}</p>
      </div>
    </div>
  );
}

export default BlogContentComp;
