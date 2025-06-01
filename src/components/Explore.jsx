import React from "react";
import Heading from "./Heading";
import { Link } from "react-router-dom";
import EmailCTA from "./EmailCTA";
import ProjectCTA from "./ProjectCTA";
import Framer_project from "../assets/framer_project.jpg";
import Sundown from "../assets/sundown.jpg";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { VscFeedback } from "react-icons/vsc";
import { IoBriefcaseOutline } from "react-icons/io5";
import Techcta from "./Techcta";
import Reactimg from "../assets/react.png";
import Notion from "../assets/notion.jpg";
import Vite from "../assets/vitejs-logo.svg";
import Claude from "../assets/claude.avif";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Explore() {
  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const highlight = document.getElementById(id);
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    highlight.style.left = `${x}px`;
    highlight.style.top = `${y}px`;
  };

  const showHighlight = (id) => {
    const highlight = document.getElementById(id);
    if (highlight) highlight.style.opacity = 1;
  };

  const hideHighlight = (id) => {
    const highlight = document.getElementById(id);
    if (highlight) highlight.style.opacity = 0;
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Heading
        title="Hey there! I'm Aman 👋🏻"
        subtitle="Exploring ideas, building solutions. Your glimpse into my work and skills."
      />
      <div className="flex extra-margin">
        <Link to="/about">
          <p className="cta1 hover1">About</p>
        </Link>
        <EmailCTA />
      </div>

      <h4 className="white-text extra-extra-margin">Latest Work</h4>
      <div className="flex space-between">
        <ProjectCTA
          image={Framer_project}
          link="https://amankmrlko.github.io/FramerTemplateClone/"
          title="Brandfolio"
          description="Modern portfolio for brand storytelling"
        />
        <ProjectCTA
          image={Sundown}
          link="https://amankmrz-sundownclone.netlify.app/"
          title="Sundown Clone"
          description="Clone of Sundown with sleek animations"
        />
      </div>

      <div className="flex space-between extra-extra-margin">
        <div
          className="card"
          onMouseMove={(e) => handleMouseMove(e, "highlight-1")}
          onMouseEnter={() => showHighlight("highlight-1")}
          onMouseLeave={() => hideHighlight("highlight-1")}
        >
          <div className="highlight" id="highlight-1"></div>
          <div className="card-icon white-text">
            <VscFeedback size={18} />
          </div>
          <h3 className="white-text">Thoughts</h3>
          <p className="gray-text">Thoughts, ideas, and open discussions.</p>
          <Link to="/thoughts">
            <p className="extra-extra-margin cta1 white-text hover1">
              View Thoughts
            </p>
          </Link>
        </div>

        <div
          className="card"
          onMouseMove={(e) => handleMouseMove(e, "highlight-2")}
          onMouseEnter={() => showHighlight("highlight-2")}
          onMouseLeave={() => hideHighlight("highlight-2")}
        >
          <div className="highlight" id="highlight-2"></div>
          <div className="card-icon white-text">
            <IoBriefcaseOutline size={18} />
          </div>
          <h3 className="white-text">Experience</h3>
          <p className="gray-text">Building expertise, one role at a time.</p>
          <Link to="/experience">
            <p className="extra-extra-margin cta1 white-text hover1">
              My Journey
            </p>
          </Link>
        </div>
      </div>

      <div className="gray-text quote-section">
        <FaQuoteLeft size={70} className="quote-icon" />
        <p className="quote">
          "Quality means doing it right when no one is looking."
        </p>
        <p className="right-align">
          <br />— Henry Ford
        </p>
      </div>

      <div className="techstack extra-extra-margin">
        <h3 className="white-text">TechStack</h3>
        <p className="gray-text">
          Software and resources I use on a regular basis.
        </p>
        <div className="grid2c extra-margin">
          <Techcta
            image={Reactimg}
            link="https://react.dev/"
            title="React"
            description="Component-based library"
          />
          <Techcta
            image={Notion}
            link="https://www.notion.com/product"
            title="Notion"
            description="Notetaking + Organization"
          />
          <Techcta
            image={Vite}
            link="https://vite.dev/"
            title="Vite"
            description="Modern dev environment"
          />
          <Techcta
            image={Claude}
            link="https://claude.ai/"
            title="Claude"
            description="Helpful AI assistant"
          />
        </div>
        <Link to="/techstack">
          <div className="fullcta hover1 extra-margin">
            <p>View All</p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}

export default Explore;
