import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const userSiged = useSelector((s) => s.auth.signed);
  const navigate = useNavigate();
  useEffect(() => {
    // protext the route
    if (!userSiged) navigate("/sign_in");
  }, [userSiged]);
  return <h1>Profile page</h1>;
}
