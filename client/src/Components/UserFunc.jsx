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

export default function UserFunc() {
  const [openUploadProfile, setOpenUploadProfile] = useState(false);
  const [openEditProfile, setOpenEditProfile] = useState(false);
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
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={setOpenUploadProfileFunc}>
          <ListItemIcon>
            <UploadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Upload Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={setOpenEditProfileFunc}>
          <ListItemIcon>
            <ProfileIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Profile</ListItemText>
        </MenuItem>

        <MenuItem onClick={signOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign out</ListItemText>
        </MenuItem>
      </Menu>

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
