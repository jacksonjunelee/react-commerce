import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../state/actions/cartActions';
import { trackEvent } from '../state/actions/analyticsActions';

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const handleClick = (event, item) => {
    console.log('event: ', event)
    dispatch(removeFromCart(item.product)) 
    dispatch(trackEvent('button_click', { name: 'remove_cart',  eventData: {}}))
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.product}>
              <h4>{item.title}</h4>
              <p>Quantity: {item.qty}</p>
              <button 
                  onClick={(e) => handleClick(e, item)}
                  data-name="remove_cart"  
                >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
