import React from "react";
import Heading from "./Heading";
import { motion } from "framer-motion";
import ProjectCTA from "./ProjectCTA";
import Framer_project from "../assets/framer_project.jpg";
import Sundown from "../assets/sundown.jpg";
import Ouchi from "../assets/ouchi.jpg";
import Firstportfolio from "../assets/firstportfolio.jpg";
import { Link } from "react-router-dom";
import EmailCTA from "./EmailCTA";
import chatspaceimg from "../assets/chatspace_thumbnail.jpg";
import { MdArrowOutward } from "react-icons/md";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Projects() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Heading
        title="Crafted With Code"
        subtitle="A showcase of web experiences built with precision, performance, and purpose."
      />
      <div className="flex extra-margin">
        <Link to="/blogs">
          <p className="cta1 hover1">View Blogs</p>
        </Link>
        <EmailCTA />
      </div>
      <h4 className="white-text extra-extra-margin">My Work</h4>
      <div className="grid2c gap10px">
        <a href="/chat-space">
          <div className="project-box">
            <div className="image-div">
              <img src={chatspaceimg} alt="Project thumbnail" />
            </div>
            <div className="project-desc">
              <div>
                <h5 className="white-text">Instant Real-Time Chat Platform</h5>
                <p className="gray-text">
                  Secure, fast, and seamless messaging everywhere
                </p>
              </div>
              <MdArrowOutward size={20} className="gray-text" />
            </div>
          </div>
        </a>
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
        <ProjectCTA
          image={Ouchi}
          link="https://amankmrlko.github.io/ochi-clone/"
          title="Ouchi Design"
          description="Smooth Animation and elegant design"
        />
        <ProjectCTA
          image={Firstportfolio}
          link="https://amankmrlko.github.io/Portfolio/"
          title="First Portfolio"
          description="Starting Strong, Growing Every Day"
        />
      </div>
    </motion.div>
  );
}

export default Projects;
