const express = require("express");
const postsRouter = require("./routes/posts");

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});