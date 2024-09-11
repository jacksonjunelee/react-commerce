import axios from 'axios';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

    // const { data } = await axios.get('/api/products'); // Use your API

    const mockApi = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 1,
              title: 'Sunglasses',
              price: 19.99
            },
            {
              id: 2,
              title: 'Sneakers',
              price: 19.99
            },
            {
              id: 3,
              title: 'Shirt',
              price: 19.99
            },
          ]
        });
      }, 1000)
    })

    const { data } = await mockApi;

    dispatch({
      type: 'FETCH_PRODUCTS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'FETCH_PRODUCTS_FAILURE',
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};
