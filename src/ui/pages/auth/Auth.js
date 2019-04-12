import React from "react";
import { inject, observer } from "mobx-react";
import styled from "styled-components";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";
import logo from "../../resources/images/logo.svg";
import { Label } from "../../components/Label";

export function Registration({ authStore }) {
  let AuthFormComponent,
    message = "Welcome!";

  if (authStore.mode === "login") {
    AuthFormComponent = LoginForm;
    message += " Please sign in.";
  } else if (authStore.mode === "registration") {
    AuthFormComponent = RegistrationForm;
    message += " Please register.";
  }

  return (
    <AuthPage>
      <Logo src={logo} />
      <WelcomeMessage>{message}</WelcomeMessage>
      <AuthFormComponent />
    </AuthPage>
  );
}

export default inject("authStore")(observer(Registration));

const AuthPage = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  margin: 60px auto;

  @media (min-width: 992px) {
    width: 33%;
  }
  @media (min-width: 576px) and (max-width: 991px) {
    width: 50%;
  }
  @media (max-width: 575px) {
    width: 66%;
  }
`;

const Logo = styled.img`
  width: 50%;
  min-width: 150px;
  max-width: 200px;
  margin-bottom: 20px;
`;

const WelcomeMessage = styled(Label)`
  margin: 15px 0;
  font-size: 1rem;
`;
