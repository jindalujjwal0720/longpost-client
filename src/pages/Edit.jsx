import React from "react";
import Footer from "../components/Footer";
import styles from "../styles/Create.module.css";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { useServer } from "../hooks/Server";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Edit = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [post, setPost] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [changed, setChanged] = React.useState(false);
  const { user } = useAuth();
  const { getPost, editPost, error: serverError } = useServer();

  const hasChanged = () => {
    if (post) {
      console.log(post.content !== content);
      if (post.title !== title || post.content !== content) {
        setChanged(true);
      } else {
        setChanged(false);
      }
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    hasChanged();
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
    hasChanged();
  };

  const handleSave = (e) => {
    if (title.length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }
    if (content.length < 10) {
      setError("Content must be at least 10 characters");
      return;
    }
    setError(null);
    setLoading(true);
    editPost({
      title,
      content,
      post,
      user,
    }).then((data) => {
      if (!data) {
        setLoading(false);
        setError(`${serverError}`);
        return;
      }
      window.location.reload();
    });
  };

  React.useEffect(() => {
    setLoading(true);
    getPost(id).then((data) => {
      console.log(data);
      setPost(data);
      setTitle(data.title);
      setContent(data.content);
      setLoading(false);
    });
  }, [id]);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.create}>
            <h1>Edit</h1>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleTitleChange}
              value={title}
            />
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={handleContentChange}
            />
            <div className={styles.error}>{error}</div>
            <button onClick={handleSave} disabled={!changed}>
              Save
            </button>
          </div>
          <div className={styles.preview}>
            <h1>{title}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </>
      )}
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Edit;
