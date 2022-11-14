import express from "express";
import {
  createBlog,
  getAllBlog,
  updateBlog,
  getByIdBlog,
  deleteBlog,
  getUserById,
} from "../controller/blogController";

export const blogRouter = express.Router();

blogRouter.get("/getAllBlog", getAllBlog);
blogRouter.post("/createBlog", createBlog);
blogRouter.put("/updateBlog/:id", updateBlog);
blogRouter.post("/getById", getByIdBlog);
blogRouter.delete("/:id", deleteBlog);
blogRouter.get('/user/:id',getUserById)
