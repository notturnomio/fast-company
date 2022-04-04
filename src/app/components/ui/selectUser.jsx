import React from "react";
import { Link } from "react-router-dom";

const SelectUser = (user) => {
  return <Link to={`/users/${user.selected._id}`}>{user.selected.name}</Link>;
};

export default SelectUser;
