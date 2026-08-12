import React from "react";
import './styles.css';
import { HashRouter as Router, Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";

import Article from "./Article";
import ArticleList from "./ArticleList";
import Editor from "./Editor";
import LoginRegister from "./components/loginRegister/LoginRegister";
import Logout from "./Logout";
import Profile from "./Profile";
import Settings from "./Settings";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import { useAuth } from "./hooks/useAuth";

type PrivateRouteProps = {
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  exact?: boolean;
  path: string;
};

function PrivateRoute({ component: Component, ...rest }: PrivateRouteProps) {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (user ? <Component {...props} /> : <Redirect to="/login" />)}
    />
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <PrivateRoute path="/editor" exact component={Editor} />
        <PrivateRoute path="/editor/:slug" exact component={Editor} />
        <Route path="/login" exact component={LoginRegister} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/profile/:username" exact component={Profile} />
        <Route path="/profile/:username/favorites" exact component={Profile} />
        <Route path="/register" exact component={LoginRegister} />
        <PrivateRoute path="/settings" exact component={Settings} />
        <Route path="/:slug" exact component={Article} />
        <Route path="/" exact component={ArticleList} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
