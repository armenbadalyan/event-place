import { decorate, observable, action } from "mobx";
import api from "../common/api";

class AuthStore {
  isLoggedIn = false;
  mode = "login";

  register = (email, password) => {
    return api
      .post("/users/register", { email, password })
      .catch(({ response }) => {
        return { errors: this.formatErrors(response) };
      });
  };

  logIn = (username, password) => {
    return api
      .post("/users/token/", { username, password })
      .then(
        action("Log in success", ({ data }) => {
          this.isLoggedIn = true;
          api.setSessionToken(data.token);
          return data;
        })
      )
      .catch(({ response }) => {
        return { errors: this.formatErrors(response) };
      });
  };

  logOut = () => {
    api.clearSessionToken();
    this.isLoggedIn = false;
  };

  setModeLogin = () => {
    this.mode = "login";
  };

  setModeRegistration = () => {
    this.mode = "registration";
  };

  checkSession = () => {
    return api
      .get("/users/me")
      .then(
        action(({ data }) => {
          if (!data.id) {
            this.invalidateSession();
          } else {
            this.isLoggedIn = true;
          }
        })
      )
      .catch(({ response }) => {
        if (response.status === 401 || response.status === 403) {
          this.invalidateSession();
        }
      });
  };

  invalidateSession = action(() => {
    this.isLoggedIn = false;
    api.clearSessionToken();
  });

  formatErrors(errorResponse) {
    let formattedErrors = {};
    if (errorResponse.data) {
      let serverErrors = errorResponse.data;
      for (let key in serverErrors) {
        if (serverErrors.hasOwnProperty(key))
          formattedErrors[key] = serverErrors[key][0];
      }
    } else {
      formattedErrors["non_field_errors"] = "Unknown error";
    }

    return formattedErrors;
  }
}

decorate(AuthStore, {
  isLoggedIn: observable,
  errors: observable,
  mode: observable,
  logIn: action,
  logOut: action,
  register: action,
  checkSession: action,
  setModeLogin: action,
  setModeRegistration: action
});

export default new AuthStore();
