import { useState } from "react";
import { useDispatch } from "react-redux";
import SignUpForm from "../components/SignUpForm";
import { signUp } from "../services";
import { viewAction } from "../state";

export default function SignUp() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    error: false,
    message: "",
  });
  const submit = (user) => {
    dispatch({ type: viewAction.startLoading });
    signUp(user)
      .then((res) => {
        dispatch({
          type: viewAction.openSnackbar,
          payload: {
            open: true,
            message: "Your user is created. Now you can sign in!",
            severity: "success",
          },
        });
      })
      .catch(({ response: { data } }) => {
        setState({
          error: true,
          message: data,
        });
      })
      .finally(() => {
        dispatch({ type: viewAction.stopLoading });
      });
  };
  return <SignUpForm submit={submit} state={state} />;
}
