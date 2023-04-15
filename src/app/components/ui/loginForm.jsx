import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    stayLoggedIn: false,
  });
  const [errors, setErrors] = useState({});
  const inputError = useSelector(getAuthErrors());

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "This field is required." },
    },
    password: {
      isRequired: { message: "This field is required." },
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
    const redirect = history.location.state?.from?.pathname
      ? history.location.state.from.pathname
      : "/";
    dispatch(login({ payload: data, redirect }));
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
      {inputError && <div className="text-danger mb-4">{inputError}</div>}
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto mb-4"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
