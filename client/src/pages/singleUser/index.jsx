import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser, imageURL, getPost } from "../../services";

// components
import PostsContainer from "../../components/PostsContainer";
import GoBack from "../../components/GoBack";

export default function SingleUser() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    getSingleUser(id)
      .then((res) => {
        // this user's data fetched
        setUser(res.data);
        // get the posts of this user
        getPost({ user: id })
          .then((res) => {
            // posts fetched
            setPosts(res.data);
            setLoading(false);
          })
          .catch((res) => {
            console.warn(res);
          });
      })
      .catch((res) => {
        console.warn(res);
      });
  }, [id]);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <img
            src={
              typeof user.img === "undefined"
                ? "/assets/unknown_user.jpg"
                : imageURL(user.img, "xs")
            }
          />
          <div>Full Name: {user.fullName}</div>
          <div>title: {user.title}</div>
          <div>Email: {user.email}</div>
          <hr />

          <PostsContainer posts={posts} />
          <GoBack />
        </>
      )}
    </>
  );
}
