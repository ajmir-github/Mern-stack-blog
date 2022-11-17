import SinglePost from "./Post";

export default function PostsContainer({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}
    </div>
  );
}
