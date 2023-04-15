import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
  getProfessionById,
  getProfessionsLoadingStatus,
} from "../../store/professions";

const Profession = ({ id }) => {
  // console.log(id);
  const professionsLoading = useSelector(getProfessionsLoadingStatus());
  const prof = useSelector(getProfessionById(id));

  return !professionsLoading ? <p>{prof.name}</p> : "Loading...";
};

Profession.propTypes = {
  id: PropTypes.string,
};

export default Profession;
