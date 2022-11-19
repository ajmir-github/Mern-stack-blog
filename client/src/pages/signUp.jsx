import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { signUp } from "../services";
import { viewAction } from "../state";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState({
    error: false,
    message: "",
  });
  const submit = (user) =>
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
        const userId = res.data;
        console.log({ userId });
        navigate("/sign_in");
      })
      .catch(({ response: { data } }) => {
        setState({
          error: true,
          message: data,
        });
      });
  return <SignUpForm submit={submit} state={state} />;
}
