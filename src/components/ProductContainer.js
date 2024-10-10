import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../state/actions/cartActions";
import Minicart from "./Minicart";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { trackEvent as trackEventUtil } from "../utils/eventLogger";
import { trackEvent as trackEventAction } from "../state/actions/analyticsActions";
import Analytics from "../utils/Analytics";
import Header from "./Header";

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
      <Analytics data={{ page: "product" }} />
      <Header cartItems={cartItems} toggleCart={toggleCart} />

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
