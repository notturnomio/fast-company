import React from "react";
import PropTypes, { oneOfType } from "prop-types";

const SelectField = ({
  label,
  value,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  const getInputClasses = () => {
    return "form-select " + (error ? "is-invalid" : "is-valid");
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: optionName.name,
          id: options[optionName]._id,
        }))
      : options;

  return (
    <div className="mb-4">
      <label htmlFor="selectProfession" className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="selectProfession"
        value={value}
        name="profession"
        onChange={onChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => {
            return (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            );
          })}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
};

export default SelectField;
