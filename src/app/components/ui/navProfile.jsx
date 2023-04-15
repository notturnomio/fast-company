import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";
import { useSelector } from "react-redux";

const NavProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  if (!currentUser) return "Loading...";
  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex m-2 align-items-center">
        <div className="m-2">{currentUser.name}</div>
        <img
          src={currentUser.avatar}
          alt="avatar"
          className="img-responsive rounded-circle m-2"
          height="40"
        />
      </div>
      <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
        <Link to={`/users/${currentUser._id}`} className="dropdown-item">
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
