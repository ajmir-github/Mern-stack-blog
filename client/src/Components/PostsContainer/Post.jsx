import { Link } from "react-router-dom";
import { imageURL } from "../../services";
import formatDate from "../../utils/formatDate";

export default function Post({ post }) {
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
      <p>{post.excerpt}</p>
      <div>
        <Link to={"/post/" + post._id}>Read more</Link>
      </div>
    </div>
  );
}
