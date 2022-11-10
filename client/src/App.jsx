import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Article from "./Article";
import Navbar from "./Components/Navbar";
import SignUp from "./Routes/signUp";


export default function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>

      <Route index path="/" element={<h1>HOME</h1>} />
      <Route path="/articles" element={<h1>Articles</h1>} />
      <Route path="/article/:id" element={<Article />} />
      <Route path="/sign_in" element={<h1>SIGN IN</h1>} />
      <Route path="/sign_up" element={<SignUp />} />

      <Route path="/profile" element={<h1>Profile</h1>} />

      <Route path="*" element={<h1>404</h1>} />

    </Routes>
  </BrowserRouter>
}