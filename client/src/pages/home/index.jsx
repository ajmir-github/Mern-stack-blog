import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PostsContainer from "../../components/PostsContainer";
import { getPost } from "../../services";
import { viewAction } from "../../state";
import SearchBar from "../../components/SearchBar";

export default function Home() {
  const dispatch = useDispatch();
  const [params, setParams] = useState({});
  const [posts, setPosts] = useState([]);
  const loading = {
    start:()=> dispatch({ type: viewAction.startLoading }),
    stop:()=>dispatch({ type: viewAction.stopLoading })
  }
  useEffect(() => {
    loading.start()
    getPost(params)
      .then((res) => {
        setPosts(res.data)
      })
      .catch((res) => {
        console.warn(res);
      })
      .finally(loading.stop);
  }, [params]);
  return (
    <>
    <SearchBar params={params} setParams={setParams}/>
    <PostsContainer posts={posts} />
    </>
  )
}
