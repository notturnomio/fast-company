import React, { useEffect, useState } from "react";
import api from "../../../api";
import SelectField from "../form/selectField";
import TextAreaField from "../form/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
const initialData = { userId: "", content: "" };

const NewCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    userId: {
      isRequired: {
        message: "Choose a user to send a message",
      },
    },
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

  useEffect(() => {
    api.users.fetchAll().then(setUsers);
  }, []);

  const clearForm = () => {
    setData(initialData);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  const usersOptions =
    users &&
    Object.keys(users).map((userOption) => ({
      name: users[userOption].name,
      value: users[userOption]._id,
    }));

  return (
    <div>
      <h2>New Comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          label="User"
          defaultOption="Choose..."
          options={usersOptions}
          name="userId"
          value={data.userId}
          onChange={handleChange}
          error={errors.userId}
        />
        <TextAreaField
          value={data.content}
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
