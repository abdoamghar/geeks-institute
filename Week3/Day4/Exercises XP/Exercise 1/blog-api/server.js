import express from "express"

const app = express();
const PORT = 3000;

app.use(express.json());

let data = [
  {
    id: 1,
    title: "My First Post",
    content: "This is my first blog post."
  },
  {
    id: 2,
    title: "Learning Express",
    content: "Express makes creating APIs easier."
  }
];


app.get("/posts", (req, res) => {
  res.json(data);
});


app.get("/posts/:id", (req, res) => {
  const post = data.find(post => post.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json(post);
});


app.post("/posts", (req, res) => {
  const newPost = {
    id: data.length + 1,
    title: req.body.title,
    content: req.body.content
  };

  data.push(newPost);

  res.status(201).json(newPost);
});


app.put("/posts/:id", (req, res) => {
  const post = data.find(post => post.id === Number(req.params.id));

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.title = req.body.title;
  post.content = req.body.content;

  res.json(post);
});


app.delete("/posts/:id", (req, res) => {
  const index = data.findIndex(post => post.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  const deletedPost = data.splice(index, 1);

  res.json(deletedPost[0]);
});


// Invalid route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});


// Server error
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});