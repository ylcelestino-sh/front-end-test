import React from "react";
import PropTypes from "prop-types";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { setupStore } from "../app/store";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

/*
 * Modified version of RTK Query's helper function:
 * https://github.com/reduxjs/redux-toolkit/blob/master/packages/toolkit/src/query/tests/helpers.tsx
 */

const AllProviders = ({ children }) => {
  AllProviders.propTypes = {
    children: PropTypes.node,
  };
  return (
    <Provider store={setupStore()}>
      <ChakraProvider>
        <Router>{children}</Router>
      </ChakraProvider>
    </Provider>
  );
};

export function withProvider(store) {
  return function Wrapper({ children }) {
    Wrapper.propTypes = {
      children: PropTypes.node,
    };
    return <Provider store={store}>{children}</Provider>
  }
}

const renderWithProviders = (
  ui,
  { route = "/products" } = {},
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) => {
  renderWithProviders.propTypes = {
    ui: PropTypes.node,
  };
  window.history.pushState({}, "Test page", route);

  return {
    store,
    AllProviders,
    ...render(ui, { wrapper: AllProviders, ...renderOptions }),
  };
};

const getStore = ({api, extraReducers}) => {
  return configureStore({
    reducer: combineReducers({
      [api.reducerPath]: api.reducer,
      ...extraReducers,
    }),
    middleware: (gdm) =>
      gdm({ serializableCheck: false, immutableCheck: false }).concat(
        api.middleware
      ),
  });
};

const setupApiStore = (api, extraReducers = {}) => {
  const initialStore = getStore({ api, extraReducers });
  const refObj = {
    api,
    store: initialStore,
    wrapper: withProvider({initialStore}),
  };

  const store = getStore({ api, extraReducers });
  refObj.store = store;

  return refObj;
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { renderWithProviders as render, setupApiStore };
