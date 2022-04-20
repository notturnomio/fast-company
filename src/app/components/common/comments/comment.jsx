import React, { useEffect, useState } from "react";
import api from "../../../api";
import { displayDate } from "../../../utils/displayDate";
import PropTypes from "prop-types";

const Comment = ({
  _id: id,
  userId,
  content,
  created_at: created,
  onDelete,
}) => {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    api.users.getById(userId).then((data) => {
      setUser(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="bg-light card-body mb-3">
      <div className="row">
        {isLoading ? (
          "Loading..."
        ) : (
          <div className="col">
            <div className="d-flex flex-start">
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${(
                  Math.random() + 1
                )
                  .toString(36)
                  .substring(7)}.svg`}
                alt="avatar"
                className="rounded-circle shadow-1-strong me-3"
                width="65"
                height="65"
              />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                      {user && user.name}{" "}
                      <span className="small">- {displayDate(created)}</span>
                    </p>
                    <button
                      onClick={() => onDelete(id)}
                      className="btn btn-sm text-primary d-flex align-items-center"
                    >
                      <i className="bi bi-x-lg" />
                    </button>
                  </div>
                  <p className="small mb-0">{content}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  _id: PropTypes.string,
  pageId: PropTypes.string,
  userId: PropTypes.string,
  content: PropTypes.string,
  created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onDelete: PropTypes.func,
};

export default Comment;
