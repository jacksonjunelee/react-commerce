import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for routing context
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("App Component", () => {});

let store;

beforeEach(() => {
  store = mockStore({
    cart: {
      loading: false,
      error: null,
      cartItems: [],
    },
    productList: {
      loading: false,
      error: null,
      products: [],
    },
  });
  store.dispatch = jest.fn();
});

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/React Commerce/i);
  expect(linkElement).toBeInTheDocument();
});
