const express = require("express");
const greetingRouter = require("./routes/greeting");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/", greetingRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});