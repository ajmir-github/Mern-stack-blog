// Imports
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { authReducer, authAction } from "./authReducer";
import { viewReducer, viewAction } from "./viewReducer";
import { postReducer, postAction } from "./postReducer";
import { hasCookie, getCookie, removeCookie } from "../utils/cookie";
import { authToken, getUtilKeywords } from "../services";

// Export Actions
export { authAction, viewAction, postAction };

// Reducers
const reducers = {
  auth: authReducer,
  view: viewReducer,
  post: postReducer,
};

// Store
const store = configureStore({
  reducer: combineReducers(reducers),
});

// inital state
async function initState() {
  const stopLoad = () =>
    store.dispatch({
      type: viewAction.stopLoading,
    });
  // if there is not cookie
  if (!hasCookie()) return stopLoad();
  // auth the cookie
  const token = getCookie();
  try {
    const resA = await authToken(token);
    // sign in user
    store.dispatch({
      type: authAction.signIn,
      payload: {
        token,
        user: resA.data,
      },
    });

    // Get The KeyWord
    const resB = await getUtilKeywords();
    store.dispatch({
      type: postAction.feedKeywords,
      payload: resB.data,
    });

    // stop loading the website
    stopLoad();
  } catch (error) {
    store.dispatch({
      type: viewAction.openSnackbar,
      payload: {
        open: true,
        message: "Server failed to response!",
        severity: "error",
      },
    });
    console.warn(error);
  }
}

setTimeout(() => {
  initState();
}, 1000);

// // Debugging Log
// store.subscribe(() => {
//   console.log(store.getState());
// });

// StoreProvider
export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
