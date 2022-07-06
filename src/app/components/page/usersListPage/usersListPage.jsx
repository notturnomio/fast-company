import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UsersTable from "../../ui/usersTable";
import _ from "lodash";
import SearchUser from "../../ui/searchUser";
import { useUser } from "../../../hooks/useUsers";
import { useProfession } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading: professionLoading, professions } = useProfession();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

  const pageSize = 8;

  const { users } = useUser();
  // console.log(users);
  const [searchedUsers, setSearchedUsers] = useState("");
  const { currentUser } = useAuth();

  // const handleDelete = (userId) => {
  //   setUsers(users.filter((user) => user._id !== userId));
  //   console.log(userId);
  // };

  const handleToggleBookMark = (id) => {
    const newArray = users.map((user) => {
      if (user._id === id) {
        return { ...user, bookmark: !user.bookmark };
      }
      return user;
    });
    // setUsers(newArray);
    console.log(newArray);
  };

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
    function filterUsersList(data) {
      const filteredUsers = searchedUsers
        ? data.filter((user) =>
            user.name.toLowerCase().includes(searchedUsers.toLowerCase())
          )
        : selectedProf
        ? data.filter((user) => {
            // JSON.stringify(user.profession) === JSON.stringify(selectedProf)
            return user.profession._id === selectedProf._id;
          })
        : data;
      return filteredUsers.filter((user) => user._id !== currentUser._id);
    }

    const filteredUsers = filterUsersList(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    const clearFilter = () => {
      setSelectedProf();
    };

    return (
      <div className="d-flex w-75">
        {!professionLoading && professions && (
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
        <div className="d-flex flex-column flex-grow-1 p-3">
          <SearchStatus length={count} />
          <SearchUser onChange={handleSearch} value={searchedUsers} />
          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
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

UsersListPage.propTypes = {
  users: PropTypes.array,
};

export default UsersListPage;
