import React from "react";
import Button from "./Button";
import { observer, inject } from "mobx-react";

function LoginLogoutButton({ authStore }) {
  return <Button label="Sign out" onClick={authStore.logOut} />;
}

export default inject("authStore")(observer(LoginLogoutButton));
