import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const UserCard = ({ user }) => {
  const { currentUser } = useAuth();
  const history = useHistory();
  const handleEdit = () => {
    history.push(history.location.pathname + "/edit");
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {user._id === currentUser._id && (
          <button
            className="position-absolute top-0 end-0 btn btn-light btn-sm"
            onClick={handleEdit}
          >
            <i className="bi bi-pencil-square" />
          </button>
        )}
        <div className="d-flex flex-column align-items-center text-center position-relative">
          <img
            src={user.avatar}
            className="rounded-circle shadow-1-strong"
            alt="avatar"
            width="150"
            height="150"
          />
          <div className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{user.profession.name}</p>
            <div className="text-muted">
              <i className="bi bi-caret-down-fill text-primary" role="button" />
              <i className="bi bi-caret-up text-secondary" role="button" />
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
