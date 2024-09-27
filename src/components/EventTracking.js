import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon from react-icons

const EventTracking = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const cart = useSelector((state) => state.cart);
  const analytics = useSelector((state) => state.analytics.events);
  const { cartItems } = cart;

  return (
    <div>
      <div className="productContainer">
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
        {analytics.map((event, index) => (
          <li key={index}>
            <p>
              <strong>Event Name:</strong> {event.eventName}
            </p>
            <p>
              <strong>Event Data:</strong> {JSON.stringify(event.data)}
            </p>
            <p>
              <strong>Timestamp:</strong> {event.timestamp}
            </p>
          </li>
        ))}
        <ul></ul>
      </div>
    </div>
  );
};

export default EventTracking;
