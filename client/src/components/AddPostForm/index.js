/*eslint-disable*/
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import contactUsStyle from "assets/jss/material-kit-pro-react/views/contactUsStyle.js";
import { Field, reduxForm } from "redux-form";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import propTypes from "prop-types";

const useStyles = makeStyles(contactUsStyle);

const AddPostForm = ({ handleSubmit }) => {
  const classes = useStyles();

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Field
        name="title"
        component={CustomInput}
        labelText="title"
        id="email"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          type: "text",
        }}
      />
      <Field
        name="text"
        component={(props) => (
          <CKEditor
            activeClass="editor"
            content={props.value}
            editor={ClassicEditor}
            events={{
              change: (param) => onChange(param),
            }}
          />
        )}
      />
      <div className={classes.textCenter}>
        <Button color="primary" type="submit" round>
          Add
        </Button>
      </div>
    </form>
  );
};

AddPostForm.propTypes = {
  handleSubmit: propTypes.func.isRequired,
};

export default reduxForm({ form: "AddPostForm" })(AddPostForm);
