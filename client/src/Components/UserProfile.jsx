import {
  Avatar,
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { imageURL } from "../services";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import UserFunc from "./UserFunc";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import Feed from "./Feed";

export default function UserProfile({ user, signed }) {
  return (
    <Container>
      <Grid container flexDirection="column" alignItems="center" sx={{ my: 2 }}>
        <Grid item>
          <Avatar
            variant="rounded"
            sx={{ width: 220, height: 220 }}
            src={
              typeof user.img === "undefined"
                ? "/assets/unknown_user.jpg"
                : imageURL(user.img, "sm")
            }
          />
        </Grid>

        <Grid item sx={{ my: 2 }}>
          <Typography variant="h6">{user.fullName}</Typography>
          <Typography color="primary.dark" variant="subtitle1">
            {user.title}
          </Typography>
          <Typography color="primary.dark" variant="subtitle2">
            {user.email}
          </Typography>
        </Grid>
        {signed && <UserFunc />}
      </Grid>
    </Container>
  );
}
