import React from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Formik, Field, ErrorMessage } from "formik";
import {
  StyledForm,
  StyledFormInput,
  ErrorLabel,
  SubmitButton,
  Link
} from "./FormStyles";

class Login extends React.Component {
  onSubmit = (values, { setSubmitting, setErrors }) => {
    const { authStore, history } = this.props;
    authStore
      .logIn(values.username, values.password)
      .then(res => {
        if (res.errors) {
          setErrors(res.errors);
        } else {
          history.goBack();
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  onClick = e => {
    e.preventDefault();
    this.props.authStore.setModeRegistration();
  };

  render() {
    return (
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={this.onSubmit}
      >
        {({ isSubmitting, errors }) => (
          <StyledForm noValidate>
            <Field
              type="text"
              name="username"
              label="Username"
              placeholder="Username"
              autocomplete="username"
              component={StyledFormInput}
            />
            <ErrorMessage name="username" component={ErrorLabel} />

            <Field
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
              autocomplete="password"
              component={StyledFormInput}
            />

            <ErrorMessage name="password" component={ErrorLabel} />
            <ErrorLabel>{errors.non_field_errors}</ErrorLabel>

            <SubmitButton
              type="submit"
              label="Sign in"
              disabled={isSubmitting}
            />

            <Link label="Register" onClick={this.onClick} />
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default withRouter(inject("authStore")(observer(Login)));
