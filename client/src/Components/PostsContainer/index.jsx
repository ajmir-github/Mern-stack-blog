import SinglePost from "./Post";

export default function PostsContainer({ posts }) {
  return (
    <div>
      {posts.length === 0 ? (
        <h1>No posts</h1>
      ) : (
        posts.map((post) => <SinglePost key={post._id} post={post} />)
      )}
    </div>
  );
}
