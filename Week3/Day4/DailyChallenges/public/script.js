const emojiElement = document.getElementById("emoji");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const form = document.getElementById("guessForm");
const saveScoreButton = document.getElementById("saveScore");
const playerNameInput = document.getElementById("playerName");
const leaderboardElement = document.getElementById("leaderboard");

async function loadQuestion() {
    const response = await fetch("/api/question");
    const data = await response.json();

    emojiElement.textContent = data.emoji;
    scoreElement.textContent = data.score;
    feedbackElement.textContent = "";

    optionsElement.innerHTML = "";

    data.options.forEach(option => {
        const label = document.createElement("label");

        label.innerHTML = `
            <input type="radio" name="guess" value="${option}">
            ${option}
        `;

        optionsElement.appendChild(label);
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selected = document.querySelector(
        'input[name="guess"]:checked'
    );

    if (!selected) {
        feedbackElement.textContent = "Choose an answer!";
        return;
    }

    const response = await fetch("/api/guess", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            guess: selected.value
        })
    });

    const data = await response.json();

    scoreElement.textContent = data.score;

    if (data.correct) {
        feedbackElement.textContent = "Correct! 🎉";
    } else {
        feedbackElement.textContent =
            `Wrong! The correct answer was ${data.correctAnswer}`;
    }

    setTimeout(loadQuestion, 1000);
});

saveScoreButton.addEventListener("click", async () => {
    const name = playerNameInput.value.trim();

    if (!name) {
        feedbackElement.textContent = "Please enter your name!";
        return;
    }

    const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name
        })
    });

    const leaderboard = await response.json();

    leaderboardElement.innerHTML = "";

    leaderboard.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name} - ${player.score}`;
        leaderboardElement.appendChild(li);
    });

    feedbackElement.textContent = `${name}, your score has been saved! 🏆`;
    playerNameInput.value = "";
});

async function loadLeaderboard() {
    const response = await fetch("/api/leaderboard");
    const leaderboard = await response.json();

    leaderboardElement.innerHTML = "";

    leaderboard.forEach(player => {
        const li = document.createElement("li");
        li.textContent = `${player.name} - ${player.score}`;
        leaderboardElement.appendChild(li);
    });
}

loadQuestion();
loadLeaderboard();