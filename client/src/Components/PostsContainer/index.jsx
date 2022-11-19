import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Box, Grid } from "@mui/material";
import { imageURL } from "../../services";
import formatDate from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";

function ComponentLink({ href, children }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ cursor: "pointer" }} onClick={() => navigate(href)}>
      {children}
    </Box>
  );
}

export default function PostsContainer({ posts }) {
  return (
    <Container sx={{ my: 2 }} maxWidth="xl">
      <Grid container spacing={1}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
            <Card elevation={2}>
              <ComponentLink href={"/user/" + post.createdBy._id}>
                <CardHeader
                  avatar={
                    typeof post.createdBy.img !== "undefined" ? (
                      <Avatar
                        src={imageURL(post.createdBy.img, "xxs")}
                        aria-label="User profile photo"
                      />
                    ) : (
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="User profile avatar"
                      >
                        {post.createdBy.fullName.slice(0, 2)}
                      </Avatar>
                    )
                  }
                  title={post.createdBy.fullName}
                  subheader={formatDate(post.date)}
                />
              </ComponentLink>

              <ComponentLink href={"/post/" + post._id}>
                {typeof post.img !== "undefined" ? (
                  <CardMedia
                    component="img"
                    sx={{ height: { sm: 240 } }}
                    image={imageURL(post.img, "md")}
                    alt="Paella dish"
                  />
                ) : (
                  <Grid
                    container
                    sx={{ height: { sm: 240 } }}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <Typography variant="h6">{post.title}</Typography>
                    </Grid>
                  </Grid>
                )}
              </ComponentLink>

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.excerpt ||
                    `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Similique nostrum`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
