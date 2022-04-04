import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UserPage from "./components/page/userPage";
import Users from "./layouts/users";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/:userId?" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
