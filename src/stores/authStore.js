import { decorate, observable, action } from "mobx";

export class AuthStore {
  isLoggedIn = false;
  mode = "login";

  constructor(authService) {
    this.authService = authService;
    this.authService.onAuthError(() => {
      this.setLoggedOut();
    });
  }

  register = (username, password) => {
    return this.authService.register(username, password).then(({ data }) => {
      return data;
    });
  };

  logIn = (username, password) => {
    return this.authService.logIn(username, password).then(
      action("Log in success", ({ data }) => {
        this.setLoggedIn();
        return data;
      })
    );
  };

  logOut = () => {
    this.authService.logOut();
    this.setLoggedOut();
  };

  checkSession = () => {
    return this.authService
      .me()
      .then(
        action(() => {
          this.setLoggedIn();
          return true;
        })
      )
      .catch(() => {
        return false;
      });
  };

  setModeLogin = () => {
    this.mode = "login";
  };

  setModeRegistration = () => {
    this.mode = "registration";
  };

  setLoggedIn = action(() => {
    this.isLoggedIn = true;
  });

  setLoggedOut = action(() => {
    this.isLoggedIn = false;
  });
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
