import React from "react";
import { Redirect, useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUsers";

const Users = () => {
  const params = useParams();
  // console.log(params);
  const { userId, edit } = params;
  const { currentUser } = useAuth();
  return (
    <div className="d-flex justify-content-center">
      <UserProvider>
        {userId ? (
          edit ? (
            userId === currentUser._id ? (
              <EditUserPage />
            ) : (
              <Redirect to={`/users/${currentUser._id}/edit`} />
            )
          ) : (
            <UserPage userId={userId} />
          )
        ) : (
          <UsersListPage />
        )}
      </UserProvider>
    </div>
  );
};
export default Users;
