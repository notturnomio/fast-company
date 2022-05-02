import React from "react";
import PropTypes from "prop-types";
import { useProfession } from "../../hooks/useProfession";

const Profession = ({ id }) => {
  console.log(id);
  const { isLoading, getProfession } = useProfession();
  const prof = getProfession(id);
  console.log(prof.name);
  return !isLoading ? <p>{prof.name}</p> : "Loading...";
};

Profession.propTypes = {
  id: PropTypes.string,
};

export default Profession;
