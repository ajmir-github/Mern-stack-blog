import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "../services";
export default function Article() {
  const { id } = useParams();
  useEffect(() => {
    getSinglePost(id)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.warn(res);
      });
  }, [id]);
  return (
    <>
      <h1>ARTICLE: {id}</h1>
    </>
  );
}
