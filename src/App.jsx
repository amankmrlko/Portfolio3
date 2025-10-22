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
import { FaDownload } from "react-icons/fa6";
import Notfound from "./components/Notfound";
import Login from "./components/Login";
import Blogpost from "./components/Blogpost";
import ProtectedRoute from "./components/ProtectedRoute";
import Blogs from "./components/Blogs";
import BlogPage from "./components/BlogPage";
import ChatSpace from "./components/ChatSpace";

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
        <Route path="/login" element={<Login />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/chat-space" element={<ChatSpace />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route
          path="/blogpost"
          element={
            <ProtectedRoute>
              <Blogpost />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Notfound />} />
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
          <a
            href="https://drive.google.com/uc?export=download&id=12NvSoT09oymjuhqndzcD8rpdQ_5nFyne"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="resume-height white-text hover1">
              <p>
                <FaDownload size={15} />
                &nbsp;&nbsp;&nbsp;Resume
              </p>
            </div>
          </a>
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
