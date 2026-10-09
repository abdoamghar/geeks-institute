const express = require("express");

const app = express();
const port = 5000;

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.send("Hello From Express");
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.message}`
  );
});

app.listen(port, () => {
  console.log(`Express server is running on port ${port}`);
});
