// reducers/adReducer.js

const initialState = {
    savedAds: [],
  };
  
  const adReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_AD':
        return {
          ...state,
          savedAds: [...state.savedAds, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default adReducer;
  