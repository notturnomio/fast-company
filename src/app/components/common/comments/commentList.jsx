import React from "react";
import Comment from "./comment";
import PropTypes from "prop-types";

const CommentList = ({ comments, onDelete }) => {
  return comments.map((comment) => (
    <Comment key={comment._id} {...comment} onDelete={onDelete} />
  ));
};

CommentList.propTypes = {
  onDelete: PropTypes.func,
  user: PropTypes.object,
};

export default CommentList;
