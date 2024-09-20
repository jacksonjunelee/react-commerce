import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import productReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import salesReducer from './reducers/salesReducer';

const reducer = combineReducers({
  productList: productReducer,
  cart: cartReducer,
  sales: salesReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
);

export default store;