import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "mobx-react";
import { eventStore, eventDetailsStore } from "./stores";

it("renders without crashing", () => {
  const stores = { eventStore, eventDetailsStore };

  const div = document.createElement("div");
  ReactDOM.render(
    <Provider {...stores}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
