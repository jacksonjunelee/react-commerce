const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const item = action.payload;
      const exists = state.cartItems.find((x) => x.id === item.id);
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.id === exists.id ? { ...item, qty: x.qty + item.qty } : x
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, item] };
    // case 'UPDATE_CART_ITEM':
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.map((x) =>
    //       x.id === action.payload.id ? { ...x, qty: action.payload.qty } : x
    //     ),
    //   };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };
    case "CLEAR_CART": // New action to clear the cart
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export default cartReducer;
