// salesReducer.js

const initialState = {
  purchaseHistory: [], // Array to store history of purchases
};

const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECORD_SALE":
      const { totalPrice, totalAmount, productsBought } = action.payload;
      return {
        ...state,
        purchaseHistory: [
          ...state.purchaseHistory, // Keep the existing purchases
          {
            totalPrice,
            totalAmount,
            productsBought, // Each new sale with its own products and quantities
            date: new Date().toISOString(), // Optionally, include the timestamp of the purchase
          },
        ],
      };
    default:
      return state;
  }
};

export default salesReducer;
