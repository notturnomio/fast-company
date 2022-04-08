import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
