import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { observer, inject } from "mobx-react";

function LoginLogoutButton({ authStore }) {
  return (
    <Link to="/auth">
      <Button label="Sign in" onClick={authStore.setModeLogin} />
    </Link>
  );
}

export default inject("authStore")(observer(LoginLogoutButton));
