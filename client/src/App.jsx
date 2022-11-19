import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import StyleProvider from "./utils/StyleProvider";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/home";
import SinglePost from "./pages/singlePost";
import Users from "./pages/users";
import SingleUser from "./pages/singleUser";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";
import AppSnackbar from "./components/AppSnackbar";

// Main func
export default function App() {
  const signed = useSelector((s) => s.auth.signed);
  const onlySignedUsers = signed ? <Outlet /> : <Navigate to="/sign_in" />;
  const onlyUnsignedUsers = signed ? <Navigate to="/profile" /> : <Outlet />;
  return (
    <StyleProvider>
      <BrowserRouter>
        <Navbar />
        <AppSnackbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/post/:id" element={<SinglePost />} />

          <Route index path="/users" element={<Users />} />
          <Route path="/user/:id" element={<SingleUser />} />

          {/* Only unsigned users */}
          <Route element={onlyUnsignedUsers}>
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<SignUp />} />
          </Route>

          {/* Only signed users */}
          <Route element={onlySignedUsers}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </StyleProvider>
  );
}
