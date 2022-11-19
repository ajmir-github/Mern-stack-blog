import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostsContainer from "../../components/PostsContainer";
import { getPost } from "../../services";
import { postAction, viewAction } from "../../state";
import SearchBar from "./searchBar";

export default function Home() {
  const dispatch = useDispatch();
  const post = useSelector((s) => s.post);

  useEffect(() => {
    dispatch({ type: viewAction.startLoading });
    getPost(post.params)
      .then((res) => {
        dispatch({ type: postAction.feed, payload: res.data });
      })
      .catch((res) => {
        console.warn(res);
      })
      .finally(() => {
        dispatch({ type: viewAction.stopLoading });
      });
  }, [post.params]);

  return (
    <>
      <SearchBar />
      <PostsContainer posts={post.posts} />
    </>
  );
}
