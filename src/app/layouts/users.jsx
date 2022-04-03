import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import PropTypes from "prop-types";
import GroupList from "../components/groupList";
import api from "../api";
import SearchStatus from "../components/searchStatus";
import UsersTable from "../components/usersTable";
import _ from "lodash";
import SearchUser from "../components/searchUser";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfession] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

  const pageSize = 8;

  const [users, setUsers] = useState();
  const [searchedUsers, setSearchedUsers] = useState("");

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    setUsers(newArray);
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf, searchedUsers]);

  const handleProfessionSelect = (item) => {
    searchedUsers !== "" && setSearchedUsers("");
    setSelectedProf(item);
  };

  const handleSearch = ({ target }) => {
    setSelectedProf(undefined);
    setSearchedUsers(target.value);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  if (users) {
    const filteredUsers = searchedUsers
      ? users.filter((user) =>
          user.name.toLowerCase().includes(searchedUsers.toLowerCase())
        )
      : selectedProf
      ? users.filter((user) => {
          // JSON.stringify(user.profession) === JSON.stringify(selectedProf)
          return user.profession._id === selectedProf._id;
        })
      : users;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Clear Selection
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <SearchUser onChange={handleSearch} value={searchedUsers} />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookmark={handleToggleBookMark}
            />
          )}
          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return <div className="m-4">Loading...</div>;
};

Users.propTypes = {
  users: PropTypes.array,
};

export default Users;
