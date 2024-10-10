import React from "react";
import Analytics from "../utils/Analytics";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = ({ cartItems, toggleCart }) => {
  return (
    <>
      <Analytics data={{ page: "products" }} />
      <header className="productHeader">
        <div className="headerContent">
          <h1 className="siteTitle">React Commerce</h1>
          <button
            className="cartIcon"
            onClick={toggleCart}
            aria-label="View Cart"
          >
            <FaShoppingCart color="#FFF" aria-hidden="true" /> {/* Cart Icon */}
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
    </>
  );
};

export default Header;
