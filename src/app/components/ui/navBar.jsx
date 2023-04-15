import React from "react";
import { Link } from "react-router-dom";
import NavProfile from "./navProfile";
import { getIsLoggedIn } from "../../store/users";
import { useSelector } from "react-redux";

const NavBar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid w-75">
        <ul className="nav m-2">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">
              Main
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <Link className="nav-link" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
