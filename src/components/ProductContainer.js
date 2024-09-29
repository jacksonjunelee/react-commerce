import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../state/actions/cartActions";
import Minicart from "./Minicart";
import { FaShoppingCart } from "react-icons/fa"; // Import shopping cart icon from react-icons
import { Link } from "react-router-dom";
import { trackEvent as trackEventUtil } from "../utils/eventLogger";
import { trackEvent as trackEventAction } from "../state/actions/analyticsActions";
import Analytics from "../utils/Analytics";

const ProductContainer = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { loading, error, cartItems } = cart;
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control the side pane visibility

  // Callback to handle product being added to the cart
  const handleAddToCart = (product) => {
    // setCart((prevCart) => [...prevCart, product]);
    // dispatch action
    const data = { name: "add_cart", eventData: product };
    dispatch(addToCart(product.id, 1));
    dispatch(trackEventAction("button_click", data));
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const onRemoveFromCart = (e, product) => {
    const data = { name: "remove_cart", eventData: product };

    dispatch(removeFromCart(product.id));
    dispatch(trackEventAction("button_click", data));
  };

  return (
    <div className="productContainer">
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

      <div className="container">
        <ProductList onAddToCart={handleAddToCart} />
      </div>

      {/* Side pane for minicart */}
      {isCartOpen && (
        <div className={`sidePane ${isCartOpen ? "open" : ""}`}>
          <button className="closeBtn" onClick={toggleCart}>
            Close
          </button>
          <Minicart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
        </div>
      )}

      {/* <Minicart cartItems={cartItems} /> */}
    </div>
  );
};

export default ProductContainer;
