document.getElementById("genres").addEventListener("change", (e) => {
    const selectedGenre = e.target.value;
    console.log(`Selected genre: ${selectedGenre}`);
});

let selectedGenre = document.getElementById("genres")
let option = document.createElement("option")
option.value = "classic"
option.textContent = "Classic"
selectedGenre.appendChild(option)
selectedGenre.value = "classic"