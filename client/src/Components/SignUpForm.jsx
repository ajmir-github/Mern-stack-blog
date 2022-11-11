import { useRef } from "react";

export default function SignUpForm({ submit }) {
  // Ref containers
  const fullNameRef = useRef(null);
  const titleRef = useRef(null);
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  // validation
  const validateForm = e => {
    e.preventDefault();
    const fullName = fullNameRef.current.value;
    const title = titleRef.current.value;
    const email = emailRef.current.value;
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    submit({
      fullName,
      title,
      email,
      username,
      password
    })
  };
  // main element
  return <form onSubmit={validateForm}>
    <input type="text" placeholder="Full Name" ref={fullNameRef} required />
    <input type="text" placeholder="Title" ref={titleRef} required />
    <input type="email" placeholder="Email" ref={emailRef} required />
    <input type="text" placeholder="Username" ref={usernameRef} required />
    <input type="password" placeholder="Password" ref={passwordRef} required />
    <input type="submit" value="Sign up" />
  </form>
}
