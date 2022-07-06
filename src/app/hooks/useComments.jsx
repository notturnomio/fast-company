import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useAuth } from "./useAuth";
import { nanoid } from "nanoid";
import commentService from "../services/comment.service";
import { toast } from "react-toastify";

const CommentsContext = React.createContext();

export const useComments = () => {
  return useContext(CommentsContext);
};

export const CommentsProvider = ({ children }) => {
  const { userId } = useParams();
  const { currentUser } = useAuth();
  const [comments, setComments] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getComments();
  }, [userId]);

  useEffect(() => {
    if (error !== null) {
      toast.error(error);
      setError(null);
    }
  }, [error]);

  function errorCatcher(error) {
    const { message } = error;
    setError(message);
  }

  async function createComment(data) {
    const comment = {
      ...data,
      _id: nanoid(),
      pageId: userId,
      userId: currentUser._id,
      created_at: Date.now(),
    };
    try {
      const { content } = await commentService.createComment(comment);
      // console.log(content);
      setComments((prevState) => [...prevState, content]);
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getComments() {
    try {
      const { content } = await commentService.getComments(userId);
      setComments(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function removeComment(_id) {
    try {
      const { content } = await commentService.removeComment(_id);
      if (content === null) {
        setComments((prevState) => prevState.filter((c) => c._id !== _id));
      }
    } catch (error) {
      errorCatcher(error);
    }
  }

  return (
    <CommentsContext.Provider
      value={{ comments, createComment, removeComment, isLoading }}
    >
      {children}
    </CommentsContext.Provider>
  );
};

CommentsProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
