const express = require("express");
const router = express.Router();
const triviaQuestions = require("../models/trivia.js");

let currentQuestion = 0;
let score = 0;

router.get("/", (req, res) => {
  currentQuestion = 0;
  score = 0;

  res.json({
    questionNumber: currentQuestion + 1,
    question: triviaQuestions[currentQuestion].question,
  });
});

router.post("/", (req, res) => {
  const { answer } = req.body;

  if (!answer) {
    return res.status(400).json({
      message: "Please provide an answer.",
    });
  }

  const correctAnswer = triviaQuestions[currentQuestion].answer;

  let feedback;

  if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
    score++;
    feedback = "Correct!";
  } else {
    feedback = `Incorrect! The correct answer is ${correctAnswer}.`;
  }

  currentQuestion++;

  if (currentQuestion >= triviaQuestions.length) {
    return res.json({
      feedback,
      message: "Quiz finished!",
      score,
      next: "/quiz/score",
    });
  }

  res.json({
    feedback,
    questionNumber: currentQuestion + 1,
    question: triviaQuestions[currentQuestion].question,
  });
});

router.get("/score", (req, res) => {
  res.json({
    message: "Final Score",
    score,
    totalQuestions: triviaQuestions.length,
  });
});

module.exports = router;