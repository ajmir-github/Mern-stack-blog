import { useState } from "react";
import { useDispatch } from "react-redux";
import SignInForm from "../components/SignInForm";
import { signIn } from "../services";
import { authAction, viewAction } from "../state";

export default function SignIn() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    error: false,
    message: "",
  });
  const submit = (user) => {
    dispatch({ type: viewAction.startLoading });
    signIn(user)
      .then((res) => {
        // update the state
        dispatch({
          type: authAction.signIn,
          payload: res.data,
        });
        // naviagate to the profile page
      })
      .catch(({ response: { data } }) => {
        setState({
          error: true,
          message: data,
        });
      })
      .finally(() => dispatch({ type: viewAction.stopLoading }));
  };
  return <SignInForm submit={submit} state={state} />;
}
