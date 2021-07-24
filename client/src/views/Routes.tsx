import React, { useContext } from "react";
import { Switch, Route, Redirect, RouteProps } from "react-router-dom";

import LoginPage from "./LoginPage";
import BoardPage from "./BoardPage";
import DashboardPage from "./DashboardPage";
import ErrorPage from "./ErrorPage";

import { UserContext } from "context/UserContext";

interface ProtectedRouteProps extends RouteProps {
  auth: string | null;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ auth, ...props }) => {
  return auth === "success" ? <Route {...props} /> : <Redirect to="/" />;
};

const Routes: React.FC = () => {
  const {
    userState: { authStatus },
  } = useContext(UserContext);

  return (
    <Switch>
      <Route
        exact path="/"
        component={authStatus === "success" ? DashboardPage : LoginPage}
      />
      <ProtectedRoute
        auth={authStatus}
        path="/board/:id"
        component={BoardPage}
      />
      <Route exact path="/error/:code" component={ErrorPage} />
      <Route render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
