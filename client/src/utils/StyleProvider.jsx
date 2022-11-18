import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

function getTheme(themeMode = "light") {
  if (themeMode === "light") {
    return createTheme({
      palette: {
        mode: "light",
      },
    });
  } else {
    return createTheme({
      palette: {
        mode: "dark",
      },
    });
  }
}

export default function StyleProvider({ children }) {
  const { theme, loading } = useSelector((s) => s.view);
  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />

      <Backdrop
        sx={{
          color: "primary.main",
          backgroundColor: (t) => t.palette.background.paper,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <Grid
          container
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <img src="/assets/SpeakUpLogo.png" alt="SpeakUp Logo" width={256} />
          </Grid>
          <Grid item>
            <CircularProgress color="inherit" />
          </Grid>
          <Grid item sx={{ pt: 1 }}>
            <Typography variant="h6">Loading</Typography>
          </Grid>
        </Grid>
      </Backdrop>
      {children}
    </ThemeProvider>
  );
}
