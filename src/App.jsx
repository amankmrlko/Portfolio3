import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Explore from "./components/Explore";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Techstack from "./components/Techstack";
import Thoughts from "./components/Thoughts";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { AnimatePresence } from "framer-motion";
import NavMobile from "./components/NavMobile";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Explore />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/techstack" element={<Techstack />} />
        <Route path="/thoughts" element={<Thoughts />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="canvas">
        <NavBar />
        <NavMobile />
        <div className="layout">
          <div className="main-content">
            <AnimatedRoutes />
          </div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
