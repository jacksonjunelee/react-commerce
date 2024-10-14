import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productReducer from "./reducers/productReducer";
import cartReducer from "./reducers/cartReducer";
import salesReducer from "./reducers/salesReducer";
import analyticsReducer from "./reducers/analyticsReducer";
import adReducer from "./reducers/adReducer";

const reducer = combineReducers({
  productList: productReducer,
  cart: cartReducer,
  sales: salesReducer,
  analytics: analyticsReducer,
  ad: adReducer,
});

const middleware = [thunk];
const composedEnhancer = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducer, composedEnhancer);
window.store = store;

export default store;
