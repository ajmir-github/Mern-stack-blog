import SignUpForm from "../Components/SignUpForm";

export default function SignUp() {
  const submit = user => console.log(user)
  return <>
    <h1>Sign Up</h1>
    <SignUpForm submit={submit} />
  </>
}