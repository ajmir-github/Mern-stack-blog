import IconButton from "@mui/material/IconButton";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import SignOutIcon from "@mui/icons-material/Logout";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { authAction, viewAction } from "../state";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UploadIcon from "@mui/icons-material/UploadFile";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import UploadProfile from "./uploadProfile";
import EditProfile from "./EditProfile";
import { Button, Grid } from "@mui/material";
import Feed from "./Feed";
import PostIcon from "@mui/icons-material/PostAdd";

export default function UserFunc() {
  const [openUploadProfile, setOpenUploadProfile] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openPostModal, setPostModal] = useState(false);

  const closeMenu = () => setAnchorEl(null);
  const user = useSelector((s) => s.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const signOut = () => {
    dispatch({ type: authAction.signOut });
    closeMenu();
    dispatch({
      type: viewAction.openSnackbar,
      payload: {
        open: true,
        message: "You are signed out!",
        severity: "info",
      },
    });
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const setOpenUploadProfileFunc = () => {
    setOpenUploadProfile(true);
    closeMenu();
  };
  const setOpenEditProfileFunc = () => {
    setOpenEditProfile(true);
    closeMenu();
  };
  return (
    <>
      <Grid container flexDirection={"column"} spacing={1}>
        <Grid item>
          <Button
            startIcon={<PostIcon />}
            onClick={() => setPostModal(true)}
            fullWidth
            variant="outlined"
          >
            Make a post
          </Button>
          <Feed open={openPostModal} setOpen={setPostModal} />
        </Grid>
        <Grid item>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<UploadIcon />}
            onClick={setOpenUploadProfileFunc}
          >
            Upload Profile
          </Button>
        </Grid>

        <Grid item>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<ProfileIcon />}
            onClick={setOpenEditProfileFunc}
          >
            Edit Profile
          </Button>
        </Grid>

        <Grid item>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SignOutIcon />}
            onClick={signOut}
          >
            Sign out
          </Button>
        </Grid>
      </Grid>

      <UploadProfile
        open={openUploadProfile}
        setOpen={setOpenUploadProfile}
        user={user}
      />
      <EditProfile
        open={openEditProfile}
        setOpen={setOpenEditProfile}
        user={user}
      />
    </>
  );
}
