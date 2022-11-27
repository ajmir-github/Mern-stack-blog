import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostsContainer from "../../components/PostsContainer";
import SearchBar from "../../components/SearchBar";
import { getPost } from "../../services";
import { postAction, viewAction } from "../../state";

export default function ProfilePosts({ userId }) {
  const [params, setParams] = useState({ user: userId });
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const loading = {
    start: () => dispatch({ type: viewAction.startLoading }),
    stop: () => dispatch({ type: viewAction.stopLoading }),
  };
  useEffect(() => {
    loading.start();
    getPost(params)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((res) => {
        console.warn(res);
      })
      .finally(loading.stop);
  }, [params]);
  return (
    <>
      <SearchBar params={params} setParams={setParams} />
      <PostsContainer posts={posts} />
    </>
  );
}
