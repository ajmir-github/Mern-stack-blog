import { useState } from "react";
import { useDispatch } from "react-redux";
import SignInForm from "../components/SignInForm";
import { signIn } from "../services";
import { authAction } from "../state";

export default function SignIn() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    error: false,
    message: "",
  });
  const submit = (user) => {
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
      });
  };
  return (
    <>
      <h1>Sign In</h1>
      <SignInForm submit={submit} state={state} />
    </>
  );
}
