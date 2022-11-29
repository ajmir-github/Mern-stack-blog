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

// Main func
export default function App() {
  return (
    <StyleProvider>
      <BrowserRouter>
        <Navbar />
        <AppSnackbar />
        <Routes>
          <Route index path="/" element={<Home />}></Route>
          <Route path="/post/:id" element={<SinglePost />} />

          <Route index path="/users" element={<Users />} />
          <Route path="/user/:id" element={<SingleUser />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </StyleProvider>
  );
}
