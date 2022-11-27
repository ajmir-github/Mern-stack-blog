import { BrowserRouter, Routes, Route } from "react-router-dom";
import StyleProvider from "./utils/StyleProvider";
// components
import Navbar from "./components/Navbar";
// pages
import Home from "./pages/home";
import SinglePost from "./pages/singlePost";
import Users from "./pages/users";
import SingleUser from "./pages/singleUser";
import NotFound from "./pages/notFound";
import AppSnackbar from "./components/AppSnackbar";
import { Grid } from "@mui/material";
import Sidebar from "./components/Sidebar";

// Main func
export default function App() {
  return (
    <StyleProvider>
      <BrowserRouter>
        <Navbar />
        <AppSnackbar />
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            <Sidebar />
          </Grid>
          <Grid item xs={12} sm={6} md={8} lg={9} xl={10}>
            <Routes>
              <Route index path="/" element={<Home />}></Route>
              <Route path="/post/:id" element={<SinglePost />} />

              <Route index path="/users" element={<Users />} />
              <Route path="/user/:id" element={<SingleUser />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Grid>
        </Grid>
      </BrowserRouter>
    </StyleProvider>
  );
}
