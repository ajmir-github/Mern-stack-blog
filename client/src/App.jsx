import { BrowserRouter, Routes, Route } from "react-router-dom";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/home";
import Articles from "./pages/articles";
import Article from "./pages/Article";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";
import { useSelector } from "react-redux";
import "./App.css";

// Main func
export default function App() {
  const theme = useSelector((s) => s.view.theme);
  return (
    <main
      style={{
        backgroundColor:
          theme === "light" ? "rgb(225, 225, 225)" : "rgb(200, 200, 200)",
      }}
    >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
