import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { productList } = getState();
  const products = productList.products;
  const data = products.find(product => product.id === id);
  // const productList = useSelector((state) => state.productList);
  // const { loading, error, products } = productList;
  // const { data } = await axios.get(`/api/products/${id}`); // Fetch product details

  // Check if the product already exists in the cart
  const cartItems = getState().cart.cartItems;
  const existingItem = cartItems.find(item => item.id === id);

  // if (existingItem) {
  //   // Update quantity if item already in cart
  //   dispatch({
  //     type: 'UPDATE_CART_ITEM',
  //     payload: {
  //       id: data.id,
  //       title: data.title,
  //       image: data.image,
  //       price: data.price,
  //       qty: existingItem.qty + qty, // Increment quantity
  //     },
  //   });
  // } else {
  //   // Add new item to the cart
  // }

    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: data.id,
        title: data.title,
        img: data.img,
        price: data.price,
        qty,
      },
    });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: 'REMOVE_FROM_CART',
    payload: id,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// Action creator for clearing the cart
export const clearCart = () => {
  return {
    type: 'CLEAR_CART',
  };
};
