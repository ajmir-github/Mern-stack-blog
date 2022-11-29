import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import PostsContainer from "../../components/PostsContainer";
import { getPost } from "../../services";
import { viewAction } from "../../state";
import SearchBar from "../../components/SearchBar";
import { useSearchParams } from "react-router-dom";
import LoadMore from "../../components/LoadMore";

function useURLQuery() {
  const [searchParams, setSearchParams] = useSearchParams({});
  const params = useMemo(
    () => Object.fromEntries(searchParams),
    [searchParams]
  );
  return [params, setSearchParams];
}

export default function Home() {
  const [searchParams, setSearchParams] = useURLQuery();
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const loading = {
    start: () => dispatch({ type: viewAction.startLoading }),
    stop: () => dispatch({ type: viewAction.stopLoading }),
  };

  const loadMorePosts = () => {
    alert("loadMorePosts");
  };
  useEffect(() => {
    loading.start();
    getPost(searchParams)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((res) => {
        console.warn(res);
      })
      .finally(loading.stop);
  }, [searchParams]);
  return (
    <>
      <SearchBar params={searchParams} setParams={setSearchParams} />
      <PostsContainer posts={posts} />
    </>
  );
}
