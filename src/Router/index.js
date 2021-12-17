import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { HomePage, AccountPage } from "../views";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <AccountPage />
      </Switch>
      <Switch>
        <HomePage />
      </Switch>
    </Router>
  );
};

export default AppRouter;
