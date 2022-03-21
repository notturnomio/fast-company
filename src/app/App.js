import React from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import UserCard from "./layouts/userCard";
import Users from "./layouts/users";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users" exact component={Users} />
        <Route path="/users/:postId?" component={UserCard} />
      </Switch>
    </div>
  );
}

export default App;
