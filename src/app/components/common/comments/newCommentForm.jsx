import React, { useState } from "react";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const NewCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    content: {
      isRequired: {
        message: "The message text can't be empty",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div>
      <h2>New Comment</h2>
      <form onSubmit={handleSubmit}>
        <TextAreaField
          value={data.content || ""}
          onChange={handleChange}
          name="content"
          label="Message"
          error={errors.content}
        />
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Send Message</button>
        </div>
      </form>
    </div>
  );
};

NewCommentForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default NewCommentForm;
