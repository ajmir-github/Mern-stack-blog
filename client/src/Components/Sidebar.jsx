import {
  AppBar,
  Avatar,
  Box,
  Container,
  Grid,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { imageURL } from "../services";
import SignIn from "../pages/signIn";
import SignUp from "../pages/signUp";
import UserFunc from "./UserFunc";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import UserProfile from "./UserProfile";

export default function Sidebar() {
  const auth = useSelector((s) => s.auth);
  const [currentTab, setCurrentTab] = useState("1");
  const changeTab = (event, newValue) => setCurrentTab(newValue);

  return (
    <Box sx={{ position: "sticky", top: 0 }}>
      {auth.signed ? (
        <UserProfile user={auth.user} signed={auth.signed} />
      ) : (
        <TabContext value={currentTab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              centered
              variant="fullWidth"
              onChange={changeTab}
              aria-label="lab API tabs example"
            >
              <Tab label="Sign In" value="1" />
              <Tab label="Sign Up" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SignIn />
          </TabPanel>
          <TabPanel value="2">
            <SignUp />
          </TabPanel>
        </TabContext>
      )}
    </Box>
  );
}
