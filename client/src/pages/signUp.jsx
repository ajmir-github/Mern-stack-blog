import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { signUp } from "../services";

export default function SignUp() {
  const userSiged = useSelector((s) => s.auth.signed);
  const navigate = useNavigate();
  useEffect(() => {
    // protext the route
    if (userSiged) navigate("/profile");
  }, [userSiged]);

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
