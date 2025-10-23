import React from "react";
import Heading from "./Heading";
import { motion } from "framer-motion";
import Aman from "../assets/AmanAbout.jpg";
import { Link } from "react-router-dom";
import EmailCTA from "./EmailCTA";
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

function About() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="about-wrapper">
        <Heading
          title="About Aman"
          subtitle="Based in India, I'm a full-stack developer passionate about building fast, reliable, and thoughtful digital experiences. I enjoy turning ideas into scalable products, from crafting smooth interfaces to designing robust back-end systems. With experience across modern technologies, I focus on writing clean, efficient code that bridges design and functionality. Outside of tech, I love playing guitar, producing music, reading, and playing chess, always looking for new ways to stay creative and curious."
        />

        <img className="amanimg" src={Aman} alt="Aman" />
        <div className="aboutPara gray-text">
          <p>
            My journey into web development began with curiosity, a drive to
            understand how ideas become experiences on the web. Over time, that
            curiosity turned into a deep passion for building products that not
            only look good but work reliably at scale. With a B.Tech degree and
            a hands-on learning mindset, I've grown from shaping intuitive
            interfaces to designing full-stack systems that bring those
            interfaces to life.
          </p>
          <br />
          <p>
            At Tata Consultancy Services, I've contributed to high-performance
            web solutions across both front-end and back-end domains. Building
            responsive UIs, optimizing APIs, and ensuring smooth deployments. I
            focus on writing clean, maintainable code and love solving
            real-world challenges that require both technical precision and
            creative problem-solving.
          </p>
          <br />
          <p>
            I believe great software isn't just functional. It's reliable,
            secure, and built with empathy for the user. Whether it's
            architecting a system, integrating real-time features, or refining
            the user journey, my goal is always the same: to create digital
            experiences that feel effortless and purposeful.
          </p>
          <br />
          <p>
            Beyond work, I'm deeply into music - I play the guitar and love
            producing my own tracks. I also enjoy chess for its strategy and
            structure, and I read widely to keep my creativity sharp and
            perspective broad.
          </p>
          <br />
          <p>
            Working with me means collaborating with someone who values
            craftsmanship, consistency, innovation, and who's always ready to
            push a project beyond what's expected.
          </p>
        </div>
        <div className="flex extra-margin">
          <Link to="/projects">
            <p className="cta1 hover1">My Work</p>
          </Link>
          <EmailCTA />
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
      </div>
    </motion.div>
  );
}

export default About;
