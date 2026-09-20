const express = require("express");
const router = express.Router();
const posts = require("../models/posts");

router.get("/", (req, res) => {
  res.json(posts);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
});

router.post("/", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  const newPost = {
    id: posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1,
    title,
    content,
    timestamp: new Date(),
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  const post = posts.find((post) => post.id === id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      message: "Title and content are required",
    });
  }

  post.title = title;
  post.content = content;
  post.timestamp = new Date();

  res.json(post);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = posts.findIndex((post) => post.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const deletedPost = posts.splice(index, 1);

  res.json({
    message: "Post deleted successfully",
    post: deletedPost[0],
  });
});

module.exports = router;