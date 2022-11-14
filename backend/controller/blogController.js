import mongoose from "mongoose";
import Blog from "../model/blogModel";
import User from "../model/userModel";

export const getAllBlog = async (req, res, next) => {
  const blog = await Blog.find();

  if (!blog) {
    res.status(400).send("No Blog Available");
  }

  try {
    res.status(200).send({ blog });
  } catch (error) {
    res.status(400).send({ Message: error });
  }
};

export const createBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.log(error);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "User not found by Id" });
  }

  const blog = new Blog({
    title: title,
    description: description,
    image: image,
    user: user,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
      await session.commitTransaction();
      
  } catch (error) {
    console.log(error);
    // res.status(500).json({ message: error });
  }
  res.status(200).json({ blog });
};

export const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description } = req.body;

  const blog = await Blog.findByIdAndUpdate(blogId, {
    title: title,
    description: description,
  });

  if (!blog) {
    return res.status(400).send("Blog not identify and update");
  }

  try {
    const blogData = await blog.save();
    res.status(200).send({ blogData });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const getByIdBlog = async (req, res, next) => {
  const id = req.body;

  const blog = await Blog.findById(id);

  if (!blog) {
    return res.status(400).json({ message: "Blog not available" });
  } else {
    return res.status(200).send({ blog });
  }
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;

  try {
    blog = await Blog.findByIdAndRemove(id).populate('user');
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    console.log(error);
  }

  if (!blog) {
    return res.status(500).json({ message: "Unable to delete" });
  } else {
    return res.status(200).json({ message: "Blog deleted successfully" });
  }
};

export const getUserById = async(req,res,next) => {
  const userId = req.params.id;

  let userBlog;

  try {
    userBlog = await User.findById(userId).populate('blogs');

  } catch (error) {
    return console.log(error)
  }

  if (!userBlog) {
    return res.status(404).json({message:"Cannot get the user's blogs"})
  }
  else {
    return res.status(200).json({blogs:userBlog})
  }
}