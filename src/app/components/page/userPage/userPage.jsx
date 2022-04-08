import React, { useState, useEffect } from "react";
import api from "../../../api";
import { useHistory } from "react-router-dom";
import Qualities from "../../ui/qualities";
import PropTypes from "prop-types";

const UserPage = ({ userId }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  console.log(userId);

  const getAllUsers = () => {
    history.push("/users");
  };

  const handleEdit = () => {
    history.push(history.location.pathname + "/edit");
  };

  if (user) {
    return (
      <div className="m-4">
        <h1>{user.name}</h1>
        <h2>Profession: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>Completed Dates: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleEdit}>Edit User</button>
        <button onClick={getAllUsers}>Back To All Users</button>
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
