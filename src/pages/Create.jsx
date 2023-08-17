import React from "react";
import Footer from "../components/Footer";
import styles from "../styles/Create.module.css";
import { useAuth } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import { useServer } from "../hooks/Server";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [error, setError] = React.useState(null);
  const { user } = useAuth();
  const { createPost, error: serverError } = useServer();
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
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
    createPost({
      user,
      title,
      content,
    }).then((data) => {
      if (!data) {
        setError(`${serverError}`);
        return;
      }
      navigate(`/`, { replace: true });
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.create}>
        <h1>Create</h1>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleTitleChange}
        />
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" onChange={handleContentChange} />
        {error && <div className={styles.error}>{error}</div>}
        <button onClick={handleSave}>Save</button>
      </div>
      <div className={styles.preview}>
        {(title.length > 0 || content.length > 0) ? (
          <>
            <h1>{title}</h1>
            <ReactMarkdown>{content}</ReactMarkdown>
          </>
        ) : (
          <div className={styles.nothingToPreview}>Nothing to preview</div>
        )}
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default Create;
