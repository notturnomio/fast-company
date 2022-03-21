import React, { useState, useEffect } from "react";
import api from "../api";
import { useHistory, useParams } from "react-router-dom";
import QualitiesList from "../components/qualitiesList";

const UserCard = () => {
  const history = useHistory();
  const getAllUsers = () => {
    history.push("/users");
  };
  const params = useParams();

  const [user, setUser] = useState();

  useEffect(() => {
    api.users.getById(params.postId).then((data) => setUser(data));
  }, []);

  if (user) {
    return (
      <div id={user._id} className="m-4">
        <h1>{user.name}</h1>
        <h2>Profession: {user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
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

export default UserCard;
