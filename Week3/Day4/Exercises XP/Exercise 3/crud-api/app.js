import express from "express";
import dataService from "./data/dataService.js";

const app = express();

app.get("/posts", async (req, res) => {
    try {
        const posts = await dataService.fetchPosts();

        console.log("Posts successfully retrieved and sent");

        res.json(posts);
    } catch (error) {
        console.log("Error retrieving posts:", error.message);

        res.status(500).json({
            error: "Failed to retrieve posts"
        });
    }
});


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
