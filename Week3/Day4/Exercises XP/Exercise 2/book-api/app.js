import express from "express"

const app = express()
app.use(express.json())

let books = [{
    id: 0,
    title: "lord of the rings",
    author: "J.R.R. Tolkein",
    publishedyear: 1954
}]

app.get("/api/books", (req, res) => {
    res.json(books)
})

app.get("/api/books/:bookId", (req, res) => {
    const bookId = parseInt(req.params.bookId)
    const book = books.find(b => b.id === bookId)

    if (book) {
        res.json(book)
        res.status(200)
    } else {
        res.status(404).json({ message: "Book not found" })
    }
})

app.post("/api/books", (req, res) => {
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author,
        publishedyear: req.body.publishedyear
    }
    books.push(newBook)
    res.status(201).json(newBook)
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})