import express from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/userRoute";
import { blogRouter } from "./routes/blogRoute";

const app = express();
app.use(express.json())

// app.use("/", (req, res) => {
//   res.send("Hi machan");
// });


// user api route
app.use("/api/user", userRouter);

// blog api route
app.use('/api/blog',blogRouter)

mongoose
  .connect(
    "mongodb+srv://admin12:Admin123@cluster0.lcvw3pm.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(8000, () => {
  console.log("app is started");
});
