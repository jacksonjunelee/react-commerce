// Initial state
const initialState = {
  events: [],
};

// Reducer
const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TRACK_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    default:
      return state;
  }
};

export default analyticsReducer;
