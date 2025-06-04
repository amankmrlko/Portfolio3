import React from "react";

function Comment({ comment }) {
  const formatContent = (content) => {
    if (!content) return "";
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  if (!comment) return null;

  return (
    <div className="comment">
      <p className="CommName white-text">{comment.name}</p>
      <p className="CommContent gray-text">{formatContent(comment.content)}</p>
    </div>
  );
}

export default Comment;
