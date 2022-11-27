import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { red } from "@mui/material/colors";
import { useState } from "react";

export default function SignUp({ submit, state }) {
  const [passwordError, setPasswordError] = useState({
    error: false,
    message: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // inputs
    const username = data.get("username");
    const password = data.get("password");
    const confirmPassword = data.get("confirmPassword");
    const fullName = data.get("fullName");
    const email = data.get("email");
    const title = data.get("title");
    // validations
    if (password !== confirmPassword)
      return setPasswordError({
        error: true,
        message: "Confirm password not matched!",
      });

    // submission
    submit({
      username,
      password,
      fullName,
      email,
      title,
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1 }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              required
              fullWidth
              id="password"
              label="Password"
              error={passwordError.error}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="confirmPassword"
              label="Confirm Password"
              name="confirmPassword"
              error={passwordError.error}
              helperText={passwordError.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="fullName"
              label="Full Name"
              name="fullName"
              autoComplete="Full Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="Vacation"
            />
          </Grid>
        </Grid>
        {state.error && (
          <Typography variant="body1" sx={{ color: red[500] }}>
            {state.message}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
      </Box>
    </Box>
  );
}
