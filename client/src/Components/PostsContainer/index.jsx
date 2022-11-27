import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Grid } from "@mui/material";
import { imageURL } from "../../services";
import formatDate from "../../utils/formatDate";
import ComponentLink from "../ComponentLink";

export default function PostsContainer({ posts }) {
  return (
    <Container sx={{ my: 2 }} maxWidth="xl">
      <Grid container spacing={1}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} md={6} lg={4} xl={3}>
            <Card elevation={2}>
              <ComponentLink href={"/user/" + post.createdBy._id}>
                <CardHeader
                  avatar={
                    typeof post.createdBy.img !== "undefined" ? (
                      <Avatar
                        src={imageURL(post.createdBy.img, "xs")}
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
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "40px",
                  }}
                  variant="body2"
                  color="text.secondary"
                >
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
