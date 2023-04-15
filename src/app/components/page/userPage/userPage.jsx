import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Comments from "../../ui/comments";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import { useSelector } from "react-redux";
import { getUserById } from "../../../store/users";

const UserPage = ({ userId }) => {
  const user = useSelector(getUserById(userId));

  const history = useHistory();
  const getAllUsers = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <div className="container w-75">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments />
            <button className="btn btn-primary mt-4" onClick={getAllUsers}>
              Back To All Users
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="m-4">Loading...</div>;
  }
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default UserPage;
