import React, { useRef } from "react";
import styles from "../styles/PostTile.module.css";
import { FaEdit, FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useServer } from "../hooks/Server";
import { useAuth } from "../context/AuthContext";
import { getFormattedDate } from "../utils";

const PostTile = ({ post }) => {
  const deleteDialogRef = useRef(null);
  const navigate = useNavigate();
  const { deletePost: deletePostFromServer } = useServer();
  const { user } = useAuth();

  const openDeleteDialog = () => {
    deleteDialogRef.current.showModal();
  };

  const closeDeleteDialog = () => {
    deleteDialogRef.current.close();
  };

  const deletePost = () => {
    deletePostFromServer({ post, user }).then(() => {
      navigate("/", { replace: true });
    });
    closeDeleteDialog();
  };

  const shareLink = () => {
    // copy to clipboard and open share dialog
    navigator.share({
      title: post.title,
      text: post.short,
      author: post.author,
      url: `${process.env.REACT_APP_CLIENT_URL}/post/${post._id}`,
    });
  };

  const navigateToEdit = () => {
    navigate(`/edit/${post._id}`);
  };

  return (
    <div className={styles.postTile}>
      <dialog ref={deleteDialogRef} className={styles.dialog}>
        <div className={styles.dialogContent}>
          <h2>Are you sure you want to delete this post?</h2>
          <div className={styles.dialogButtons}>
            <button className={styles.dialogButton} onClick={deletePost}>
              Yes
            </button>
            <button className={styles.dialogButton} onClick={closeDeleteDialog}>
              No
            </button>
          </div>
        </div>
      </dialog>
      <div className={styles.content}>
        <Link to={`/post/${post._id}`}>
          <h2>{post.title}</h2>
          <h3 className={styles.short}>{post.short}</h3>
          <h4 className={styles.timestamp}>
            {post.createdAt && getFormattedDate(post.createdAt)}
          </h4>
        </Link>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={navigateToEdit}>
          <FaEdit />
        </button>
        <button className={styles.button} onClick={shareLink}>
          <FaShare />
        </button>
        <button className={styles.button} onClick={openDeleteDialog}>
          <MdDelete />
        </button>
      </div>
    </div>
  );
};

export default PostTile;
