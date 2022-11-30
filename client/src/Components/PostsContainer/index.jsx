import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { imageURL } from "../../services";
import formatDate from "../../utils/formatDate";
import ComponentLink from "../ComponentLink";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { viewAction } from "../../state";
import { deletePost } from "../../services";

function Post({ post, reFetchPosts }) {
  const dispatch = useDispatch();
  const auth = useSelector((s) => s.auth);
  const [editable, setEditable] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  useEffect(() => {
    if (auth.signed) {
      if (auth.user._id === post.createdBy._id) {
        setEditable(true);
      }
    }
  }, [auth.signed]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openDeleteDialog = () => {
    setAnchorEl(null);
    setDeleteDialog(true);
  };
  const handleDeletePost = () => {
    setDeleteDialog(false);
    dispatch({ type: viewAction.startLoading });
    deletePost(post._id)
      .then((res) => {
        console.log(res);
        reFetchPosts();
        dispatch({ type: viewAction.stopLoading });
      })
      .catch((err) => {
        console.warn(err);
      });
  };

  return (
    <Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
      <Card variant="outlined" sx={{ background: "none" }}>
        <CardHeader
          avatar={
            <ComponentLink href={"/user/" + post.createdBy._id}>
              {typeof post.createdBy.img !== "undefined" ? (
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
              )}
            </ComponentLink>
          }
          title={post.createdBy.fullName}
          subheader={formatDate(post.date)}
          action={
            <IconButton
              aria-label="settings"
              sx={{ display: editable ? "inline-flex" : "none" }}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
        />

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Edit</ListItemText>
          </MenuItem>

          <MenuItem onClick={openDeleteDialog}>
            <ListItemIcon>
              <DeleteIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Delete</ListItemText>
          </MenuItem>
        </Menu>

        <Dialog
          open={deleteDialog}
          onClose={() => setDeleteDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialog(false)}>No</Button>
            <Button onClick={handleDeletePost} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>

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
  );
}

export default function PostsContainer({ posts, reFetchPosts }) {
  return (
    <Container sx={{ my: 2 }} maxWidth="xl">
      <Grid container rowSpacing={2} columnSpacing={1}>
        {posts.map((post) => (
          <Post key={post._id} post={post} reFetchPosts={reFetchPosts} />
        ))}
      </Grid>
    </Container>
  );
}
