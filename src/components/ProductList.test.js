// ProductList.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { thunk } from "redux-thunk";
import ProductList from "./ProductList";
import { fetchProducts } from "../state/actions/productActions";

// Create the mock store with thunk middleware
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../state/actions/productActions", () => ({
  fetchProducts: jest.fn(() => (dispatch) => {
    dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: [] }); // Mock fetchProducts to simulate success
  }),
}));

describe("ProductList Component", () => {
  let store;
  let onAddToCartMock;

  beforeEach(() => {
    onAddToCartMock = jest.fn();
  });

  test("renders loading state", () => {
    store = mockStore({
      productList: {
        loading: true,
        error: null,
        products: [],
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ProductList onAddToCart={onAddToCartMock} />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders error state", () => {
    store = mockStore({
      productList: {
        loading: false,
        error: "Failed to fetch products",
        products: [],
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ProductList onAddToCart={onAddToCartMock} />
      </Provider>
    );

    expect(screen.getByText(/failed to fetch products/i)).toBeInTheDocument();
  });

  test("renders product list", async () => {
    const products = [
      { id: 1, title: "Product 1", price: 10, img: "img1.jpg" },
      { id: 2, title: "Product 2", price: 20, img: "img2.jpg" },
    ];

    store = mockStore({
      productList: {
        loading: false,
        error: null,
        products,
      },
    });
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <ProductList onAddToCart={onAddToCartMock} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/product 1/i)).toBeInTheDocument();
      expect(screen.getByText(/product 2/i)).toBeInTheDocument();
      expect(screen.getByText("$10")).toBeInTheDocument();
      expect(screen.getByText("$20")).toBeInTheDocument();
    });

    const addToCartButtons = screen.getAllByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButtons).toHaveLength(products.length);

    addToCartButtons.forEach((button, index) => {
      button.click();
      expect(onAddToCartMock).toHaveBeenCalledWith(products[index]);
    });
  });
});
