import React from "react";
import { FaTimes } from 'react-icons/fa';

const Minicart = ({ cartItems, onRemoveFromCart }) => {
    return (
        <div className="cartContainer">
            <h2>Shopping Cart</h2>
            {

                cartItems.length === 0 && (
                    <div className="cartList">
                        {
                            <p>No items in cart.</p>
                        }
                    </div>
                )
            }

            {
                cartItems.length >= 1 && (
                    cartItems.map(product => (
                        <div className='product cart_item__mini' key={product.id}>
                            <img src="https://via.placeholder.com/150" alt={`Product ${product.id}`} />
                            <h2>{product.id}</h2>
                            <h3>{product.title}</h3>
                            <p>${product.price}</p>

                            {/* Remove Button */}
                            <button className='removeBtn' onClick={() => onRemoveFromCart(product.id)}>
                                <FaTimes />
                            </button>
                        </div>
                    ))
                )
            }
        </div>
    )
}

export default Minicart