const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static("public"));

const emojis = [
    { emoji: "😀", name: "Smile" },
    { emoji: "🐶", name: "Dog" },
    { emoji: "🌮", name: "Taco" },
    { emoji: "🐱", name: "Cat" },
    { emoji: "🍕", name: "Pizza" },
    { emoji: "🚗", name: "Car" },
    { emoji: "⚽", name: "Football" },
    { emoji: "🍎", name: "Apple" },
    { emoji: "🔥", name: "Fire" },
    { emoji: "❤️", name: "Heart" }
];

let score = 0;
let currentEmoji = null;
let leaderboard = [];

function getQuestion() {
    currentEmoji = emojis[Math.floor(Math.random() * emojis.length)];

    const wrongOptions = emojis
        .filter(item => item.name !== currentEmoji.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(item => item.name);

    const options = [...wrongOptions, currentEmoji.name]
        .sort(() => Math.random() - 0.5);

    return {
        emoji: currentEmoji.emoji,
        options,
        score
    };
}

app.get("/api/question", (req, res) => {
    res.json(getQuestion());
});

app.post("/api/guess", (req, res) => {
    const { guess } = req.body;

    if (!currentEmoji) {
        return res.status(400).json({
            message: "No active question"
        });
    }

    const correct = guess === currentEmoji.name;

    if (correct) {
        score++;
    }

    res.json({
        correct,
        correctAnswer: currentEmoji.name,
        score
    });
});

app.post("/api/leaderboard", (req, res) => {
    const { name } = req.body;

    leaderboard.push({
        name: name || "Player",
        score
    });

    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);

    res.json(leaderboard);
});

app.get("/api/leaderboard", (req, res) => {
    res.json(leaderboard);
});

app.post("/api/reset", (req, res) => {
    score = 0;
    currentEmoji = null;

    res.json({ score });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});