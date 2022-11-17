import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostsContainer from "../../components/PostsContainer";
import { getPost } from "../../services";

export default function ProfilePosts() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPost()
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((res) => {
        console.warn(res);
      });
  }, []);
  return (
    <div>
      <h1>YOU POSTS</h1>
      {loading ? (
        <h1>Loading Posts</h1>
      ) : (
        <>
          <h4>Filter and search</h4>
          <PostsContainer posts={posts} />
        </>
      )}
    </div>
  );
}
