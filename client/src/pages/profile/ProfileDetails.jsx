import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  LinearProgress,
  Menu,
  MenuItem,
  Modal,
  Typography,
} from "@mui/material";
import {
  authToken,
  deleteImage,
  imageURL,
  updateUser,
  uploadImage,
} from "../../services";
import MoreIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import UploadIcon from "@mui/icons-material/Upload";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { authAction, viewAction } from "../../state";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  overflow: "hidden",
  borderRadius: "1rem",
  p: 4,
};

function UploadProfile({ open, setOpen, currentImg }) {
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const upload = async (form) => {
    try {
      // upload the image
      setUploading(true);
      const resA = await uploadImage(form, setUploadingProgress);
      setUploading(false);

      console.log(resA);
      // save the image url in user.img
      dispatch({ type: viewAction.startLoading });
      await updateUser({ img: resA.data });
      // reload the user in auth.user
      const resC = await authToken();
      dispatch({ type: authAction.updateUser, payload: resC.data });

      dispatch({ type: viewAction.stopLoading });

      // delete the current image
      const res = await deleteImage(currentImg);
      setOpen(false);
    } catch (error) {
      console.warn(error);
    }
  };

  const onChange = (e) => {
    const input = e.target.files;
    if (input.length === 0) return;
    const form = new FormData();
    form.append("file", input[0]);
    upload(form);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {!uploading ? (
          <Button component="label" fullWidth>
            Upload File
            <input
              type="file"
              hidden
              name="file"
              accept="image/*"
              onChange={onChange}
            />
          </Button>
        ) : (
          <LinearProgress variant="determinate" value={uploadingProgress} />
        )}
      </Box>
    </Modal>
  );
}

export default function ProfileDetails({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [uploadProfileModal, setUploadProfileModal] = useState(false);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);
  const openUploadProfileModal = () => {
    closeMenu();
    setUploadProfileModal(true);
  };
  const openEditProfile = () => {
    closeMenu();
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          container
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            sx={{ width: 300, height: 300 }}
            src={
              typeof user.img === "undefined"
                ? "/assets/unknown_user.jpg"
                : imageURL(user.img, "md")
            }
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          container
          justifyContent="center"
          alignItems="center"
          sx={{ my: 2 }}
        >
          <Grid item container justifyContent="flex-end">
            <IconButton
              color="primary"
              onClick={handleClick}
              id="menu-more-btn"
              aria-controls={open ? "menu-more" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="menu-more"
              aria-labelledby="menu-more-btn"
              anchorEl={anchorEl}
              open={open}
              onClose={closeMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem onClick={openUploadProfileModal}>
                <UploadIcon sx={{ mr: 1 }} />
                Upload profile
              </MenuItem>

              <MenuItem onClick={openEditProfile}>
                <EditIcon sx={{ mr: 1 }} />
                Edit profile details
              </MenuItem>
            </Menu>
            <UploadProfile
              open={uploadProfileModal}
              setOpen={setUploadProfileModal}
              currentImg={user.img}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4">{user.fullName}</Typography>
            <Typography variant="h6">{user.title}</Typography>
            <Typography variant="subtitle1">{user.email}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
