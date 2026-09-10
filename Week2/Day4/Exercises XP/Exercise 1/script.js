// Exercise 1:
const h1Elements = document.getElementsByTagName("h1")
console.log(h1Elements[0].innerHTML)

const article = document.getElementsByTagName("article")[0]
const lastChild = article.lastElementChild
article.removeChild(lastChild)

const h2 = document.getElementsByTagName("h2")[0]
h2.addEventListener("click", function() {
    h2.style.backgroundColor = "red"
})

const h3 = document.getElementsByTagName("h3")[0]
h3.addEventListener("click", function() {
    h3.style.display = "none"
})

const btn = document.getElementsByTagName("button")[0]
btn.addEventListener("click", function() {
    const paragraphs = document.getElementsByTagName("p")
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.fontWeight = "bold"
    }
})

const h1 = h1Elements[0]
h1.addEventListener("mouseover", function() {
    h1.style.fontSize = Math.floor(Math.random() * 101) + "px"
})

const paragraph = document.getElementsByTagName("p")[1]
paragraph.addEventListener("mouseover", function() {
    paragraph.style.opacity = "0"
    paragraph.style.transition = "opacity 0.5s"
})