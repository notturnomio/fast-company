import React, { useState, useEffect } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelect from "../common/form/multiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
import { useQualities } from "../../hooks/useQualities";
import { useProfession } from "../../hooks/useProfession";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

const RegisterForm = () => {
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    name: "",
    qualities: [],
    license: false,
  });

  const { signUp } = useAuth();

  const [errors, setErrors] = useState({});
  const { professions } = useProfession();
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id,
  }));

  const { qualities } = useQualities();
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id,
    color: qual.color,
  }));

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: { message: "This field is required." },
      isEmail: { message: "E-mail address is invalid." },
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
    name: {
      isRequired: { message: "This field is required." },
      min: {
        message: "Name must contain at least 3 characters.",
        value: 3,
      },
    },
    profession: { isRequired: { message: "This field is required." } },
    license: {
      isRequired: { message: "You must agree to the terms and conditions" },
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
    const newData = {
      ...data,
      qualities: data.qualities.map((quality) => quality.value),
    };
    try {
      await signUp(newData);
      history.push("/");
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="E-mail"
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
      <TextField
        label="Name"
        type="text"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <SelectField
        label="Your profession"
        value={data.profession}
        name="profession"
        onChange={handleChange}
        defaultOption={"Choose..."}
        options={professionsList}
        error={errors.profession}
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        name="sex"
        onChange={handleChange}
        value={data.sex}
        label="Your gender"
      />
      <MultiSelect
        options={qualitiesList}
        onChange={handleChange}
        defaultValue={data.qualities}
        label="Your qualities (multiple selection)"
        name="qualities"
      />
      <CheckBoxField
        value={data.license}
        onChange={handleChange}
        name="license"
        error={errors.license}
      >
        Agree to{" "}
        <a className="link-primary" role="button">
          Terms and Conditions
        </a>
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

export default RegisterForm;
