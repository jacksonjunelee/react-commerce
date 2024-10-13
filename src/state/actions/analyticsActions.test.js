// actions.test.js
import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";
import { thunk } from "redux-thunk";
import { trackEvent } from "./analyticsActions";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Action Creators", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it("should dispatch TRACK_EVENT with correct payload", async () => {
    const eventName = "button_click";
    const data = {
      name: "remove_cart",
      eventData: { id: 1, title: "Test Product" },
    };

    const expectedActions = [
      {
        type: "TRACK_EVENT",
        payload: {
          eventName,
          data,
          timestamp: expect.any(String), // Use expect.any(String) to allow for any timestamp
        },
      },
    ];

    // Dispatch the trackEvent action
    await store.dispatch(trackEvent(eventName, data));

    // Check if the correct action was dispatched
    const actions = store.getActions();
    expect(actions).toEqual(expectedActions);
  });
});
