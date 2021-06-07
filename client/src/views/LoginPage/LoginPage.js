/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Favorite from "@material-ui/icons/Favorite";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";
import image from "assets/img/bg7.jpg";
import LoginForm from "components/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { login } from " _redux/actions/auth";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(loginPageStyle);

export default function LoginPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { isLogged } = useSelector((state) => state.auth);
  isLogged && history.push("/");
  const handleSubmit = (val) => {
    dispatch(login(val, history));
  };

  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <LoginForm onSubmit={handleSubmit} />
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
