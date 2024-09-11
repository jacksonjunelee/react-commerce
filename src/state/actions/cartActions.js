import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { productList } = getState();
    const products = productList.products;
    const data = products.find(product => product.id === id);
    // const productList = useSelector((state) => state.productList);
    // const { loading, error, products } = productList;
    // const { data } = await axios.get(`/api/products/${id}`); // Fetch product details
  
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        id: data.id,
        product: data.id,
        title: data.title,
        image: data.image,
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
  