import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./pages/home/Home";
import { ThemeProvider } from "styled-components";
import theme from "./common/theme";
import GlobalStyles from "./common/global-styles";
import EventDetails from "./pages/event-details/EventDetails";
import Auth from "./pages/auth/Auth";

class App extends Component {
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

export default App;
