import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost, imageURL } from "../services";
import { Link } from "react-router-dom";
import formatDate from "../utils/formatDate";
// components
import GoBack from "../components/GoBack";
import ComponentLink from "../components/ComponentLink";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";

function Post({ post }) {
  return (
    <Card variant="outlined" sx={{ background: "none", mb: 2 }}>
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
        {typeof post.img !== "undefined" && (
          <CardMedia
            component="img"
            image={imageURL(post.img, "xl")}
            alt="Paella dish"
          />
        )}
      </ComponentLink>

      <CardContent>
        <Typography variant="h4">{post.title}</Typography>

        {typeof post.keywords !== "undefined" && (
          <Stack direction="row" spacing={1} sx={{ my: 2 }}>
            {post.keywords.split(",").map((keyword, index) => (
              <ComponentLink key={index} href={"/?keyword=" + keyword.trim()}>
                <Chip
                  clickable
                  label={keyword.trim()}
                  color="info"
                  variant="outlined"
                />
              </ComponentLink>
            ))}
          </Stack>
        )}
        <Typography variant="subtitle1" sx={{ my: 2 }}>
          {post.excerpt}
        </Typography>
        <Typography variant="body1">{post.body}</Typography>
      </CardContent>
    </Card>
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
  return (
    loaded && (
      <Container>
        <Post post={post} />
        <GoBack />
      </Container>
    )
  );
}
