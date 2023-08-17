import React, { useEffect, useState } from "react";
import styles from "./../styles/Post.module.css";
import Footer from "../components/Footer";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useLocation } from "react-router-dom";
import { useServer } from "../hooks/Server";
import Loading from "../components/Loading";
import { getTimeToRead, getFormattedDate } from "../utils";

const Post = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({});
  const { getPost, increaseReadAsync, error: serverError } = useServer();

  useEffect(() => {
    setLoading(true);
    getPost(id).then((data) => {
      if (!data) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setPost(data);
    });
    // Increase reads after 5 seconds
    const unsubscribe = setTimeout(() => {
      increaseReadAsync(id);
    }, 5000);
    return () => clearTimeout(unsubscribe);
  }, [id]);

  return (
    <div className={styles.container}>
      {serverError && <div className={styles.error}>{serverError}</div>}
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className={styles.content}>
            <h1>{post.title}</h1>
            <div className={styles.authorContainer}>
              <div className={styles.left}>
                <div>
                  <a href={`mailto:${post.author}`}>{post.author}</a>
                </div>
                <div>{getTimeToRead(post.content?.length)} read</div>
              </div>
              <div className={styles.right}>
                <div>{post.createdAt && getFormattedDate(post.createdAt)}</div>
                <div>
                  {post.reads} {post.reads === 1 ? "read" : "reads"}
                </div>
              </div>
            </div>
            <ReactMarkdown skipHtml={true}>{post.content}</ReactMarkdown>
            <div className={styles.postBottom}>
              <div className={styles.left}>
                <div>
                  Written by <a href={`mailto:${post.author}`}>{post.author}</a>
                </div>
                <div>{post.content?.length} characters</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Post;
