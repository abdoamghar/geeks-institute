const board = document.querySelector(".container");
const palette = document.querySelector(".color-palette");
const clearButton = document.querySelector(".clear-button");
const colors = [
	"#ff0000", "#ff7f00", "#ffff00", "#7fff00", "#00ff00", "#00ff7f",
	"#00ffff", "#007fff", "#0000ff", "#7f00ff", "#ff00ff", "#ff007f",
	"#800000", "#804000", "#808000", "#008000", "#008080", "#000080",
	"#800080", "#808080", "#000000"
];
let selectedColor = colors[0];

for (const color of colors) {
	const colorButton = document.createElement("button");
	colorButton.type = "button";
	colorButton.classList.add("color");
	colorButton.style.backgroundColor = color;
	colorButton.setAttribute("aria-label", `Choose ${color}`);

	colorButton.addEventListener("click", function () {
		selectedColor = color;
	});

	palette.appendChild(colorButton);
}

for (let index = 0; index < 1350; index++) {
	const cell = document.createElement("div");
	cell.classList.add("cells");
	board.appendChild(cell);
}

const cells = document.getElementsByClassName("cells");
let isMouseDown = false;

clearButton.addEventListener("click", function () {
	for (const cell of cells) {
		cell.style.backgroundColor = "";
	}
});

function colorCell(cell) {
	cell.style.backgroundColor = selectedColor;
}

for (const cell of cells) {
	cell.addEventListener("mousedown", function () {
		isMouseDown = true;
		colorCell(cell);
	});

	cell.addEventListener("mouseover", function () {
		if (isMouseDown) {
			colorCell(cell);
		}
	});
}

document.addEventListener("mouseup", function () {
	isMouseDown = false;
});


