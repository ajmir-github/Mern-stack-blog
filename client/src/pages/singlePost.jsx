import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost, imageURL } from "../services";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";

function Post({ post }) {
  return (
    <div style={{ padding: 10, margin: 10 }}>
      <div>
        <div>{post.createdBy?.fullName}</div>
        <Link to={"/user/" + post.createdBy?._id}>
          <img
            src={
              typeof post.img !== "undefined"
                ? imageURL(post.createdBy?.img, "xs")
                : "/assets/unknown_user.jpg"
            }
            width={64}
          />
        </Link>
      </div>
      <div>{formatDate(post.date)}</div>

      {typeof post.img !== "undefined" ? (
        <>
          <img src={imageURL(post.img, "md")} width={400} />
          <h4>{post.title}</h4>
        </>
      ) : (
        <h1>{post.title}</h1>
      )}

      {typeof post.keywords !== "undefined" && (
        <ul>
          {post.keywords.split(",").map((keyword) => (
            <li>{keyword.trim()}</li>
          ))}
        </ul>
      )}
      <p>{post.keywords}</p>
      <p>{post.excerpt}</p>
      <p>{post.body}</p>
    </div>
  );
}

export default function SinglePost() {
  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getSinglePost(id)
      .then((res) => {
        setLoaded(true);
        setPost(res.data);
      })
      .catch((res) => {
        console.warn(res);
      });
  }, [id]);
  return <>{loaded && <Post post={post} />}</>;
}
