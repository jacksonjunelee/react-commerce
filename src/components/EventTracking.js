import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon from react-icons
import Analytics from "../utils/Analytics";

const EventTracking = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const cart = useSelector((state) => state.cart);
  const analytics = useSelector((state) => state.analytics.events);
  const { cartItems } = cart;

  return (
    <div>
      <Analytics data={{ page: "event-tracking" }} />
      <div className="productContainer analytics-header">
        <header className="productHeader">
          <div className="headerContent">
            <h1 className="siteTitle">React Commerce</h1>
            <button className="cartIcon" aria-label="View Cart">
              <FaShoppingCart color="#FFF" aria-hidden="true" />{" "}
              {/* Cart Icon */}
              <span className="cartCount">
                {cartItems.reduce((acc, val) => acc + val.qty, 0)}
              </span>{" "}
              {/* Display the number of items */}
            </button>
          </div>
        </header>

        <nav className="mainNav" aria-label="Main Navigation">
          <Link to={`/`}>Home</Link>
          <Link to={`/`}>Products</Link>
          <Link to={`/cart`}>Cart</Link>
          <Link to={`/machine-learning`}>Machine Learning</Link>
          <Link to={`/event-tracking`}>Event Tracking</Link>
        </nav>

        <h1 className="ml-title">Event Tracking and Analysis for Ecommerce</h1>

        {/* Two-column layout for event data and chart */}
        <div className="analytics-layout">
          <div className="analytics-container">
            <h2>Event Data</h2>
            {analytics.length > 0 ? (
              analytics.map((event, index) => (
                <div key={index} className="analytics-item">
                  <p>
                    <strong>Event Name:</strong> {event.eventName}
                  </p>
                  <p>
                    <strong>Event Data:</strong>{" "}
                    {JSON.stringify(event.data, null, 2)}
                  </p>
                  <p>
                    <strong>Timestamp:</strong>{" "}
                    {new Date(event.timestamp).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p>No analytics data available.</p>
            )}
          </div>

          {/* Placeholder for the chart */}
          <div className="chart-container">
            <h2>Analysis</h2>
            {/* Here you would insert the chart component */}
            <div className="chart-placeholder">
              <p>Chart will be displayed here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTracking;
