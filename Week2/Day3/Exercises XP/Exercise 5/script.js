const container = document.getElementById("container");
console.log(container);

// Change Pete to Richard
document.querySelector(".list li:nth-child(2)").textContent = "Richard";

// Delete Sarah
document.querySelectorAll(".list")[1].children[1].remove();

// Change first li of each ul to your name
const lists = document.querySelectorAll(".list");

for (let list of lists) {
    list.firstElementChild.textContent = "Abdelhamid";
}

// Add student_list to both ul's
for (let list of lists) {
    list.classList.add("student_list");
}

// Add university and attendance to first ul
lists[0].classList.add("university", "attendance");

// Style the div
container.style.backgroundColor = "lightblue";
container.style.padding = "20px";

// Hide Dan
for (let li of document.querySelectorAll("li")) {
    if (li.textContent === "Dan") {
        li.style.display = "none";
    }
}

// Add border to Richard
for (let li of document.querySelectorAll("li")) {
    if (li.textContent === "Richard") {
        li.style.border = "1px solid black";
    }
}

// Change body font size
document.body.style.fontSize = "20px";

// Bonus
if (container.style.backgroundColor === "lightblue") {
    alert("Hello " + lists[0].firstElementChild.textContent + " and " + lists[1].firstElementChild.textContent);
}