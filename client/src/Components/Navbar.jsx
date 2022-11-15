import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewAction, authAction } from "../state";

export default function Navbar() {
  const dispatch = useDispatch();
  const [view, auth] = useSelector((s) => [s.view, s.auth]);
  const signOut = () => {
    dispatch({ type: viewAction.startLoading });
    dispatch({ type: authAction.signOut });
  };
  return (
    <>
      {view.loading && <h1 style={{ color: "red" }}>Loading</h1>}
      {view.theme === "light" ? (
        <button onClick={() => dispatch({ type: viewAction.turnDarkMode })}>
          Dark
        </button>
      ) : (
        <button onClick={() => dispatch({ type: viewAction.turnLightMode })}>
          Light
        </button>
      )}
      {auth.signed && <button onClick={signOut}>Sign out</button>}
      <ul>
        <li>
          <Link to={"/"}>HOME</Link>
        </li>
        <li>
          <Link to={"/articles"}>ARTILCES</Link>
        </li>
        <li>
          <Link to={"/article/sf2389fj3409kf"}>ARTILCE: sf2389fj3409kf</Link>
        </li>
        <li>
          <Link to={"/sign_in"}>SIGN IN</Link>
        </li>
        <li>
          <Link to={"/sign_up"}>SIGN UP</Link>
        </li>
        <li>
          <Link to={"/profile"}>PROFILE</Link>
        </li>
        <li>
          <Link to={"/notfoundurl"}>notfoundurl</Link>
        </li>
      </ul>
    </>
  );
}
