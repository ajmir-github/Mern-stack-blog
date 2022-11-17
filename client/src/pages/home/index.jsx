import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostsContainer from "../../components/PostsContainer";
import { getPost } from "../../services";
import { postAction } from "../../state";

export default function Home() {
  const dispatch = useDispatch();
  const post = useSelector((s) => s.post);
  useEffect(() => {
    getPost()
      .then((res) => {
        dispatch({ type: postAction.feed, payload: res.data });
      })
      .catch((res) => {
        console.warn(res);
      });
  }, []);
  return (
    <div>
      <h1>HOME PAGE</h1>
      {post.isEmpty ? (
        <h1>Loading Posts</h1>
      ) : (
        <>
          <h4>Filter and search</h4>
          <PostsContainer posts={post.posts} />
        </>
      )}
    </div>
  );
}
