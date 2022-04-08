import React from "react";
import PropTypes, { oneOfType } from "prop-types";

const SelectField = ({
  label,
  value,
  name,
  onChange,
  defaultOption,
  options,
  error,
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const getInputClasses = () => {
    return "form-select " + (error ? "is-invalid" : "is-valid");
  };

  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          id: options[optionName]._id,
        }))
      : options;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id={name}
        value={value}
        name={name}
        onChange={handleChange}
      >
        <option disabled value="">
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => {
            return (
              <option key={option.id} value={option.id}>
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
  name: PropTypes.string,
  onChange: PropTypes.func,
  defaultOption: PropTypes.string,
  options: oneOfType([PropTypes.object, PropTypes.array]),
  error: PropTypes.string,
};

export default SelectField;
