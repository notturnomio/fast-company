import React from "react";
import PropTypes from "prop-types";
import Bookmark from "./bookmark";
import QualitiesList from "./qualitiesList";
import Table from "./table";

const UsersTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookmark,
  onDelete,
  ...rest
}) => {
  const columns = {
    name: { path: "name", name: "Name" },
    qualities: {
      name: "Qualities",
      component: (user) => <QualitiesList qualities={user.qualities} />,
    },
    professions: { path: "profession.name", name: "Profession" },
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
    delete: {
      component: (user) => (
        <button
          className="btn btn-danger m-2"
          onClick={() => onDelete(user._id)}
        >
          Delete
        </button>
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
  onDelete: PropTypes.func.isRequired,
};

export default UsersTable;
