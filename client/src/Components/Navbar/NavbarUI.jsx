import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Avatar, Button, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authAction, viewAction } from "../../state";
import { useNavigate } from "react-router-dom";
import { imageURL } from "../../services";

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, auth] = useSelector((s) => [s.view, s.auth]);
  // funcs must be here no in the elements
  const signOut = () => {
    dispatch({ type: authAction.signOut });
    handleClose();
  };
  const turnDarkMode = () => {
    dispatch({ type: viewAction.turnDarkMode });
  };
  const turnLightMode = () => {
    dispatch({ type: viewAction.turnLightMode });
  };
  const gotoLoginPage = () => {
    navigate("/sign_in");
  };
  const gotoProfilePage = () => {
    handleClose();
    navigate("/profile");
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{ p: 1 }}>
      <Toolbar>
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
        <Typography
          variant="h4"
          component="h1"
          sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bolder" }}
        >
          <img
            src="/assets/SpeakUpLogo.min.png"
            alt="SpeakUp Logo"
            width={48}
          />
        </Typography>
        {auth.signed ? (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
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
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={gotoProfilePage}>Profile</MenuItem>
              <MenuItem onClick={signOut}>Log out</MenuItem>
            </Menu>
          </div>
        ) : (
          <Button color="inherit" onClick={gotoLoginPage}>
            Login
          </Button>
        )}
      </Toolbar>
    </Container>
  );
}
