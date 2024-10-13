import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import RecommendedProducts from "./RecommendedProducts";
import * as tf from "@tensorflow/tfjs";

// Mock data for products, cart items, and purchase history
const products = [
  { id: 1, title: "Product 1", img: "img1.jpg", price: 10 },
  { id: 2, title: "Product 2", img: "img2.jpg", price: 20 },
  { id: 3, title: "Product 3", img: "img3.jpg", price: 30 },
];

const cartItems = [{ id: 1, qty: 2 }];

const purchaseHistory = [
  {
    totalPrice: 100, // Example total price for the sale
    totalAmount: 1, // Total quantity of products bought
    productsBought: [
      // List of products bought in this purchase
      { id: 1, qty: 1 }, // Product 1, quantity 1
      { id: 3, qty: 2 }, // Product 3, quantity 2
    ],
    date: new Date().toISOString(), // Date of purchase
  },
];

// Configure the mock store
const mockStore = configureStore([]);

// At the beginning of your test file or in a setup file
HTMLCanvasElement.prototype.getContext = () => {
  return {}; // return a mock object or any necessary properties
};

describe("RecommendedProducts Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      cart: { cartItems },
      sales: { purchaseHistory },
    });
  });

  test("renders the component with products and instructions", () => {
    render(
      <Provider store={store}>
        <RecommendedProducts products={products} />
      </Provider>
    );

    expect(
      screen.getByText("Product Recommendation System")
    ).toBeInTheDocument();
    expect(screen.getByText("How to use:")).toBeInTheDocument();
    expect(
      screen.getByText("Ways to Improve the Recommendation System:")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Recommend Products for You/i })
    ).toBeInTheDocument();
  });

  test("makes recommendations and displays them when the button is clicked", async () => {
    store = mockStore({
      cart: {
        cartItems: [
          { id: 1, qty: 2 },
          { id: 2, qty: 2 },
        ],
      },
      sales: { purchaseHistory },
    });

    render(
      <Provider store={store}>
        <RecommendedProducts products={products} />
      </Provider>
    );

    const button = screen.getByRole("button", {
      name: /Recommend Products for You/i,
    });
    fireEvent.click(button);

    // Simulate async behavior with a small delay
    await new Promise((r) => setTimeout(r, 1000));

    const recommendedProductTitles = screen.getAllByRole("heading", {
      level: 4,
    });
    expect(recommendedProductTitles.length).toBeGreaterThanOrEqual(2); // Adjust as needed

    expect(recommendedProductTitles[1]).toHaveTextContent("Product 1");
  });

  test("updates recommended products based on cart items and purchase history", async () => {
    const { getByText, queryByText } = render(
      <Provider store={store}>
        <RecommendedProducts products={products} />
      </Provider>
    );

    // Trigger recommendations
    fireEvent.click(getByText("Recommend Products for You"));

    // Wait for the recommendations to be computed
    await new Promise((r) => setTimeout(r, 1000));

    // Check for presence of products based on expected recommendations
    expect(queryByText("Product 1")).toBeInTheDocument();
    expect(queryByText("Product 2")).not.toBeInTheDocument(); // Not expected to be recommended
  });

  test("handles no recommendations case", async () => {
    // Set up store with empty cart and purchase history
    store = mockStore({
      cart: { cartItems: [] },
      sales: { purchaseHistory: [] },
    });

    const { getByText, queryByText } = render(
      <Provider store={store}>
        <RecommendedProducts products={products} />
      </Provider>
    );

    // Trigger recommendations
    fireEvent.click(getByText("Recommend Products for You"));

    // Wait for recommendation calculation
    await new Promise((r) => setTimeout(r, 1000));

    expect(
      queryByText("Recommended Products for You:")
    ).not.toBeInTheDocument();
  });
});
