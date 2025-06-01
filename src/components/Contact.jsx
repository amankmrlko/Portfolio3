import React, { useRef } from "react";
import Heading from "./Heading";
import { motion } from "framer-motion";
import EmailCTA from "./EmailCTA";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Contact() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameValue = nameRef.current.value.trim();
    const emailValue = emailRef.current.value.trim();

    if (nameValue === "" || !emailPattern.test(emailValue)) {
      alert("Please enter a valid name and email.");
      return;
    }

    const formData = new FormData(event.target);

    try {
      const response = await fetch("https://formspree.io/f/xpwabzqd", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        nameRef.current.value = "";
        emailRef.current.value = "";
        messageRef.current.value = "";
        alert("Thank you! Your message has been sent.");
      } else {
        alert("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Heading
        title="Say Hello ☕"
        subtitle="Whether it’s code, design, or coffee - I’m just a message away"
      />
      <div className="flex extra-margin">
        <a
          href="https://calendly.com/amankumar-lko"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="cta1 hover1">Schedule a Call</p>
        </a>
        <EmailCTA />
      </div>

      <div className="formcontainer extra-extra-margin">
        <h3 className="white-text extra-margin">Send a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group gray-text">
            <input
              ref={nameRef}
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              required
            />
          </div>

          <div className="form-group gray-text">
            <input
              ref={emailRef}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group gray-text">
            <textarea
              ref={messageRef}
              id="message"
              name="message"
              rows="5"
              placeholder="Message"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn hover1">
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default Contact;
