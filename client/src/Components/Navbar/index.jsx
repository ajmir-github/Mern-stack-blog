import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ProfileIcon from "@mui/icons-material/AccountCircle";
import SignOutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Button, ButtonGroup, Container, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authAction, viewAction } from "../../state";
import { useNavigate } from "react-router-dom";
import { imageURL } from "../../services";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [view, auth] = useSelector((s) => [s.view, s.auth]);
  // funcs must be here no in the elements

  const signOut = () => {
    dispatch({ type: authAction.signOut });
    handleClose();
    dispatch({
      type: viewAction.openSnackbar,
      payload: {
        open: true,
        message: "You are signed out!",
        severity: "info",
      },
    });
  };
  const turnDarkMode = () => dispatch({ type: viewAction.turnDarkMode });

  const turnLightMode = () => dispatch({ type: viewAction.turnLightMode });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const gotoProfilePage = () => {
    handleClose();
    navigate("/profile");
  };
  const gotoSignInPage = () => navigate("/sign_in");
  const gotoHome = () => navigate("/");
  const gotoUsers = () => navigate("/users");

  return (
    <Container sx={{ p: 1 }}>
      <Toolbar>
        <ButtonGroup variant="text" aria-label="text button group" size="large">
          <Button onClick={gotoHome}>Posts</Button>
          <Button onClick={gotoUsers}>Users</Button>
        </ButtonGroup>

        <Typography
          variant="h4"
          component="h1"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          <img
            src="/assets/SpeakUpLogo.min.png"
            alt="SpeakUp Logo"
            width={64}
          />
        </Typography>
        {view.theme === "light" ? (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={turnDarkMode}
          >
            <DarkModeIcon />
          </IconButton>
        ) : (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={turnLightMode}
          >
            <LightModeIcon />
          </IconButton>
        )}

        {auth.signed ? (
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                sx={{ width: 48, height: 48 }}
                src={
                  auth.user.img === "undefined"
                    ? "/assets/unknown_user.jpg"
                    : imageURL(auth.user.img, "xxs")
                }
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={gotoProfilePage}>
                <ListItemIcon>
                  <ProfileIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={signOut}>
                <ListItemIcon>
                  <SignOutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Sign out</ListItemText>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <IconButton onClick={gotoSignInPage}>
            <LoginIcon />
          </IconButton>
        )}
      </Toolbar>
    </Container>
  );
}
