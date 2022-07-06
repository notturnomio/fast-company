import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <NavBar />

        <QualitiesProvider>
          <ProfessionProvider>
            <Switch>
              <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
              <Route path="/login/:type?" component={Login} />
              <Route path="/logout" component={LogOut} />
              <Route path="/" exact component={Main} />
              <Redirect to="/" />
            </Switch>
          </ProfessionProvider>
        </QualitiesProvider>
      </AuthProvider>

      <ToastContainer />
    </div>
  );
}

export default App;
