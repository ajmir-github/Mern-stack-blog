import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const gotoHome = () => {
    navigate("/");
  };
  const gotoUsers = () => {
    navigate("/users");
  };
  const gotoAbout = () => {
    navigate("/about");
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="fullWidth"
      aria-label="basic tabs example"
      centered
    >
      <Tab label="Posts" onClick={gotoHome} />
      <Tab label="Users" onClick={gotoUsers} />
      <Tab label="About" onClick={gotoAbout} />
    </Tabs>
  );
}
