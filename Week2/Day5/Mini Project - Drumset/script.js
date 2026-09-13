const boom = new Audio("./sounds/boom.wav");
const clap = new Audio("./sounds/clap.wav");
const hihat = new Audio("./sounds/hihat.wav");
const kick = new Audio("./sounds/kick.wav");
const ride = new Audio("./sounds/ride.wav");
const openhat = new Audio("./sounds/openhat.wav");
const snare = new Audio("./sounds/snare.wav");
const tink = new Audio("./sounds/tink.wav");
const tom = new Audio("./sounds/tom.wav");

const sounds = {
    "a": boom,
    "s": clap,
    "d": hihat,
    "f": kick,
    "g": openhat,
    "h": ride,
    "j": snare,
    "k": tink,
    "l": tom
}

document.querySelectorAll(".container > div").forEach((item) => {
    item.addEventListener("click", () => {
        const key = item.querySelector("h1").textContent.toLowerCase();
        const sound = sounds[key];

        if (sound) {
            sound.currentTime = 0;
            sound.play();
            item.classList.add("active");
            setTimeout(() => item.classList.remove("active"), 150);
        }
    });
});


document.addEventListener("keydown", (e) => {
    const sound = sounds[e.key.toLowerCase()];

    if (sound) {
        sound.currentTime = 0;
        sound.play();

        const item = [...document.querySelectorAll(".container > div")]
            .find((tile) => tile.querySelector("h1").textContent.toLowerCase() === e.key.toLowerCase());

        if (item) {
            item.classList.add("active");
            setTimeout(() => item.classList.remove("active"), 150);
        }
    }
})
