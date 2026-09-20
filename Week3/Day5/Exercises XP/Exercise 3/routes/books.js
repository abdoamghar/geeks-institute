const express = require("express");
const router = express.Router();

const books = [];

router.get("/", (req, res) => {
    res.json(books);
});

router.post("/", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    book.title = req.body.title ?? book.title;
    book.author = req.body.author ?? book.author;

    res.json(book);
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = books.findIndex(book => book.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);

    res.json(deletedBook[0]);
});

module.exports = router;