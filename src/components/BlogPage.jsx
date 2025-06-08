import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Heading from "./Heading";
import { motion } from "framer-motion";
import BlogContentComp from "./BlogContentComp";
import Comment from "./thoughtsComp/Comment";
import { db } from "../firebase";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { validateContent } from "../utils/profanityFilter";
import { Link } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [isAnonymousComment, setIsAnonymousComment] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogDoc = await getDoc(doc(db, "blogs", id));
        if (blogDoc.exists()) {
          setBlog({ id: blogDoc.id, ...blogDoc.data() });
        } else {
          console.log("No such blog!");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (!id) return;

    const commentsRef = collection(db, "blogs", id, "comments");
    const q = query(commentsRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [id]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return date.toLocaleDateString("en-GB", options);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !id) return;

    if (!validateContent(newComment)) {
      return;
    }

    if (
      !isAnonymousComment &&
      commentName.trim() &&
      !validateContent(commentName)
    ) {
      return;
    }

    setIsSubmittingComment(true);

    try {
      const commentData = {
        content: newComment.trim(),
        name: isAnonymousComment
          ? "Anonymous"
          : commentName.trim() || "Anonymous",
        timestamp: serverTimestamp(),
        isAnonymous: isAnonymousComment,
      };

      await addDoc(collection(db, "blogs", id, "comments"), commentData);

      setNewComment("");
      setCommentName("");
      setIsAnonymousComment(false);
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error posting your comment. Please try again.");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleAnonymousCommentChange = (e) => {
    setIsAnonymousComment(e.target.checked);
    if (e.target.checked) {
      setCommentName("");
    }
  };

  if (loading) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </motion.div>
    );
  }

  if (!blog) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Heading title="Blog not found" subtitle="" />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Link to="/blogs">
        <p className="cta1 margin-bottom hover1">Back to List</p>
      </Link>
      <Heading title={blog.title} subtitle={blog.subtitle} />
      <div className="blog-image">
        <img src={blog.imageUrl} alt="Blog thumbnail" />
      </div>
      <BlogContentComp heading={blog.heading1} content={blog.content1} />
      <BlogContentComp heading={blog.heading2} content={blog.content2} />
      <BlogContentComp heading={blog.heading3} content={blog.content3} />

      <p className="timestamp gray-text">{formatTimestamp(blog.timestamp)}</p>

      <div className="comment-section extra-margin">
        <form onSubmit={handleCommentSubmit}>
          <textarea
            name="newComment"
            id="newComment"
            placeholder="Your comment"
            className="newComment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
          <div className="flex space-between align-btn noflexcomment">
            <div className="flex align-btn-mob">
              <input
                type="text"
                id="CommentName"
                name="CommentName"
                placeholder="Name"
                className={isAnonymousComment ? "disabled" : ""}
                value={commentName}
                onChange={(e) => setCommentName(e.target.value)}
                disabled={isAnonymousComment}
              />
              <label className="checkbox-label gray-text">
                <input
                  type="checkbox"
                  name="Anonymous-comment"
                  id="Anonymous-comment"
                  checked={isAnonymousComment}
                  onChange={handleAnonymousCommentChange}
                />
                <span>Stay Anonymous</span>
              </label>
            </div>
            <button
              type="submit"
              className="btn-reset hover1"
              disabled={isSubmittingComment}
            >
              {isSubmittingComment ? "Adding..." : "Add a Comment"}
            </button>
          </div>
        </form>
      </div>

      <div className="fetched-comments extra-margin">
        <h5 className="white-text">Comments</h5>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        ) : (
          <p id="nocomm" className="gray-text extra-margin">
            No Comments Yet
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default BlogPage;
