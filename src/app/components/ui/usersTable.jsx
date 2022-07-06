import React from "react";
import PropTypes from "prop-types";

import Bookmark from "../common/bookmark";
import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookmark,
  ...rest
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Name",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>,
    },
    qualities: {
      name: "Qualities",
      component: (user) => <Qualities qualities={user.qualities} />,
    },
    professions: {
      name: "Profession",
      component: (user) => <Profession id={user.profession} />,
    },
    dates: { path: "completedMeetings", name: "Dates" },
    rate: { path: "rate", name: "Rating" },
    bookmark: {
      path: "bookmark",
      name: "Bookmark",
      component: (user) => (
        <Bookmark
          status={user.bookmark}
          onClick={() => onToggleBookmark(user._id)}
        />
      ),
    },
  };

  return (
    <Table
      onSort={onSort}
      selectedSort={selectedSort}
      columns={columns}
      data={users}
    />
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookmark: PropTypes.func.isRequired,
};

export default UsersTable;
