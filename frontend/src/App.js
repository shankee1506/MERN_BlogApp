import { Routes, Route } from "react-router-dom";
import "./App.css";
import Blogs from "./components/Blogs";
import { Header } from "./components/Header";
import Login from "./components/Login";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";

function App() {
  return (
    <div>
      <div>
        <Header />
      </div>

      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/myBlogs" element={<UserBlog />} />
          <Route path="/myBlogs/:id" element={<BlogDetail />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
