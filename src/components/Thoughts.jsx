import React, { useState, useEffect, useCallback, useRef } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Heading from "./Heading";
import { motion } from "framer-motion";
import Post from "./thoughtsComp/Post";
import ThreadPost from "./thoughtsComp/ThreadPost";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

function Thoughts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const observerTarget = useRef(null);
  const POSTS_PER_PAGE = 5;

  const fetchInitialPosts = useCallback(async () => {
    try {
      setLoading(true);
      const postsRef = collection(db, "Posts");
      const q = query(
        postsRef,
        orderBy("timestamp", "desc"),
        limit(POSTS_PER_PAGE)
      );

      const snapshot = await getDocs(q);
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === POSTS_PER_PAGE);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore || !lastDoc) return;

    try {
      setLoading(true);
      const postsRef = collection(db, "Posts");
      const q = query(
        postsRef,
        orderBy("timestamp", "desc"),
        startAfter(lastDoc),
        limit(POSTS_PER_PAGE)
      );

      const snapshot = await getDocs(q);
      const newPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (newPosts.length > 0) {
        setPosts((prev) => [...prev, ...newPosts]);
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(newPosts.length === POSTS_PER_PAGE);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastDoc]);

  useEffect(() => {
    const postsRef = collection(db, "Posts");
    const q = query(postsRef, orderBy("timestamp", "desc"), limit(3));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!refreshing) {
        const latestPosts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const currentTopPostId = posts[0]?.id;
        const latestTopPostId = latestPosts[0]?.id;

        if (
          currentTopPostId &&
          latestTopPostId &&
          currentTopPostId !== latestTopPostId
        ) {
          fetchInitialPosts();
        }
      }
    });

    return () => unsubscribe();
  }, [posts, refreshing, fetchInitialPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMorePosts();
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
  }, [hasMore, loading, loadMorePosts]);

  useEffect(() => {
    fetchInitialPosts();
  }, [fetchInitialPosts]);

  const handlePostAdded = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      fetchInitialPosts().then(() => {
        setRefreshing(false);
      });
    }, 1000);
  }, [fetchInitialPosts]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Heading
        title="Byte-Sized Thoughts"
        subtitle="A casual space for devs to rant, rave, and learn."
      />

      <Post onPostAdded={handlePostAdded} />

      {posts.length === 0 && !loading ? (
        <div className="extra-margin text-center">
          <p className="gray-text">
            No posts yet. Be the first to start a discussion!
          </p>
        </div>
      ) : (
        posts.map((post) => <ThreadPost key={post.id} post={post} />)
      )}

      <div ref={observerTarget} className="loading-container">
        {loading && hasMore && (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <p className="gray-text extra-margin text-center">
            No more posts to load
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default Thoughts;
