import { useSelector } from "react-redux";
import { imageURL } from "../../services";

export default function UserProfile() {
  const user = useSelector((s) => s.auth.user);
  const imgSrc =
    typeof user.img === "undefined"
      ? "/assets/unknown_user.jpg"
      : imageURL(user.img);
  return (
    <>
      <img src={imgSrc} width={128} />
      <div>Full Name: {user.fullName}</div>
      <div>title: {user.title}</div>
      <div>Email: {user.email}</div>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
    </>
  );
}
