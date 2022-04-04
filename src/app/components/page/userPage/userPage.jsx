import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const getAllUsers = () => {
    history.push("/users");
  };

  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  if (user) {
    return (
      <div id={user._id} className="m-4">
        <h1>{user.name}</h1>
        <h2>Profession: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>Completed Dates: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button
          onClick={() => {
            getAllUsers();
          }}
        >
          All users
        </button>
      </div>
    );
  }
  return <div className="m-4">Loading...</div>;
};

UserPage.propTypes = {
  userId: PropTypes.string,
};
export default UserPage;
