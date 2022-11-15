import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

// components
import Navbar from "./components/Navbar";

// pages
import Home from "./pages/home";
import Articles from "./pages/articles";
import Article from "./pages/article";
import SignUp from "./pages/signUp";
import SignIn from "./pages/signIn";
import Profile from "./pages/profile";
import NotFound from "./pages/notFound";
import LoadingPage from "./pages/loadingPage";

function ViewElement({ children }) {
  // this setup the whole theme
  // it stops rendering the whole app and shows loading page
  const { theme, loading } = useSelector((s) => s.view);
  return (
    <main className={theme === "light" ? "light-mode" : "dark-mode"}>
      {loading ? <LoadingPage /> : children}
    </main>
  );
}

// Main func
export default function App() {
  const signed = useSelector((s) => s.auth.signed);
  const onlySignedUsers = signed ? <Outlet /> : <Navigate to="/sign_in" />;
  const onlyUnsignedUsers = signed ? <Navigate to="/profile" /> : <Outlet />;
  return (
    <ViewElement>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<Article />} />

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
    </ViewElement>
  );
}
