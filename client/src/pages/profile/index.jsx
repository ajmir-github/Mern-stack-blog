// imports
import { useNavigate } from "react-router-dom";
import userAuthEffect from "../../hooks/userAuthEffect";
// componenets
import UserDescription from "./userProfile";

export default function Profile() {
  return (
    <>
      <h1>Profile page</h1>
      <UserDescription />
    </>
  );
}
