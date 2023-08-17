import React, { useEffect, useState } from "react";
import AboutLongPost from "../components/AboutLongPost";
import { useAuth } from "../context/AuthContext";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import PostTile from "../components/PostTile";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useServer } from "../hooks/Server";

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const { getPosts } = useServer();

  useEffect(() => {
    if (user) {
      getPosts(user.uid).then((data) => {
        setPosts(data || []);
      });
    }
  }, [user]);

  return (
    <div className={styles.container}>
      <Header />
      <AboutLongPost />
      {user && (
        <div className={styles.main}>
          <Link to="/create" className={styles.createLink}>
            <button className={styles.createButton}>Create Post</button>
          </Link>
          <h2 className={styles.title}>Recent Posts</h2>
          <div className={styles.posts}>
            {posts.map((post, index) => (
              <PostTile key={index} post={post} />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Home;
