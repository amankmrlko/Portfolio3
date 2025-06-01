import React from "react";

function Techcta({ image, link, title, description }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="techcta hover3 flex">
        <img src={image} alt="tech-icon" className="tech-icon" />
        <div>
          <h4 className="white-text">{title}</h4>
          <p className="gray-text">{description}</p>
        </div>
      </div>
    </a>
  );
}

export default Techcta;
