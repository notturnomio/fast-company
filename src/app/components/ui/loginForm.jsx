import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    stayLoggedIn: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "This field is required." },
      isEmail: { message: "Email address is invalid." },
    },
    password: {
      isRequired: { message: "This field is required." },
      isCapitalSymbol: {
        message: "Password must contain a minimum of 1 upper case letter.",
      },
      isContainDigit: {
        message: "Password must contain a minimum of 1 numeric character.",
      },
      min: {
        message: "Password must contain at least 8 characters.",
        value: 8,
      },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        type="text"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        value={data.stayLoggedIn}
        onChange={handleChange}
        name="stayLoggedIn"
      >
        Stay Logged In
      </CheckBoxField>
      <button
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto mb-4"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
