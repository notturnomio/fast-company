import React from "react";
import CommentList from "../common/comments/commentList";
import NewCommentForm from "../common/comments/newCommentForm";
import { orderBy } from "lodash";
import { useComments } from "../../hooks/useComments";

const Comments = () => {
  const { comments, createComment, removeComment } = useComments();

  const handleCreateComment = (data) => {
    createComment(data);
  };

  const handleDeleteComment = (id) => {
    removeComment(id);
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        {" "}
        <div className="card-body">
          <NewCommentForm onSubmit={handleCreateComment} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body">
            <h2>Comments</h2>
            <hr />
            <CommentList
              comments={sortedComments}
              onDelete={handleDeleteComment}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
