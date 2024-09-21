import axios from 'axios';
import { MOCK_DATA } from '../mockData';

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_PRODUCTS_REQUEST' });

    // const { data } = await axios.get('/api/products'); // Use your API

    const mockApi = new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: MOCK_DATA
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
