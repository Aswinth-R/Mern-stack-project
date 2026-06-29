import express from "express";

// routes import 
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js"

const app = express();
app.use(express.json());

// routes declaration
app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

export default app;