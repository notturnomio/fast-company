import React from "react";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
  return (
    <button {...rest} className="btn btn-secondary m-2">
      <i className={"bi bi-heart" + (status ? "-fill" : "")}></i>
    </button>
  );
};

Bookmark.propTypes = {
  status: PropTypes.bool,
};

export default Bookmark;
