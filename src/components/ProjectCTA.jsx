import React from 'react';
import { MdArrowOutward } from "react-icons/md";

function ProjectCTA({ image, link, title, description }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className='project-box'>
        <div className="image-div">
          <img src={image} alt="Project thumbnail" />
        </div>
        <div className="project-desc">
          <div>
            <h5 className='white-text'>{title}</h5>
            <p className='gray-text'>{description}</p>
          </div>
          <MdArrowOutward size={20} className='gray-text' />
        </div>
      </div>
    </a>
  );
}

export default ProjectCTA;
