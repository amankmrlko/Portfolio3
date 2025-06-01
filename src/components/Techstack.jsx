import React from "react";
import Heading from "./Heading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EmailCTA from "./EmailCTA";
import Techcta from "./Techcta";
import Reactimg from "../assets/react.png";
import Notion from "../assets/notion.jpg";
import Vite from "../assets/vitejs-logo.svg";
import Claude from "../assets/claude.avif";
import Next from "../assets/next.png";
import Js from "../assets/js.png";
import Tailwind from "../assets/tailwind.png";
import Framer from "../assets/framer.avif";
import Webflow from "../assets/webflow.svg";
import Sitecore from "../assets/sitecore.jpg";
import Git from "../assets/git.png";
import Azure from "../assets/azure.png";
import Chatgpt from "../assets/chatgpt.png";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Techstack() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Heading
        title="Behind the Build"
        subtitle="A collection of frameworks, tools, and platforms I work with to bring ideas to life."
      />
      <div className="flex extra-margin">
        <Link to="/contact">
          <p className="cta1 hover1">Contact Me</p>
        </Link>
        <EmailCTA />
      </div>
      <div className="techstack extra-extra-margin">
        <h3 className="white-text">Development and Design</h3>
        <div className="grid2c extra-margin">
          <Techcta
            image={Reactimg}
            link="https://react.dev/"
            title="React"
            description="Component-based library"
          />
          <Techcta
            image={Next}
            link="https://nextjs.org/"
            title="Next.js"
            description="React framework for production"
          />
          <Techcta
            image={Js}
            link="https://www.javascript.com/"
            title="JavaScript"
            description="Dynamic programming language"
          />
          <Techcta
            image={Tailwind}
            link="https://tailwindcss.com/"
            title="Tailwind CSS"
            description="Utility-first CSS framework"
          />
          <Techcta
            image={Sitecore}
            link="https://www.sitecore.com/"
            title="Sitecore"
            description="Enterprise-level CMS"
          />
        </div>
      </div>
      <div className="techstack extra-extra-margin">
        <h3 className="white-text">Low-Code Toolbox</h3>
        <div className="grid2c extra-margin">
          <Techcta
            image={Framer}
            link="https://www.framer.com/"
            title="Framer"
            description="Design and WebDev tool"
          />
          <Techcta
            image={Webflow}
            link="https://webflow.com/"
            title="Webflow"
            description="Visual web design platform"
          />
        </div>
      </div>
      <div className="techstack extra-extra-margin">
        <h3 className="white-text">Behind the Workflow</h3>
        <div className="grid2c extra-margin">
          <Techcta
            image={Vite}
            link="https://vite.dev/"
            title="Vite"
            description="Modern dev environment"
          />
          <Techcta
            image={Notion}
            link="https://www.notion.com/product"
            title="Notion"
            description="Notetaking + Organization"
          />
          <Techcta
            image={Git}
            link="https://git-scm.com/"
            title="Git"
            description="Version control system"
          />
          <Techcta
            image={Azure}
            link="https://azure.microsoft.com/en-in"
            title="Azure"
            description="Monitor. Optimize. Improve."
          />
        </div>
      </div>
      <div className="techstack extra-extra-margin">
        <h3 className="white-text">Thinking Machines</h3>
        <div className="grid2c extra-margin">
          <Techcta
            image={Claude}
            link="https://claude.ai/"
            title="Claude"
            description="Helpful AI assistant"
          />
          <Techcta
            image={Chatgpt}
            link="https://chatgpt.com/"
            title="ChatGPT"
            description="AI-powered chatbot"
          />
        </div>
      </div>
    </motion.div>
  );
}

export default Techstack;
