import { useState } from "react";
import axios from "axios";

export const useServer = () => {
  const api_url = process.env.REACT_APP_SERVER_URL;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createPost = async ({ user, title, content }) => {
    setLoading(true);
    if (!user) {
      setError("You are not logged in");
      setLoading(false);
      return null;
    }
    const data = axios
      .post(`${api_url}/create`, {
        userID: user.uid,
        author: user.email,
        title,
        content,
      })
      .then((response) => {
        setLoading(false);
        return response.data;
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
        return null;
      });
    return data;
  };

  const editPost = async ({ post, title, content, user }) => {
    setLoading(true);
    if (post.userID !== user.uid) {
      setError("You are not the author of this post");
      setLoading(false);
      return null;
    }
    const data = axios
      .patch(`${api_url}/edit/${post._id}`, {
        title,
        content,
        userID: user.uid,
      })
      .then((response) => {
        setLoading(false);
        return response.data;
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
        return null;
      });
    return data;
  };

  const getPosts = async (userID) => {
    setLoading(true);
    const data = axios
      .get(`${api_url}/posts/${userID}`)
      .then((response) => {
        setLoading(false);
        return response.data?.posts;
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
        return null;
      });
    return data;
  };

  const getPost = async (postID) => {
    setLoading(true);
    const data = axios
      .get(`${api_url}/post/${postID}`)
      .then((response) => {
        setLoading(false);
        return response.data.post;
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
        return null;
      });
    return data;
  };

  const deletePost = async ({ post, user }) => {
    setLoading(true);
    if (post.userID !== user.uid) {
      setError("You are not the author of this post");
      setLoading(false);
      return null;
    }
    const data = axios
      .delete(`${api_url}/delete/${post._id}`, {
        data: { userID: user.uid },
      })
      .then((response) => {
        setLoading(false);
        return response.data;
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
        return null;
      });
    return data;
  };

  const increaseReadAsync = async (postID) => {
    const data = axios
      .patch(`${api_url}/read/${postID}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        setError(error.response.data.message);
        setLoading(false);
        return null;
      });
    return data;
  };

  return {
    loading,
    error,
    createPost,
    editPost,
    getPosts,
    getPost,
    deletePost,
    increaseReadAsync,
  };
};
