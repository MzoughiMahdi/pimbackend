import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from "components/CustomButtons/Button.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import propTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import loginPageStyle from "assets/jss/material-kit-pro-react/views/loginPageStyle.js";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(loginPageStyle);

const LoginForm = ({ handleSubmit }) => {
  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <CardHeader color="primary" signup className={classes.cardHeader}>
        <h4 className={classes.cardTitle}>Login</h4>
        <div className={classes.socialLine}>
          <Button
            justIcon
            color="transparent"
            className={classes.iconButtons}
            onClick={(e) => e.preventDefault()}
          >
            <i className="fab fa-twitter" />
          </Button>
          <Button
            justIcon
            color="transparent"
            className={classes.iconButtons}
            onClick={(e) => e.preventDefault()}
          >
            <i className="fab fa-facebook" />
          </Button>
          <Button
            justIcon
            color="transparent"
            className={classes.iconButtons}
            onClick={(e) => e.preventDefault()}
          >
            <i className="fab fa-google-plus-g" />
          </Button>
        </div>
      </CardHeader>
      <p className={classes.description + " " + classes.textCenter}>
        Or Be Classical
      </p>
      <CardBody signup>
        <Field
          name="email"
          component={CustomInput}
          labelText="email"
          id="additional_info"
          formControlProps={{
            fullWidth: true,
          }}
        />
        <Field
          name="password"
          component={CustomInput}
          labelText="password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
        />
      </CardBody>
      <div className={classes.textCenter}>
        <Button simple type="submit" color="primary" size="lg">
          Get started
        </Button>
      </div>
    </form>
  );
};
LoginForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
};

export default reduxForm({ form: "loginForm" })(LoginForm);
