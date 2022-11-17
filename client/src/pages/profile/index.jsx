// imports
// componenets
import UserProfile from "./userProfile";
import Feed from "./feed";
import ProfilePosts from "./profilePosts";

export default function Profile() {
  return (
    <>
      {/* user profile */}
      <UserProfile />
      {/* feed */}
      <Feed />
      {/*  your posts posts */}
      <ProfilePosts />
    </>
  );
}
