import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import React from "react";
s;
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
  id,
  label,
  isPassword,
  type,
  input,
  forgotPasswordLink,
  rightIcon,
  leftIcon,
  forgotPasswordMessage,
  meta: { submitFailed, error, warning },
  ...props
}) => {
  const [isPasswordShown, toggleShowPassword] = React.useState(false);
  const handletoggleShowPassword = () => {
    toggleShowPassword(!isPasswordShown);
  };
  const passwordFieldType = isPasswordShown ? "text" : "password";
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div
      className={`form-groupe ${
        submitFailed && (error || warning) ? "u-has-error" : ""
      }`}
    >
      <label className="form-label" htmlFor={id}>
        <span className="d-flex justify-content-between align-items-center">
          {label}

          {isPassword && forgotPasswordMessage && (
            <Link
              className="link-muted  font-weight-normal"
              to={forgotPasswordLink}
            >
              {forgotPasswordMessage}
            </Link>
          )}
        </span>
      </label>
      <div className="MuiInputBase-root MuiInput-root MuiInput-underline makeStyles-underline-517 MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart">
        {leftIcon && (
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              {leftIcon}
            </span>
          </div>
        )}
        {type === "textarea" ? (
          <textarea
            {...input}
            type={!isPassword ? type : passwordFieldType}
            {...props}
            className="form-control"
          />
        ) : (
          <div>
            <input
              {...input}
              type={!isPassword ? type : passwordFieldType}
              {...props}
              className="form-control"
            />
          </div>
        )}
        {rightIcon && (
          <div className="input-group-append">
            <span className="input-group-text" id="basic-addon2">
              {rightIcon}
            </span>
          </div>
        )}
        {isPassword && (
          <div className="input-group-append">
            <span className="input-group-text p-0">
              <InputAdornment>
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handletoggleShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {!isPasswordShown ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            </span>
          </div>
        )}
      </div>
      {submitFailed &&
        ((error && (
          <div className="invalid-feedback" style={{ display: "block" }}>
            {error}
          </div>
        )) ||
          (warning && (
            <div className="invalid-feedback" style={{ display: "block" }}>
              {warning}
            </div>
          )))}
    </div>
  );
};

Input.propTypes = {
  toggleShowPassword: PropTypes.func,
  props: PropTypes.object,
  isPassword: PropTypes.bool,
  input: PropTypes.object,
  type: PropTypes.string,
  isPasswordShown: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  forgotPasswordMessage: PropTypes.string,
  forgotPasswordLink: PropTypes.string,
  meta: PropTypes.object,
  rightIcon: PropTypes.node,
  leftIcon: PropTypes.node,
};

export default Input;
