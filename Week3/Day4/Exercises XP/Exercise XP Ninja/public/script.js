const questions = [
  {
    question: "Which keyword is used to declare a constant in JavaScript?",
    options: ["let", "const", "var", "static"],
    answer: 1,
  },
  {
    question: "Which method is used to add an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question: "What does HTML stand for?",
    options: [
      "HighText Machine Language",
      "HyperText Markup Language",
      "HyperTransfer Markup Language",
      "Hyperlinking Text Markup Language",
    ],
    answer: 1,
  },
  {
    question: "Which operator compares both value and type?",
    options: ["==", "=", "===", "!=="],
    answer: 2,
  },
  {
    question: "Which function is used to print output in the browser console?",
    options: ["print()", "console.log()", "alert()", "document.write()"],
    answer: 1,
  },
];

const scoreElement = document.getElementById("score");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedbackElement = document.getElementById("feedback");
const quizForm = document.getElementById("quiz-form");
const submitButton = document.getElementById("submit-btn");

let currentQuestionIndex = 0;
let score = 0;

function renderQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) {
    showFinalScore();
    return;
  }

  questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
  answersContainer.innerHTML = "";
  feedbackElement.textContent = "";
  feedbackElement.className = "";
  submitButton.disabled = false;

  currentQuestion.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";

    label.innerHTML = `
      <input type="radio" name="answer" value="${index}" />
      <span>${option}</span>
    `;

    answersContainer.appendChild(label);
  });

  scoreElement.textContent = score;
}

function showFinalScore() {
  questionElement.textContent = "Quiz Complete!";
  answersContainer.innerHTML = "";
  feedbackElement.textContent = `Your final score is ${score} out of ${questions.length}.`;
  feedbackElement.className = "correct";
  submitButton.disabled = true;
}

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedAnswer = document.querySelector('input[name="answer"]:checked');

  if (!selectedAnswer) {
    feedbackElement.textContent = "Please choose an answer before submitting.";
    feedbackElement.className = "wrong";
    return;
  }

  const selectedValue = Number(selectedAnswer.value);
  const currentQuestion = questions[currentQuestionIndex];
  const correctAnswer = currentQuestion.answer;

  if (selectedValue === correctAnswer) {
    score += 1;
    feedbackElement.textContent = "Correct! Great job!";
    feedbackElement.className = "correct";
  } else {
    feedbackElement.textContent = `Wrong! The correct answer was: ${currentQuestion.options[correctAnswer]}`;
    feedbackElement.className = "wrong";
  }

  scoreElement.textContent = score;
  submitButton.disabled = true;

  const answerInputs = document.querySelectorAll('input[name="answer"]');
  answerInputs.forEach((input) => {
    input.disabled = true;
  });

  setTimeout(() => {
    currentQuestionIndex += 1;
    renderQuestion();
  }, 1200);
});

renderQuestion();
