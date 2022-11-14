import { setCookie, removeCookie } from "../utils/cookie";

const initState = {
  signed: false,
  //   token: "", user: {},
};

export const authAction = {
  signIn: "SIGN_IN",
  signOut: "SIGN_OUT",
};

export function authReducer(state = initState, { type, payload }) {
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

    default:
      return state;
  }
}
