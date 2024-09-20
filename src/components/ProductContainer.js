import React, { useState } from 'react';
import ProductList from './ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../state/actions/cartActions';
import Minicart from './Minicart';
import { FaShoppingCart } from 'react-icons/fa';  // Import shopping cart icon from react-icons
import { Link } from 'react-router-dom';

const ProductContainer = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const { loading, error, cartItems } = cart;

    const [isCartOpen, setIsCartOpen] = useState(false); // State to control the side pane visibility

    // Callback to handle product being added to the cart
    const handleAddToCart = (product) => {

        // setCart((prevCart) => [...prevCart, product]);
        // dispatch action
        dispatch(addToCart(product.id, 1))
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    }

    const onRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    }

    return (
        <div className='productContainer'>
            <header className='productHeader'>
                <h1>React Commerce</h1>
                <button className="cartIcon" onClick={toggleCart}>
                    <FaShoppingCart color="#FFF"/>  {/* Cart Icon */}
                    <span className="cartCount">{cartItems.reduce((acc, val) => acc + val.qty, 0)}</span> {/* Display the number of items */}
                </button>
            </header>

            <nav>
            <Link to={`/`}>Home</Link>
                <Link to={`/`}>Products</Link>
                <Link to={`/cart`}>Cart</Link>
                <Link to={`/machine-learning`}>Machine Learning</Link>
            </nav>

            <div className="container">
                <ProductList onAddToCart={handleAddToCart} />
            </div>

            {/* Side pane for minicart */}
            {isCartOpen && (
                <div className={`sidePane ${isCartOpen ? 'open' : ''}`}>
                    <button className="closeBtn" onClick={toggleCart}>Close</button>
                    <Minicart cartItems={cartItems} onRemoveFromCart={onRemoveFromCart} />
                </div>
            )}

            {/* <Minicart cartItems={cartItems} /> */}

        </div>
    )
}

export default ProductContainer;

