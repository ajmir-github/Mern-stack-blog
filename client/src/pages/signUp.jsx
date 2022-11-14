import { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import { signUp } from "../services";

export default function SignUp() {
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
