import React, { useEffect, useState } from "react";
import api from "../../api";
import CommentList from "../common/comments/commentList";
import NewCommentForm from "../common/comments/newCommentForm";
import { useParams } from "react-router-dom";
import { orderBy } from "lodash";

const Comments = () => {
  const { userId } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(
    () =>
      api.comments
        .fetchCommentsForUser(userId)
        .then((data) => setComments(data)),
    []
  );

  const handleCreateComment = (data) => {
    api.comments
      .add({ ...data, pageId: userId })
      .then((data) => setComments([...comments, data]));
  };

  const handleDeleteComment = (id) => {
    api.comments.remove(id).then((id) => {
      setComments(comments.filter((c) => c._id !== id));
    });
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
