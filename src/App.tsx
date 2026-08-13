import React from "react";
import './styles.css';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { useCheckTokenValid } from "./hooks/useCheckTokenValid";
import { useAuth } from "./hooks/useAuth";
import PrivateRoute from "./components/common/PrivateRoute";
import Article from "./Article";
import ArticleList from "./ArticleList";
import Editor from "./Editor";
import LoginRegister from "./components/loginRegister/LoginRegister";
import Logout from "./Logout";
import Profile from "./Profile";
import Settings from "./Settings";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";

function App() {

  const { user } = useAuth();
  const { isExpired } = useCheckTokenValid(user?.token ?? null);

  return (
    <Router>
      <Header />
      <Switch>
        {/* Accessibble for signed in only */}
        <PrivateRoute path="/editor">
          <Editor />
        </PrivateRoute>
        <PrivateRoute path="/editor/:slug">
          <Editor />
        </PrivateRoute>
        <PrivateRoute path="/profile/:username">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/profile/:username/favorites">
           <Profile />
        </PrivateRoute>
        <PrivateRoute path="/settings">
           <Settings />
        </PrivateRoute>
        {/* Accessibble for all */}
        <Route path="/login" exact component={LoginRegister} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/register" exact component={LoginRegister} />
        <Route path="/:slug" exact component={Article} />
        <Route path="/" exact component={ArticleList} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
