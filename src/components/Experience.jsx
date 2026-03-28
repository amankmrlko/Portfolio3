import React from "react";
import Heading from "./Heading";
import { motion } from "framer-motion";
import Tcs from "../assets/tcslogo.png";
import { Link } from "react-router-dom";
import EmailCTA from "./EmailCTA";
import Accenture from "../assets/accenture.svg.png";

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
      <div className="expcomp">
        <a
          href="https://www.accenture.com/in-en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={Accenture}
            alt="Acenture logo"
            className="tcs extra-margin hover1"
          />
        </a>
        <h3 className="gray-text">Senior Software Analyst</h3>
        <p className="gray-text expinfo">
          <i>February 2026 – Present</i>
        </p>
        <div className="tcscontent gray-text extra-margin">
          <p>
            At Accenture, I’ve evolved into a more system-focused role, working
            across modern headless architectures and contributing to
            intelligent, scalable web platforms. My work involves enhancing
            existing applications, improving performance, and introducing
            smarter content and search experiences.
          </p>

          <h3 className="white-text extra-margin">Key Contributions:</h3>
          <ul className="bullet-list">
            <li>
              Maintained and enhanced applications built on Next.js within a
              headless architecture, improving performance, scalability, and
              overall user experience.
            </li>

            <li>
              Worked with Sitecore Headless CMS to support API-driven content
              delivery and ensure seamless integration with frontend systems.
            </li>

            <li>
              Improved search capabilities by enhancing query handling,
              relevance tuning, and user intent mapping to deliver more accurate
              and contextual results.
            </li>

            <li>
              Utilized Azure services for monitoring, diagnostics, and
              performance analysis across distributed systems.
            </li>

            <li>
              Contributed to backend-level debugging and API flow understanding,
              enabling faster issue resolution and better cross-team
              collaboration.
            </li>

            <li>
              Identified system bottlenecks and implemented optimizations to
              improve application responsiveness and stability.
            </li>
          </ul>
        </div>
      </div>

      {/* section break */}

      <div className="expcomp">
        <a href="https://tcs.com/" target="_blank" rel="noopener noreferrer">
          <img src={Tcs} alt="tcs logo" className="tcs extra-margin hover1" />
        </a>
        <h3 className="gray-text">Software Engineer</h3>
        <p className="gray-text expinfo">
          <i>July 2022 – February 2026</i>
        </p>
        <div className="tcscontent gray-text extra-margin">
          <p>
            At TCS, I worked on front-end development for enterprise web
            applications, focusing on building reliable user interfaces and
            supporting production environments.
          </p>

          <h3 className="white-text extra-margin">Key Contributions:</h3>
          <ul className="bullet-list">
            <li>
              Developed responsive UI components using React.js, JavaScript,
              HTML, and CSS, aligned with client requirements and design
              standards.
            </li>

            <li>
              Handled production issues and bug fixes to ensure application
              stability and a smooth user experience.
            </li>

            <li>
              Supported deployment workflows in collaboration with DevOps teams.
            </li>

            <li>
              Integrated dynamic content using Sitecore CMS across multiple
              pages.
            </li>

            <li>
              Monitored application performance and logs using Azure Portal.
            </li>

            <li>
              Implemented and maintained Solr-based search functionality for
              improved content discovery.
            </li>
          </ul>
        </div>
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
