import api from "./api";

export default class AuthService {
  logIn(username, password) {
    return api
      .post("/users/token/", { username, password })
      .then(({ data }) => {
        api.setSessionToken(data.token);
        return data;
      })
      .catch(({ response }) => {
        return Promise.reject(this.formatErrors(response));
      });
  }
  logOut() {
    api.clearSessionToken();
  }
  register(username, password) {
    return api
      .post("/users/register", { email: username, password })
      .catch(({ response }) => {
        return Promise.reject(this.formatErrors(response));
      });
  }
  onAuthError(callback) {
    api.onAuthError(() => {
      api.clearSessionToken();
      if (typeof callback === "function") {
        callback();
      }
    });
  }
  me() {
    return api.get("/users/me").then(({ data }) => {
      if (!data.id) {
        return Promise.reject();
      }
    });
  }

  formatErrors(errorResponse) {
    let formattedErrors = {};
    if (errorResponse) {
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
