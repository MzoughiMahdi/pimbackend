// import React from "react";
// import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
// import { Router, Route, Switch } from "react-router";

// import "assets/scss/material-kit-pro-react.scss?v=1.9.0";

// // pages for this product
// import AboutUsPage from "views/AboutUsPage/AboutUsPage.js";
// import BlogPostPage from "views/BlogPostPage/BlogPostPage.js";
// import BlogPostsPage from "views/BlogPostsPage/BlogPostsPage.js";
// import ComponentsPage from "views/ComponentsPage/ComponentsPage.js";
// import ContactUsPage from "views/ContactUsPage/ContactUsPage.js";
// import EcommercePage from "views/EcommercePage/EcommercePage.js";
// import LandingPage from "views/LandingPage/LandingPage.js";
// import LoginPage from "views/LoginPage/LoginPage.js";
// import PresentationPage from "views/PresentationPage/PresentationPage.js";
// import PricingPage from "views/PricingPage/PricingPage.js";
// import ProfilePage from "views/ProfilePage/ProfilePage.js";
// import ProductPage from "views/ProductPage/ProductPage.js";
// import SectionsPage from "views/SectionsPage/SectionsPage.js";
// import ShoppingCartPage from "views/ShoppingCartPage/ShoppingCartPage.js";
// import SignupPage from "views/SignupPage/SignupPage.js";
// import ErrorPage from "views/ErrorPage/ErrorPage.js";

// var hist = createBrowserHistory();

// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       <Route path="/about-us" component={AboutUsPage} />
//       <Route path="/blog-post" component={BlogPostPage} />
//       <Route path="/blog-posts" component={BlogPostsPage} />
//       <Route path="/components" component={ComponentsPage} />
//       <Route path="/contact-us" component={ContactUsPage} />
//       <Route path="/ecommerce-page" component={EcommercePage} />
//       <Route path="/landing-page" component={LandingPage} />
//       <Route path="/login-page" component={LoginPage} />
//       <Route path="/pricing" component={PricingPage} />
//       <Route path="/profile-page" component={ProfilePage} />
//       <Route path="/product-page" component={ProductPage} />
//       <Route path="/sections" component={SectionsPage} />
//       <Route path="/shopping-cart-page" component={ShoppingCartPage} />
//       <Route path="/signup-page" component={SignupPage} />
//       <Route path="/error-page" component={ErrorPage} />
//       <Route path="/" component={PresentationPage} />
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );

import "react-toastify/dist/ReactToastify.css";
import "assets/scss/material-kit-pro-react.scss?v=1.9.0";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import App from "containers/AppRouter";
import store from " _redux/store";

toast.configure({
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  className: "toast-container",
});
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={App} />

        <ToastContainer />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
