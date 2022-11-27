import { setCookie, removeCookie } from "../utils/cookie";

const auth = {
  signed: false,
  token: "",
  user: {},
};

export const authAction = {
  signIn: "SIGN_IN",
  signOut: "SIGN_OUT",
  updateUser: "UPDATE_USER",
};

export function authReducer(state = auth, { type, payload }) {
  switch (type) {
    case authAction.signIn:
      setCookie(payload.token);
      return {
        ...payload,
        signed: true,
      };

    case authAction.signOut:
      removeCookie();
      return {
        signed: false,
      };

    case authAction.updateUser:
      return {
        ...state,
        user: payload,
      };

    default:
      return state;
  }
}
