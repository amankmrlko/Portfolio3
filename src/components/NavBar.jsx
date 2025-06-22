import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/profilePic.jpg";
import { MdOutlineExplore } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { CiPen } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { GrContact } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { FaGithubSquare } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdOutlineArticle } from "react-icons/md";

function NavBar() {
  return (
    <div className="navpanel">
      <NavLink to="/" className="logo hover1">
        <img className="profileimg" src={logo} alt="Logo" width="40px" />
        <div className="logotext">
          <p className="p1 white-text">Aman Kumar</p>
          <p className="p2 gray-text">Software Developer</p>
        </div>
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `link hover2 gray-text ${isActive ? "clicked" : ""}`
        }
      >
        <MdOutlineExplore size={18} />
        <p>Explore</p>
        <span className="arrow">
          <FaArrowRight size={11} />
        </span>
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          `link hover2 gray-text ${isActive ? "clicked" : ""}`
        }
      >
        <IoPersonOutline size={18} />
        <p>About</p>
        <span className="arrow">
          <FaArrowRight size={11} />
        </span>
      </NavLink>
      <NavLink
        to="/projects"
        className={({ isActive }) =>
          `link hover2 gray-text ${isActive ? "clicked" : ""}`
        }
      >
        <CiPen size={18} />
        <p>Projects</p>
        <span className="arrow">
          <FaArrowRight size={11} />
        </span>
      </NavLink>
      <NavLink
        to="/experience"
        className={({ isActive }) =>
          `link hover2 gray-text ${isActive ? "clicked" : ""}`
        }
      >
        <IoBriefcaseOutline size={18} />
        <p>Experience</p>
        <span className="arrow">
          <FaArrowRight size={11} />
        </span>
      </NavLink>
      <NavLink
        to="/techstack"
        className={({ isActive }) =>
          `link hover2 gray-text ${isActive ? "clicked" : ""}`
        }
      >
        <FaReact size={18} />
        <p>Techstack</p>
        <span className="arrow">
          <FaArrowRight size={11} />
        </span>
      </NavLink>
      <p className="gray-text smalltext extra-margin">Resources</p>
      <NavLink
        to="/thoughts"
        className={({ isActive }) =>
          `link hover2 gray-text ${isActive ? "clicked" : ""}`
        }
      >
        <VscFeedback size={18} />
        <p>Thoughts</p>
        <span className="arrow">
          <FaArrowRight size={11} />
        </span>
      </NavLink>
      <NavLink
        to="/blogs"
        className={({ isActive }) =>
          `link hover2 gray-text ${isActive ? "clicked" : ""}`
        }
      >
        <MdOutlineArticle size={18} />
        <p>Blogs</p>
        <span className="arrow">
          <FaArrowRight size={11} />
        </span>
      </NavLink>
      <p className="gray-text smalltext extra-margin">Connect</p>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `link hover2 gray-text ${isActive ? "clicked" : ""}`
        }
      >
        <GrContact size={18} />
        <p>Contact Me</p>
        <span className="arrow">
          <FaArrowRight size={11} />
        </span>
      </NavLink>
      <a
        href="https://www.linkedin.com/in/amankumarlko/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="link hover2 gray-text">
          <FaLinkedin size={18} />
          <p>LinkedIn</p>
          <span className="arrow">
            <MdArrowOutward size={15} />
          </span>
        </div>
      </a>
      <a
        href="https://github.com/amankmrlko"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="link hover2 gray-text">
          <FaGithubSquare size={18} />
          <p>GitHub</p>
          <span className="arrow">
            <MdArrowOutward size={15} />
          </span>
        </div>
      </a>
      <a
        href="https://drive.google.com/uc?export=download&id=12NvSoT09oymjuhqndzcD8rpdQ_5nFyne"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="resume white-text hover1">
          <p>
            <FaDownload size={15} />
            &nbsp;&nbsp;&nbsp;Resume
          </p>
        </div>
      </a>
    </div>
  );
}

export default NavBar;
