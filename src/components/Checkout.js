import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Minicart from './Minicart';
import { FaShoppingCart } from 'react-icons/fa';  // Import shopping cart icon from react-icons

const Checkout = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    // Calculate total price
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., dispatch an action, make an API call)
        console.log('Order placed:', {
            name, email, address1, address2, city, state, zip, paymentMethod, cartItems
        });
    };

    return (
        <>
            <header className='productHeader'>
                <h1>React Commerce</h1>
                <button className="cartIcon">
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

            <div className="checkoutContainer">
                <div className="cartSummary">
                    <h2>Order Summary</h2>
                    <Minicart cartItems={cartItems} hideText={true} hideButton={true} />
                    <div className="totalPrice">
                        <h3>Total Price: ${calculateTotalPrice()}</h3>
                    </div>
                </div>

                <hr style={{ margin: '20px 0' }}></hr>

                <h1>Checkout</h1>
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="address1">Address:</label>
                        <input
                            type="text"
                            id="address1"
                            value={address1}
                            onChange={(e) => setAddress1(e.target.value)}
                            required
                            placeholder="Street Address"
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="address2">Address 2:</label>
                        <input
                            type="text"
                            id="address2"
                            value={address2}
                            onChange={(e) => setAddress2(e.target.value)}
                            placeholder="Apartment, suite, etc. (optional)"
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="city">City:</label>
                        <input
                            type="text"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="zip">Zip Code:</label>
                        <input
                            type="text"
                            id="zip"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="paymentMethod">Payment Method:</label>
                        <select
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        >
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <button type="submit">
                        <FaCreditCard /> Place Order
                    </button>
                </form>
            </div>
        </>
    );
};

export default Checkout;
