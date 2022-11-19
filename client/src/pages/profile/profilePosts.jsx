import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostsContainer from "../../components/PostsContainer";
import { getPost } from "../../services";
import { postAction, viewAction } from "../../state";

export default function ProfilePosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: viewAction.startLoading });
    getPost({ user: userId })
      .then((res) => {
        setPosts(res.data);
        dispatch({ type: viewAction.stopLoading });
      })
      .catch((res) => {
        console.warn(res);
      });
  }, []);
  return <PostsContainer posts={posts} />;
}
