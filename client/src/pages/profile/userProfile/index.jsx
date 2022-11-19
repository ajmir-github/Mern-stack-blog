import { useSelector } from "react-redux";
import { imageURL } from "../../../services";

import UpdateProfileInfo from "./UpdateProfileInfo";
import UpdateProfileImage from "./UpdateProfileImage";

export default function UserProfile() {
  const user = useSelector((s) => s.auth.user);
  const imgSrc =
    typeof user.img === "undefined"
      ? "/assets/unknown_user.jpg"
      : imageURL(user.img, "xs");

  return (
    <>
      <img src={imgSrc} />
      <div>Full Name: {user.fullName}</div>
      <div>title: {user.title}</div>
      <div>Email: {user.email}</div>
      <div>Username: {user.username}</div>
      <div>Email: {user.email}</div>
      <hr />
      <h2>Form</h2>

      <UpdateProfileImage currentImg={user.img} />
      <UpdateProfileInfo
        label={"Full Name"}
        currentValue={user.fullName}
        field="fullName"
      />
      <UpdateProfileInfo
        label={"Username"}
        currentValue={user.username}
        field="username"
      />
      <UpdateProfileInfo
        label={"Title"}
        currentValue={user.title}
        field="title"
      />
      <UpdateProfileInfo
        label={"Email"}
        currentValue={user.email}
        field="email"
      />
    </>
  );
}
