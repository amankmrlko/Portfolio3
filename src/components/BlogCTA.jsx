import React from "react";
import { MdArrowOutward } from "react-icons/md";

function BlogCTA({ image, title, description }) {
  return (
    <div>
      <div className="project-box">
        <div className="image-div">
          <img src={image} alt="Project thumbnail" />
        </div>
        <div className="project-desc">
          <div>
            <h5 className="white-text">{title}</h5>
            <p className="gray-text">{description}</p>
          </div>
          <MdArrowOutward size={20} className="gray-text" />
        </div>
      </div>
    </div>
  );
}

export default BlogCTA;
