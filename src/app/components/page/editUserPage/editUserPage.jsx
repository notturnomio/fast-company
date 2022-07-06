import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import BackButton from "../../common/backButton";
import { useAuth } from "../../../hooks/useAuth";
import { useQualities } from "../../../hooks/useQualities";
import { useProfession } from "../../../hooks/useProfession";

const EditUserPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const { currentUser, updateUserData } = useAuth();
  const { qualities, isLoading: isLoadingQualities } = useQualities();
  const qualitiesList = qualities.map((qual) => ({
    label: qual.name,
    value: qual._id,
    color: qual.color,
  }));
  const { professions, isLoading: isLoadingProfessions } = useProfession();
  const professionsList = professions.map((prof) => ({
    label: prof.name,
    value: prof._id,
  }));
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    await updateUserData({
      ...data,
      qualities: data.qualities.map((qual) => qual.value),
    });
    history.push(`/users/${currentUser._id}`);
    // console.log(data);
  };

  function getQualitiesListByIds(qualitiesId) {
    const qualitiesArray = [];
    for (const qualId of qualitiesId) {
      for (const qual of qualities) {
        if (qual._id === qualId) {
          qualitiesArray.push(qual);
          break;
        }
      }
    }
    return qualitiesArray;
  }

  const transformData = (data) => {
    const result = getQualitiesListByIds(data).map((qual) => ({
      label: qual.name,
      value: qual._id,
    }));
    return result;
  };

  useEffect(() => {
    if (!isLoadingProfessions && !isLoadingQualities && currentUser && !data) {
      setData({
        ...currentUser,
        qualities: transformData(currentUser.qualities),
      });
    }
  }, [isLoadingProfessions, isLoadingQualities, currentUser, data]);

  useEffect(() => {
    if (data && isLoading) setIsLoading(false);
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Fill in your e-mail." },
      isEmail: { message: "E-mail address is invalid." },
    },
    name: {
      isRequired: { message: "Fill in your name." },
    },
  };

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <div className="container mt-5">
      <BackButton />
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {!isLoading && Object.keys(professionsList).length > 0 ? (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                error={errors.name}
              />
              <TextField
                label="E-mail"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
              />
              <SelectField
                key={professionsList}
                label="Your profession"
                defaultOption="Choose..."
                options={professionsList}
                name="profession"
                value={data.profession}
                onChange={handleChange}
                error={errors.profession}
              />
              <RadioField
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                  { name: "Other", value: "other" },
                ]}
                value={data.sex}
                name="sex"
                onChange={handleChange}
                label="Choose your gender"
              />
              <MultiSelectField
                defaultValue={data.qualities}
                options={qualitiesList}
                onChange={handleChange}
                name="qualities"
                label="Choose your qualities (multiple selection)"
              />
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto mb-4"
              >
                Update changes
              </button>
            </form>
          ) : (
            <div className="m-4">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserPage;
