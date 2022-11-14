// Imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { authReducer, authAction } from "./authReducer";
import { viewReducer, viewAction } from "./viewReducer";
import { hasCookie, getCookie } from "../utils/cookie";
import { authToken } from "../services";

// Export Actions
export { authAction, viewAction };

// Reducers
const reducers = {
  auth: authReducer,
  view: viewReducer,
};

// Store
const store = configureStore({
  reducer: combineReducers(reducers),
});

// inital state
(async () => {
  // if there is not cookie
  if (!hasCookie())
    return store.dispatch({
      type: viewAction.stopLoading,
    });
  // auth the cookie
  const token = getCookie();
  const res = await authToken(token);
  console.log(res);
})();

// Debugging Log
store.subscribe(() => {
  console.log(store.getState());
});

// StoreProvider
export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
