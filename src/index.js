import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./state/store";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Checkout from "./components/Checkout";
import MachineLearning from "./components/MachineLearning";
import EventTracking from "./components/EventTracking";
import AdCreate from "./components/AdCreate";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/cart",
    element: <Checkout />,
  },
  {
    path: "/machine-learning",
    element: <MachineLearning />,
  },
  {
    path: "/event-tracking",
    element: <EventTracking />,
  },
  {
    path: "/ad-create",
    element: <AdCreate />,
  },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
