import React, { useEffect } from "react";
import CommentList from "../common/comments/commentList";
import NewCommentForm from "../common/comments/newCommentForm";
import { orderBy } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from "../../store/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const isLoading = useSelector(getCommentsLoadingStatus());

  const comments = useSelector(getComments());

  useEffect(() => {
    dispatch(loadCommentsList(userId));
  }, [userId]);

  const handleCreateComment = (data) => {
    dispatch(addComment({ ...data, pageId: userId }));
  };

  const handleDeleteComment = (id) => {
    dispatch(removeComment(id));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <NewCommentForm onSubmit={handleCreateComment} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            {!isLoading ? (
              <CommentList
                comments={sortedComments}
                onDelete={handleDeleteComment}
              />
            ) : (
              "Loading..."
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
