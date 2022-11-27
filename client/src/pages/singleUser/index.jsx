import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser, imageURL, getPost } from "../../services";

// components
import PostsContainer from "../../components/PostsContainer";
import GoBack from "../../components/GoBack";
import { Avatar, Container, Grid, Typography } from "@mui/material";
import UserProfile from "./UserProfile";

export default function SingleUser() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});
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
      <UserProfile user={user} />
      <PostsContainer posts={posts} />
      <GoBack />
    </>
  );
}
