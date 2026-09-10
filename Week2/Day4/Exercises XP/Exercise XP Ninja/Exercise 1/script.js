function helloworld() {
    setTimeout(() => {
        alert("hello world")
    }, 2000)
}

helloworld()

function addParagraph() {
    setTimeout(() => {
        let div = document.getElementById("container")
        let p = document.createElement("p")
        p.innerHTML = "hello world"
        div.appendChild(p)

    }, 2000)
}
const container = document.getElementById("container")
const clearButton = document.getElementById("clear")

function addParagraph2() {
    const paragraph = document.createElement("p")
    paragraph.textContent = "Hello World"
    container.appendChild(paragraph)

    if (container.children.length === 5) {
        clearInterval(intervalId)
    }
}

function clearIntervalManually() {
    clearInterval(intervalId)
}

const intervalId = setInterval(addParagraph2, 2000)
clearButton.addEventListener("click", clearIntervalManually)

addParagraph2()