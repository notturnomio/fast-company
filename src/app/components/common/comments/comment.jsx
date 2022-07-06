import React from "react";
import { displayDate } from "../../../utils/displayDate";
import PropTypes from "prop-types";
import { useUser } from "../../../hooks/useUsers";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const Comment = ({
  userId,
  _id: id,
  content,
  created_at: created,
  onDelete,
}) => {
  const { getUserById } = useUser();
  const user = getUserById(userId);
  const { currentUser } = useAuth();

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        <div className="col">
          <div className="d-flex flex-start">
            <img
              src={user.avatar}
              alt="avatar"
              className="rounded-circle shadow-1-strong me-3"
              width="65"
              height="65"
            />
            <div className="flex-grow-1 flex-shrink-1">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="mb-1">
                    {user && <Link to={`/users/${userId}`}>{user.name}</Link>}{" "}
                    <span className="small">- {displayDate(created)}</span>
                  </p>
                  {userId === currentUser._id && (
                    <button
                      onClick={() => onDelete(id)}
                      className="btn btn-sm text-primary d-flex align-items-center"
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  )}
                </div>
                <p className="small mb-0">{content}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  userId: PropTypes.string,
  _id: PropTypes.string,
  pageId: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onDelete: PropTypes.func,
};

export default Comment;
