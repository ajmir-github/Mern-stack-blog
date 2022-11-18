import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import PostCard from "./PostCard";

export default function PostsContainer({ posts }) {
  return (
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Grid container spacing={1}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
