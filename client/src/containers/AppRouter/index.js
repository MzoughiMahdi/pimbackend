import { Redirect, Route, Switch } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PresentationPage from "views/PresentationPage/PresentationPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
import PrivateRoute from "./PrivateRoute";
import LoggedOutRoute from "./LoggedOutRouter";
import SignUpPage from "views/SignupPage/SignupPage";
import ProfilePage from "views/ProfilePage/ProfilePage";
import BlogPostPage from "views/BlogPostPage/BlogPostPage";
import AddBlogPage from "views/AddBlogPage";

const App = () => {
  const dispatch = useDispatch();
  const { isLogged } = useSelector(({ auth }) => auth);

  return (
    <div>
      <div className="pt-5 mt-5">
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <LoggedOutRoute exact path="/login" component={LoginPage} />
          <PrivateRoute exact path="/home" component={PresentationPage} />
          <LoggedOutRoute exact path="/about-us" component={AboutUsPage} />
          <LoggedOutRoute exact path="/add-post" component={AddBlogPage} />
          <LoggedOutRoute exact path="/signup-page" component={SignUpPage} />
          <LoggedOutRoute exact path="/profile-page" component={ProfilePage} />
          <LoggedOutRoute exact path="/blog-post" component={BlogPostPage} />
        </Switch>
      </div>
    </div>
  );
};

export default App;
