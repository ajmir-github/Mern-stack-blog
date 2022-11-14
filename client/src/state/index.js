// Imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// sample reducer
function countReducer(state, { type }) {
  switch (type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

// Reducers
const reducers = {
  count: countReducer,
};

// Store
const store = configureStore({
  reducer: combineReducers(reducers),
});

// Debugging Log
store.subscribe(() => {
  console.log(store.getState());
});

// StoreProvider
export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
