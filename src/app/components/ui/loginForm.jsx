import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { validator } from "../../utils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import TextField from "../common/form/textField";

const LoginForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    stayLoggedIn: false,
  });
  const [errors, setErrors] = useState({});
  const [inputError, setInputError] = useState(null);

  const { signIn } = useAuth();

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setInputError(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    try {
      await signIn(data);
      console.log(history);
      history.push(
        history.location.state?.from?.pathname
          ? history.location.state.from.pathname
          : "/"
      );
    } catch (error) {
      setInputError(error.message);
    }
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
        disabled={!isValid || inputError}
        className="btn btn-primary w-100 mx-auto mb-4"
      >
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
