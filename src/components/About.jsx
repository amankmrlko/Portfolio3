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
          subtitle="Based in India, I’m a front-end developer passionate about building responsive and engaging web experiences. With experience in modern technologies like React.js, JavaScript, and Tailwind CSS, I focus on creating interfaces that are both functional and visually refined. Outside of tech, I enjoy playing guitar, producing music, reading, and playing chess - always finding new ways to stay creative and curious."
        />

        <img className="amanimg" src={Aman} alt="Aman" />
        <div className="aboutPara gray-text">
          <p>
            My journey into web development started with a deep curiosity about
            how the digital world works and a strong desire to create seamless
            and engaging user experiences. With a B.Tech degree and a hands-on
            approach to learning, I have turned that curiosity into a career by
            bringing ideas to life through responsive, accessible, and scalable
            interfaces using tools like React.js, JavaScript, and Tailwind CSS.
          </p>
          <br />
          <p>
            At Tata Consultancy Services, I have contributed to building high
            performance web solutions, working on everything from front-end
            development to debugging live production issues. I take pride in
            writing clean and efficient code, and in creating user interfaces
            that are both visually appealing and functionally solid.
            <p>
              <br />
              <p>
                For me, good design is not just about how it looks but how it
                works and how it feels. I aim to make sure every project I work
                on delivers a clear and thoughtful user experience.
              </p>
              <br />
              <p>
                Outside of work, I am passionate about music. I play the guitar
                and enjoy producing music in my free time. I also love playing
                chess, which helps me stay sharp and focused, and I spend a lot
                of time reading both fiction and nonfiction to keep my mind
                inspired.
              </p>
              <br />
            </p>
            Working with me means collaborating with someone who values
            creativity, precision, and digital craftsmanship. I am always ready
            to take on new challenges and excited to build something
            exceptional.
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
