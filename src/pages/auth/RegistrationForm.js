import React from "react";
import { inject, observer } from "mobx-react";
import { Formik, Field, ErrorMessage } from "formik";
import {
  StyledForm,
  StyledFormInput,
  ErrorLabel,
  SubmitButton,
  Link
} from "./FormStyles";

class Registration extends React.Component {
  onSubmit = (values, { setSubmitting, setErrors }) => {
    const { authStore } = this.props;
    authStore
      .register(values.email, values.password)
      .then(res => {
        if (res.errors) {
          setErrors(res.errors);
        } else {
          authStore.setModeLogin();
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  onClick = e => {
    e.preventDefault();
    this.props.authStore.setModeLogin();
  };

  render() {
    return (
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={this.onSubmit}
      >
        {({ isSubmitting, setErrors }) => (
          <StyledForm noValidate>
            <Field
              type="email"
              name="email"
              placeholder="Email"
              autocomplete="username"
              component={StyledFormInput}
            />
            <ErrorMessage name="email" component={ErrorLabel} />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              autocomplete="password"
              component={StyledFormInput}
            />
            <ErrorMessage name="password" component={ErrorLabel} />
            <ErrorMessage name="non_field_errors" component={ErrorLabel} />
            <SubmitButton
              type="submit"
              label="Register"
              disabled={isSubmitting}
            />

            <Link label="I already have an account" onClick={this.onClick} />
          </StyledForm>
        )}
      </Formik>
    );
  }
}

export default inject("authStore")(observer(Registration));
