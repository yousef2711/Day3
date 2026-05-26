const express = require("express");
const morgan = require("morgan");
const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const errorHandler = require("./middlewares/errorHandler");
const connectDb = require("./config/dbConfig");
const { PORT } = require("./config/appConfig");

const app = express();

// app level middlewares
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    message: "Server is running smoothly",
  });
});

// Routes
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postsRouter);

// error handler middleware
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`✅✅ Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌❌ Failed to start server", err);
    process.exit(1);
  }
};

startServer();