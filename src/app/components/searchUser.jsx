import React from "react";
import PropTypes from "prop-types";

const SearchUser = ({ onChange, value }) => {
  return (
    <form>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          id="searchUserName"
          name="searchUser"
          onChange={onChange}
          placeholder="Search user by first or last name..."
          value={value}
        />
      </div>
    </form>
  );
};

SearchUser.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};

export default SearchUser;
