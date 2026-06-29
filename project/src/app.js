import express from "express";

// routes import 
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json());

// routes declaration
app.use("/api/v1/user", userRouter);

export default app;