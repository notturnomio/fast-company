import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
  // const lastOne = Number(number.toString().slice(-1));
  // if (number > 4 && number < 22) return "'Человек тусанет"
  // if([2,3,4].indexOf(lastOne) >= 0) return 'Человека тусанут'
  if (length === 0) {
    return (
      <h2>
        <span className="badge bg-warning">No people left to meet</span>
      </h2>
    );
  } else {
    return length === 1 ? (
      <h2>
        <span className="badge bg-primary">
          {"Only " + length + " person to meet"}
        </span>
      </h2>
    ) : (
      <h2>
        <span className="badge bg-primary">{length + " people to meet"}</span>
      </h2>
    );
  }
};

SearchStatus.propTypes = {
  length: PropTypes.number.isRequired,
};

export default SearchStatus;
