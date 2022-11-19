// imports
// componenets
import ProfilePosts from "./profilePosts";
import ProfileDetails from "./ProfileDetails";
import { useSelector } from "react-redux";

export default function Profile() {
  const user = useSelector((s) => s.auth.user);

  return (
    <>
      <ProfileDetails user={user} />
      <ProfilePosts userId={user._id} />
    </>
  );
}
