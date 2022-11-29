import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {
  Avatar,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authAction, viewAction } from "../../state";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import Sidebar from "../Sidebar";

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDrawer, setDrawer] = useState(false);
  const view = useSelector((s) => s.view);
  const turnDarkMode = () => dispatch({ type: viewAction.turnDarkMode });
  const turnLightMode = () => dispatch({ type: viewAction.turnLightMode });
  const gotoHome = () => navigate("/");
  const gotoUsers = () => navigate("/users");

  return (
    <Container sx={{ p: 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => setDrawer(true)}
        >
          <MoreVertIcon />
        </IconButton>
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
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          <img
            src="/assets/SpeakUpLogo.min.png"
            alt="SpeakUp Logo"
            width={64}
          />
        </Typography>

        <ButtonGroup variant="text" aria-label="text button group" size="large">
          <Button onClick={gotoHome}>Posts</Button>
          <Button onClick={gotoUsers}>Users</Button>
        </ButtonGroup>
      </Toolbar>

      <Drawer anchor="left" open={openDrawer} onClose={() => setDrawer(false)}>
        <Button
          startIcon={<CloseIcon />}
          onClick={() => setDrawer(false)}
          color="error"
        >
          Close
        </Button>
        <Sidebar />
      </Drawer>
    </Container>
  );
}
