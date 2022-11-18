import { useRef } from "react";

export default function SignUpForm({ submit, state }) {
  // Ref containers
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  // validation
  const validateForm = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    submit({
      username,
      password,
    });
  };
  // main element
  return (
    <form onSubmit={validateForm}>
      {state.error && (
        <div>
          <i style={{ color: "red" }}>{state.message}</i>
        </div>
      )}
      <input type="text" placeholder="Username" ref={usernameRef} required />
      <input
        type="password"
        placeholder="Password"
        ref={passwordRef}
        required
      />
      <input type="submit" value="Sign in" />
    </form>
  );
}
