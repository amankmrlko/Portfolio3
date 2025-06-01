import React from "react";
import Heading from "./Heading";
import { motion } from "framer-motion";
import Tcs from "../assets/tcslogo.png";
import { Link } from "react-router-dom";
import EmailCTA from "./EmailCTA";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Experience() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Heading
        title="My Professional Journey"
        subtitle="Collaborating, learning, and building at scale."
      />
      <div className="flex extra-margin">
        <Link to="/techstack">
          <p className="cta1 hover1">My Skills</p>
        </Link>
        <EmailCTA />
      </div>
      <h2 className="white-text extra-extra-margin">Professional Experience</h2>
      <a href="https://tcs.com/" target="_blank" rel="noopener noreferrer">
        <img src={Tcs} alt="tcs logo" className="tcs extra-margin hover1" />
      </a>
      <h3 className="gray-text">Software Engineer</h3>
      <p className="gray-text expinfo">
        <i>July 2022 – Present</i>
      </p>
      <div className="tcscontent gray-text extra-margin">
        <p>
          At TCS, I turned my passion for front-end development into
          professional impact, building scalable and user-friendly web
          platforms. I’ve worked across the full front-end lifecycle—from
          development to production issue resolution—while also contributing to
          performance optimization and content management.
        </p>

        <h3 className="white-text extra-margin">Key Contributions:</h3>
        <ul className="bullet-list">
          <li>
            Built responsive and accessible front-end pages using React.js,
            JavaScript, HTML, and CSS, aligned with client design and delivery
            standards.
          </li>

          <li>
            Resolved live production bugs and performed on-the-fly design
            updates to ensure stability and a smooth user experience.
          </li>

          <li>
            Collaborated with DevOps teams to support deployment workflows and
            streamline production releases.
          </li>

          <li>
            Worked extensively with headless Sitecore CMS to integrate dynamic
            content across platforms.
          </li>

          <li>
            Used Azure Portal to monitor website performance, analyze logs, and
            implement performance improvements.
          </li>

          <li>
            Implemented Solr-based search features to enhance user navigation
            and site discovery.
          </li>
        </ul>
      </div>

      <div className="learningcard extra-extra-margin">
        <h4 className="white-text center-text">Beyond the Code</h4>
        <div className="columnflex center-text gray-text">
          <p>
            Crafting user-focused interfaces that are accessible, responsive,
            and visually engaging.
          </p>
          <p>
            Debugging under pressure, especially in live production
            environments.
          </p>
          <p>Working across teams, balancing design, logic, and performance.</p>
          <p>
            Adapting fast, whether it’s a new tech stack or a new business
            domain.
          </p>
          <p>
            Thinking beyond code, using tools to monitor, analyze, and improve
            experiences.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Experience;
