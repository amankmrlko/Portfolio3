import React, { useState } from "react";
import Heading from "./Heading";
import { motion } from "framer-motion";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { validateContent } from "../utils/profanityFilter";
import { Link } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function BlogPost() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    heading1: "",
    content1: "",
    heading2: "",
    content2: "",
    heading3: "",
    content3: "",
    image: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", file);
    cloudinaryFormData.append("upload_preset", "blog-image-amankr");

    try {
      console.log("Uploading to Cloudinary with preset: blog-image");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddlte5vms/image/upload",
        {
          method: "POST",
          body: cloudinaryFormData,
        }
      );

      const data = await response.json();
      console.log("Cloudinary response:", data);

      if (!response.ok) {
        console.error("Cloudinary error details:", data);
        throw new Error(
          `Failed to upload image: ${data.error?.message || "Unknown error"}`
        );
      }

      return data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const validateForm = () => {
    const {
      title,
      subtitle,
      heading1,
      content1,
      heading2,
      content2,
      heading3,
      content3,
    } = formData;

    if (
      !title.trim() ||
      !subtitle.trim() ||
      !heading1.trim() ||
      !content1.trim() ||
      !heading2.trim() ||
      !content2.trim() ||
      !heading3.trim() ||
      !content3.trim()
    ) {
      alert("Please fill in all required fields.");
      return false;
    }

    if (validateContent) {
      const fieldsToValidate = [
        title,
        subtitle,
        heading1,
        content1,
        heading2,
        content2,
        heading3,
        content3,
      ];
      for (let field of fieldsToValidate) {
        if (!validateContent(field)) {
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!formData.image) {
      alert("Please select an image to upload.");
      return;
    }

    setIsSubmitting(true);
    setUploadProgress("Uploading image...");

    try {
      const imageUrl = await uploadImageToCloudinary(formData.image);
      setUploadProgress("Saving blog post...");

      const now = new Date();
      const istTime = new Date(
        now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
      );
      const istString = istTime.toLocaleString("en-IN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
      });

      const blogData = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        heading1: formData.heading1.trim(),
        content1: formData.content1.trim(),
        heading2: formData.heading2.trim(),
        content2: formData.content2.trim(),
        heading3: formData.heading3.trim(),
        content3: formData.content3.trim(),
        imageUrl: imageUrl,
        timestamp: serverTimestamp(),
        createdAt: istString,
        createdAtISO: istTime.toISOString(),
        timezone: "Asia/Kolkata",
      };

      const docRef = await addDoc(collection(db, "blogs"), blogData);

      console.log("Blog post created with ID:", docRef.id);
      alert("Blog post published successfully!");

      setFormData({
        title: "",
        subtitle: "",
        heading1: "",
        content1: "",
        heading2: "",
        content2: "",
        heading3: "",
        content3: "",
        image: null,
      });

      const fileInput = document.getElementById("image");
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Error publishing blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Heading
        title="Post a New Article"
        subtitle="Share your thoughts with the world!"
      />
      <div className="flex extra-margin">
        <Link to="/login" onClick={handleLogout}>
          <p className="cta1 hover1">Logout</p>
        </Link>
      </div>
      <div className="blogpost-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="subtitle"
            id="subtitle"
            placeholder="Subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="text"
            name="heading1"
            id="heading1"
            placeholder="Heading 1"
            value={formData.heading1}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="content1"
            id="content1"
            placeholder="Content 1"
            value={formData.content1}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="text"
            name="heading2"
            id="heading2"
            placeholder="Heading 2"
            value={formData.heading2}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="content2"
            id="content2"
            placeholder="Content 2"
            value={formData.content2}
            onChange={handleInputChange}
            required
          ></textarea>
          <input
            type="text"
            name="heading3"
            id="heading3"
            placeholder="Heading 3"
            value={formData.heading3}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="content3"
            id="content3"
            placeholder="Content 3"
            value={formData.content3}
            onChange={handleInputChange}
            required
          ></textarea>
          <label className="white-text" htmlFor="image">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="custom-file margin-top"
            onChange={handleFileChange}
            required
          />

          {uploadProgress && (
            <div className="upload-progress white-text">{uploadProgress}</div>
          )}

          <button type="submit" className="btn-login" disabled={isSubmitting}>
            {isSubmitting ? "POSTING..." : "POST"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default BlogPost;
