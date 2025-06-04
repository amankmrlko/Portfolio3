import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { validateContent } from "../../utils/profanityFilter";
import Comment from "./Comment";

function ThreadPost({ post }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentName, setCommentName] = useState("");
  const [isAnonymousComment, setIsAnonymousComment] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

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

  const formatContent = (content) => {
    return content.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  useEffect(() => {
    if (!post?.id) return;

    const commentsRef = collection(db, "Posts", post.id, "comments");
    const q = query(commentsRef, orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [post?.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!newComment.trim() || !post?.id) return;

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

      await addDoc(collection(db, "Posts", post.id, "comments"), commentData);

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

  if (!post || !post.id) return null;

  return (
    <div className="ThreadPost extra-margin">
      <p className="white-text extra-margin">{post.name}</p>
      <p className="gray-text threadcontent">{formatContent(post.content)}</p>

      <p className="timestamp gray-text">{formatTimestamp(post.timestamp)}</p>

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
    </div>
  );
}

export default ThreadPost;
