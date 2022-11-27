import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Avatar, Button, ButtonGroup, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { authAction, viewAction } from "../../state";
import { useNavigate } from "react-router-dom";

export default function MenuAppBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const view = useSelector((s) => s.view);
  // funcs must be here no in the elements

  const turnDarkMode = () => dispatch({ type: viewAction.turnDarkMode });

  const turnLightMode = () => dispatch({ type: viewAction.turnLightMode });

  const gotoHome = () => navigate("/");
  const gotoUsers = () => navigate("/users");

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
    </Container>
  );
}
