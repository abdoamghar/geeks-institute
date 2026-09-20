const express = require("express");
const booksRouter = require("./routes/books.js");

const app = express();

app.use(express.json());

app.use("/books", booksRouter);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});