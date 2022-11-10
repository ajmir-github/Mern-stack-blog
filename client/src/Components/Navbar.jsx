import { Link } from "react-router-dom";

export default function Navbar() {
  return <>
    <ul>
      <li><Link to={"/"}>HOME</Link></li>
      <li><Link to={"/articles"}>ARTILCES</Link></li>
      <li><Link to={"/article/sf2389fj3409kf"}>ARTILCE: sf2389fj3409kf</Link></li>
      <li><Link to={"/sign_in"}>SIGN IN</Link></li>
      <li><Link to={"/sign_up"}>SIGN UP</Link></li>
      <li><Link to={"/profile"}>PROFILE</Link></li>
    </ul>
  </>
}