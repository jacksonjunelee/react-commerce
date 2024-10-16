import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { recordSale } from "../state/actions/salesActions";
import { clearCart } from "../state/actions/cartActions";
import Analytics from "../utils/Analytics";
import { trackEvent as trackEventAction } from "../state/actions/analyticsActions";

const Minicart = ({ cartItems, onRemoveFromCart, hideText, hideButton }) => {
  const dispatch = useDispatch();
  const handleBuyNow = () => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
    const totalAmount = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const productsBought = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      qty: item.qty,
    }));

    // Dispatch the sale action
    dispatch(recordSale({ totalPrice, totalAmount, productsBought }));
    // Clear the cart after the sale
    dispatch(clearCart());

    const data = {
      name: "buy_now",
      eventData: { totalPrice, totalAmount, productsBought },
    };
    dispatch(trackEventAction("button_click", data));
  };

  return (
    <div className="cartContainer">
      <Analytics data={{ page: "minicart" }} />
      <h2>{!hideText && "Shopping Cart"}</h2>
      {cartItems.length === 0 && (
        <div className="cartList">{<p>No items in cart.</p>}</div>
      )}

      {cartItems.length >= 1 &&
        cartItems.map((product) => (
          <div className="product cart_item__mini" key={product.id}>
            <img src={product.img} alt={`Product ${product.id}`} />
            <h2>{product.id}</h2>
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p>{product.qty}</p>

            {/* Remove Button */}
            {onRemoveFromCart && (
              <button
                className="removeBtn"
                data-name="remove_cart"
                aria-label="Remove"
                onClick={(e) => onRemoveFromCart(e, product)}
              >
                <FaTimes />
              </button>
            )}
          </div>
        ))}

      {!hideButton && (
        <button
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "10px 15px",
            marginLeft: "10px",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() => handleBuyNow()}
        >
          Buy Now (for ML purposes only)
        </button>
      )}
    </div>
  );
};

export default Minicart;
