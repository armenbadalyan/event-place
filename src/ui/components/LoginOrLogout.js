import React from "react";
import { inject, observer } from "mobx-react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

function LoginOrLogout({ authStore }) {
  if (authStore.isLoggedIn) {
    return <LogoutButton />;
  } else {
    return <LoginButton />;
  }
}

export default inject("authStore")(observer(LoginOrLogout));
