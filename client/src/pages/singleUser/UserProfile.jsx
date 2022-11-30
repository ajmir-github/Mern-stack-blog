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
import { imageURL } from "../../services";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";

export default function UserProfile({ user }) {
  return (
    <Grid container alignItems="center" sx={{ p: 2 }} spacing={2}>
      <Grid item xs={12} container justifyContent="center">
        <Avatar
          variant="rounded"
          sx={{ width: 320, height: 320 }}
          src={
            typeof user.img === "undefined"
              ? "/assets/unknown_user.jpg"
              : imageURL(user.img, "md")
          }
        />
      </Grid>

      <Grid item xs={12} container flexDirection="column" alignItems="center">
        <Typography variant="h6">{user.fullName}</Typography>
        <Typography color="primary.dark" variant="subtitle1">
          {user.title}
        </Typography>
        <Typography color="primary.dark" variant="subtitle2">
          {user.email}
        </Typography>
      </Grid>
    </Grid>
  );
}
