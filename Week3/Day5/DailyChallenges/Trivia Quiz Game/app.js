const express = require("express");
const quizRouter = require("./routes/quiz");

const app = express();

app.use(express.json());

app.use("/quiz", quizRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});