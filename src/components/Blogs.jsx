import React, { useState, useEffect, useRef } from "react";
import Heading from "./Heading";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import BlogCTA from "./BlogCTA";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
} from "firebase/firestore";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const observerTarget = useRef();
  const loadingRef = useRef(loading);
  const hasMoreRef = useRef(hasMore);

  loadingRef.current = loading;
  hasMoreRef.current = hasMore;

  const fetchBlogs = async (isInitialLoad = false) => {
    if (loading) return;

    setLoading(true);

    try {
      const blogsRef = collection(db, "blogs");
      let q;

      if (isInitialLoad || !lastVisible) {
        q = query(blogsRef, orderBy("timestamp", "desc"), limit(6));
      } else {
        q = query(
          blogsRef,
          orderBy("timestamp", "desc"),
          startAfter(lastVisible),
          limit(6)
        );
      }

      const querySnapshot = await getDocs(q);
      const newBlogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (newBlogs.length < 6) {
        setHasMore(false);
      }

      if (isInitialLoad) {
        setBlogs(newBlogs);
      } else {
        setBlogs((prev) => [...prev, ...newBlogs]);
      }

      if (querySnapshot.docs.length > 0) {
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(true);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasMoreRef.current &&
          !loadingRef.current
        ) {
          fetchBlogs();
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Heading
        title="Brain Dump"
        subtitle="Code, tech, and everything in between"
      />
      <div className="flex extra-margin">
        <Link to="/blogpost">
          <p className="cta1 hover1">Post New Blog</p>
        </Link>
      </div>
      <div className="grid2c gap10px">
        {blogs.map((blog) => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <BlogCTA
              image={blog.imageUrl}
              title={blog.title}
              description={formatDate(blog.timestamp)}
            />
          </Link>
        ))}
      </div>

      <div ref={observerTarget} className="loading-container">
        {loading && hasMore && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
        {!hasMore && blogs.length > 0 && (
          <p className="gray-text extra-margin text-center">
            No more posts to load
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default Blogs;
