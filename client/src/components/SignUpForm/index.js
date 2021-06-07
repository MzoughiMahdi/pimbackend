import React from "react";

import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Check from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import propTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import "react-phone-number-input/style.css";

import PhoneInput from "react-phone-number-input";

const {
  default: signupPageStyle,
} = require("assets/jss/material-kit-pro-react/views/signupPageStyle");

const useStyles = makeStyles(signupPageStyle);
const SignUpForm = ({ handleSubmit }) => {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Card className={classes.cardSignup}>
        <h2 className={classes.cardTitle}>Register</h2>
        <CardBody>
          <GridContainer justify="center">
            <GridItem xs={12} sm={5} md={5}>
              <div className={classes.textCenter}>
                <Button justIcon round color="twitter">
                  <i className={classes.socials + " fab fa-twitter"} />
                </Button>
                {` `}
                <Button justIcon round color="dribbble">
                  <i className={classes.socials + " fab fa-dribbble"} />
                </Button>
                {` `}
                <Button justIcon round color="facebook">
                  <i className={classes.socials + " fab fa-facebook-f"} />
                </Button>
                {` `}
                <h4 className={classes.socialTitle}>or be classical</h4>
              </div>
              <Field
                name="firstName"
                component={CustomInput}
                labelText="First Name"
                id="firstName"
                formControlProps={{
                  fullWidth: true,
                }}
              />
              <Field
                name="lastName"
                component={CustomInput}
                labelText="Last Name"
                id="lastName"
                formControlProps={{
                  fullWidth: true,
                }}
              />
              <Field
                name="phone"
                component={CustomInput}
                labelText="Phone Number"
                id="phone"
                formControlProps={{
                  fullWidth: true,
                }}
              />
              <Field
                name="dateOfBirth"
                component={CustomInput}
                id="dateOfBirth"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "date",
                }}
              />
              <Field
                name="email"
                component={CustomInput}
                labelText="Email"
                id="email"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "email",
                }}
              />

              <Field
                name="password"
                component={CustomInput}
                labelText="Password"
                id="password"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "password",
                }}
              />
              <Field
                name="password2"
                component={CustomInput}
                labelText="Retype Password"
                id="password"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  type: "password",
                }}
              />

              <FormControlLabel
                classes={{
                  label: classes.label,
                }}
                control={
                  <Checkbox
                    tabIndex={-1}
                    onClick={() => handleToggle(1)}
                    checkedIcon={<Check className={classes.checkedIcon} />}
                    icon={<Check className={classes.uncheckedIcon} />}
                    classes={{
                      checked: classes.checked,
                      root: classes.checkRoot,
                    }}
                    checked={checked.indexOf(1) !== -1 ? true : false}
                  />
                }
                label={
                  <span>
                    I agree to the <a href="#pablo">terms and conditions</a>.
                  </span>
                }
              />
              <div className={classes.textCenter}>
                <Button simple type="submit" color="primary" size="lg">
                  Get started
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </CardBody>
      </Card>
    </form>
  );
};

SignUpForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
};

export default reduxForm({ form: "signupForm" })(SignUpForm);
