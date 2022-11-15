import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import useAuthEffect from "../hooks/userAuthEffect";
import { signUp } from "../services";

export default function SignUp() {
  const navigate = useNavigate();
  useAuthEffect((signed) => {
    if (signed) navigate("/profile");
  });

  const [state, setState] = useState({
    error: false,
    message: "",
  });
  const submit = (user) =>
    signUp(user)
      .then((res) => {
        alert("User created");
        const userId = res.data;
        console.log({ userId });
      })
      .catch(({ response: { data } }) => {
        setState({
          error: true,
          message: data,
        });
      });
  return (
    <>
      <h1>Sign Up</h1>
      <SignUpForm submit={submit} state={state} />
    </>
  );
}
