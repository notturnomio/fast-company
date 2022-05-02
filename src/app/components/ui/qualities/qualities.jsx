import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Qualities = ({ id }) => {
  const { getQuality } = useQualities();
  const { _id, color, name } = getQuality(id);
  return (
    <span id={_id} className={"badge m-1 bg-" + color}>
      {name}
    </span>
  );
};

Qualities.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Qualities;
