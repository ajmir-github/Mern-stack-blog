import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import userAuthEffect from "../hooks/userAuthEffect";
import { signIn } from "../services";
import { authAction } from "../state";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  userAuthEffect((signed) => {
    if (signed) navigate("/profile");
  });

  const [state, setState] = useState({
    error: false,
    message: "",
  });
  const submit = (user) =>
    signIn(user)
      .then((res) => {
        const { token, user } = res.data;
        // update the state
        dispatch({
          type: authAction.signIn,
          payload: {
            token,
            user,
          },
        });
        // naviagate to the profile page
        navigate("/profile");
      })
      .catch(({ response: { data } }) => {
        setState({
          error: true,
          message: data,
        });
      });
  return (
    <>
      <h1>Sign In</h1>
      <SignInForm submit={submit} state={state} />
    </>
  );
}
