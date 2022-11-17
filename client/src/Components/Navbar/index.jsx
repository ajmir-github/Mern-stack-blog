import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { viewAction, authAction } from "../../state";

export default function Navbar() {
  const dispatch = useDispatch();
  const [view, auth] = useSelector((s) => [s.view, s.auth]);
  // funcs must be here no in the elements
  const signOut = () => {
    // dispatch({ type: viewAction.startLoading });
    dispatch({ type: authAction.signOut });
  };
  const turnDarkMode = () => {
    dispatch({ type: viewAction.turnDarkMode });
  };
  const turnLightMode = () => {
    dispatch({ type: viewAction.turnLightMode });
  };
  return (
    <>
      {view.theme === "light" ? (
        <button onClick={turnDarkMode}>Dark</button>
      ) : (
        <button onClick={turnLightMode}>Light</button>
      )}
      {auth.signed && <button onClick={signOut}>Sign out</button>}
      <ul>
        <li>
          <Link to={"/"}>HOME</Link>
        </li>

        <li>
          <Link to={"/post/sf2389fj3409kf"}>Post: sf2389fj3409kf</Link>
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
          <Link to={"/notfoundurl"}>NOT FOUND!</Link>
        </li>
      </ul>
    </>
  );
}
