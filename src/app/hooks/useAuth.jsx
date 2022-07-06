import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import localStorageService, {
  setTokens,
} from "../services/localStorage.service";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: { key: process.env.REACT_APP_FIREBASE_KEY },
});
const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  async function signIn({ email, password }) {
    try {
      const { data } = await httpAuth.post("accounts:signInWithPassword", {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        switch (message) {
          case "EMAIL_NOT_FOUND" || "INVALID_PASSWORD":
            throw new Error("Invalid e-mail or password");
          default:
            throw new Error("Too many attempts. Try again later");
        }
      }
    }
  }

  function logOut() {
    localStorageService.removeAuthData();
    setCurrentUser(null);
    history.push("/");
  }

  async function signUp({ email, password, ...rest }) {
    try {
      const { data } = await httpAuth.post("accounts:signUp", {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await createUser({
        _id: data.localId,
        email,
        rate: randomInt(1, 5),
        completedMeetings: randomInt(0, 200),
        avatar: `https://avatars.dicebear.com/api/avataaars/${(
          Math.random() + 1
        )
          .toString(36)
          .substring(7)}.svg`,
        ...rest,
      });
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response.data.error;
      console.log(code, message);
      if (code === 400) {
        if (message === "EMAIL_EXISTS") {
          const errorObject = { email: "User with this email already exists" };
          throw errorObject;
        }
      }
    }
  }

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async function createUser(data) {
    try {
      const { content } = await userService.create(data);
      setCurrentUser(content);
      console.log(content);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  }

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setCurrentUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateUserData(data) {
    try {
      const { content } = await userService.update(data);
      setCurrentUser(content);
      // console.log(content);
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  }

  function errorCatcher(error) {
    const { message } = error;
    setError(message);
  }

  useEffect(() => {
    if (error !== null) {
      toast(error);
      setError(null);
    }
  }, [error]);

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, signIn, logOut, updateUserData, currentUser }}
    >
      {!isLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AuthProvider;
