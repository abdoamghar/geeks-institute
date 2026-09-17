const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(express.json());

const API_URL = "https://jsonplaceholder.typicode.com/posts";


app.get("/api/posts", async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get posts"
        });
    }
});


app.get("/api/posts/:id", async (req, res) => {
    try {
        const response = await axios.get(
            `${API_URL}/${req.params.id}`
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to get post"
        });
    }
});


app.post("/api/posts", async (req, res) => {
    try {
        const response = await axios.post(
            API_URL,
            req.body
        );

        res.status(201).json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to create post"
        });
    }
});


app.put("/api/posts/:id", async (req, res) => {
    try {
        const response = await axios.put(
            `${API_URL}/${req.params.id}`,
            req.body
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({
            error: "Failed to update post"
        });
    }
});


app.delete("/api/posts/:id", async (req, res) => {
    try {
        await axios.delete(
            `${API_URL}/${req.params.id}`
        );

        res.json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to delete post"
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});