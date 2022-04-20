import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Comments from "../../ui/comments";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  // console.log(userId);

  const getAllUsers = () => {
    history.push("/users");
  };

  if (user) {
    return (
      <div className="container">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <UserCard user={user} />
            <QualitiesCard data={user.qualities} />
            <MeetingsCard value={user.completedMeetings} />
          </div>
          <div className="col-md-8">
            <Comments />
            <button className="btn btn-primary" onClick={getAllUsers}>
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
