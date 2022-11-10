import SignUpForm from "../Components/SignUpForm";
import { signUpUser } from "../Services/userAPIs";

export default function SignUp() {
  const submit = user => signUpUser(user)
    .then(res => console.log(res))
    .catch(err => console.warn(err))
  return <>
    <h1>Sign Up</h1>
    <SignUpForm submit={submit} />
  </>
}