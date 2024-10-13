// ProductContainer.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter for routing context
import configureStore from "redux-mock-store";
import ProductContainer from "./ProductContainer";
import { addToCart, removeFromCart } from "../state/actions/cartActions";
import { trackEvent as trackEventAction } from "../state/actions/analyticsActions";

jest.mock("../state/actions/cartActions", () => ({
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
}));

jest.mock("../state/actions/analyticsActions", () => ({
  trackEvent: jest.fn(),
}));

const mockStore = configureStore([]);

describe("ProductContainer Component", () => {
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

  test("renders ProductContainer with ProductList", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductContainer />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/React Commerce/i)).toBeInTheDocument();
  });

  test("handles Add to Cart action and tracks event", () => {
    // Set up the initial state to include the product
    const product = { id: 1, title: "Test Product" };
    const initialState = {
      cart: {
        loading: false,
        error: null,
        cartItems: [],
      },
      productList: {
        loading: false,
        error: null,
        products: [product],
      },
    };

    store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductContainer />
        </MemoryRouter>
      </Provider>
    );

    const addToCartButton = screen.getByText(/Add to Cart/i);

    fireEvent.click(addToCartButton);

    expect(addToCart).toHaveBeenCalledWith(product.id, 1);
    expect(trackEventAction).toHaveBeenCalledWith("button_click", {
      name: "add_cart",
      eventData: product,
    });
  });

  test("toggles cart visibility when cart icon is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductContainer />
        </MemoryRouter>
      </Provider>
    );

    // Find the cart icon button by its aria-label
    const cartIconButton = screen.getByLabelText(/View Cart/i);
    fireEvent.click(cartIconButton);

    // After clicking the cart icon, check for the Close button in the cart
    expect(screen.getByRole("button", { name: /Close/i })).toBeInTheDocument();

    // You could also add a second click event to toggle the cart back and verify it is hidden if needed
    fireEvent.click(screen.getByRole("button", { name: /Close/i }));
    expect(
      screen.queryByRole("button", { name: /Close/i })
    ).not.toBeInTheDocument();
  });

  test("handles Remove from Cart action and tracks event", () => {
    const initialState = {
      cart: {
        loading: false,
        error: null,
        cartItems: [{ id: 1, title: "Test Product" }],
      },
      productList: {
        loading: false,
        error: null,
        products: [],
      },
    };

    store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductContainer />
        </MemoryRouter>
      </Provider>
    );

    // Find the cart icon button by its aria-label
    const cartIconButton = screen.getByLabelText(/View Cart/i);
    fireEvent.click(cartIconButton);

    const removeButton = screen.getByRole("button", { name: /Remove/i });
    fireEvent.click(removeButton);

    // Check if the removeFromCart action was called with the correct product ID
    expect(removeFromCart).toHaveBeenCalledWith(1);

    // Check if the tracking action was called with the correct parameters
    expect(trackEventAction).toHaveBeenCalledWith("button_click", {
      name: "remove_cart",
      eventData: { id: 1, title: "Test Product" },
    });
  });
});
