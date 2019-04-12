import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./ui/pages/home/Home";
import { ThemeProvider } from "styled-components";
import theme from "./ui/theme";
import GlobalStyles from "./ui/global-styles";
import EventDetails from "./ui/pages/event-details/EventDetails";
import Auth from "./ui/pages/auth/Auth";
import { inject } from "mobx-react";

class App extends Component {
  componentDidMount() {
    this.props.authStore.checkSession();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyles />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/event/:id" component={EventDetails} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </>
      </ThemeProvider>
    );
  }
}

export default inject("authStore")(App);
