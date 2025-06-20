import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/profilePic.jpg";
import { MdOutlineExplore } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import { CiPen } from "react-icons/ci";
import { IoBriefcaseOutline } from "react-icons/io5";
import { FaReact } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { GrContact } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { FaGithubSquare } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";
import { MdOutlineArticle } from "react-icons/md";

function NavMobile() {
  return (
    <div className="NavMob">
      <div className="topNav">
        <NavLink to="/" className="logoM hover1">
          <img className="profileimg" src={logo} alt="Logo" width="40px" />
          <div className="logotext">
            <p className="p1 white-text">Aman Kumar</p>
            <p className="p2 gray-text">Software Developer</p>
          </div>
        </NavLink>
        <a
          href="https://drive.google.com/uc?export=download&id=1xlIeY1b0kz37o86Cc4YpOGFhfJ-q3vU4"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="resumeM white-text hover1">
            <p>
              <FaDownload size={15} />
              &nbsp;&nbsp;&nbsp;Resume
            </p>
          </div>
        </a>
      </div>
      <div className="bottomNav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `link hover2 gray-text ${isActive ? "clicked" : ""}`
          }
        >
          <MdOutlineExplore size={25} />
          <p>Explore</p>
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `link hover2 gray-text ${isActive ? "clicked" : ""}`
          }
        >
          <IoPersonOutline size={25} />
          <p>About</p>
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `link hover2 gray-text ${isActive ? "clicked" : ""}`
          }
        >
          <CiPen size={25} />
          <p>Projects</p>
        </NavLink>
        <NavLink
          to="/experience"
          className={({ isActive }) =>
            `link hover2 gray-text ${isActive ? "clicked" : ""}`
          }
        >
          <IoBriefcaseOutline size={25} />
          <p>Experience</p>
        </NavLink>
        <NavLink
          to="/techstack"
          className={({ isActive }) =>
            `link hover2 gray-text ${isActive ? "clicked" : ""}`
          }
        >
          <FaReact size={25} />
          <p>Techstack</p>
        </NavLink>
        <NavLink
          to="/thoughts"
          className={({ isActive }) =>
            `link hover2 gray-text ${isActive ? "clicked" : ""}`
          }
        >
          <VscFeedback size={25} />
          <p>Thoughts</p>
        </NavLink>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `link hover2 gray-text ${isActive ? "clicked" : ""}`
          }
        >
          <MdOutlineArticle size={25} />
          <p>Blogs</p>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `link hover2 gray-text ${isActive ? "clicked" : ""}`
          }
        >
          <GrContact size={25} />
          <p>Contact Me</p>
        </NavLink>
        <a
          href="https://www.linkedin.com/in/amankumarlko/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="link hover2 gray-text">
            <FaLinkedin size={25} />
            <p>LinkedIn</p>
          </div>
        </a>
        <a
          href="https://github.com/amankmrlko"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="link hover2 gray-text">
            <FaGithubSquare size={25} />
            <p>GitHub</p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default NavMobile;
