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
  const stopLoad = () =>
    store.dispatch({
      type: viewAction.stopLoading,
    });
  // if there is not cookie
  if (!hasCookie()) return stopLoad();
  // auth the cookie
  const token = getCookie();
  const res = await authToken(token); // if error ???
  // sign in user
  store.dispatch({
    type: authAction.signIn,
    payload: {
      token,
      user: res.data,
    },
  });
  // stop loading the website
  stopLoad();
})();

// // Debugging Log
// store.subscribe(() => {
//   console.log(store.getState());
// });

// StoreProvider
export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
