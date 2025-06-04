import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { validateContent } from "../../utils/profanityFilter";

function Post({ onPostAdded }) {
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim()) return;

    if (!validateContent(content)) {
      return;
    }

    if (!isAnonymous && name.trim() && !validateContent(name)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const postData = {
        content: content.trim(),
        name: isAnonymous ? "Anonymous" : name.trim() || "Anonymous",
        timestamp: serverTimestamp(),
        isAnonymous: isAnonymous,
      };

      await addDoc(collection(db, "Posts"), postData);

      setContent("");
      setName("");
      setIsAnonymous(false);

      if (onPostAdded) {
        onPostAdded();
      }
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Error posting your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnonymousChange = (e) => {
    setIsAnonymous(e.target.checked);
    if (e.target.checked) {
      setName("");
    }
  };

  return (
    <div className="extra-extra-margin new-post-container">
      <h3 className="white-text extra-margin">Start a Discussion</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          name="content"
          id="content"
          placeholder="Write here.."
          className="newpostcontent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="text"
          id="PostName"
          name="PostName"
          placeholder="Name"
          className={isAnonymous ? "disabled" : ""}
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isAnonymous}
        />
        <label className="checkbox-label gray-text">
          <input
            type="checkbox"
            name="Anonymous"
            id="Anonymous"
            checked={isAnonymous}
            onChange={handleAnonymousChange}
          />
          <span>Stay Anonymous</span>
        </label>
        <button
          type="submit"
          className="submit-btn hover1"
          disabled={isSubmitting}
        >
          {isSubmitting ? "POSTING..." : "POST"}
        </button>
      </form>
    </div>
  );
}

export default Post;
