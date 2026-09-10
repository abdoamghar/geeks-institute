const shoppingList = []
const root = document.getElementById("root")

const form = document.createElement("form")
const input = document.createElement("input")
input.type = "text"
input.placeholder = "Add an item"
input.required = true

const addButton = document.createElement("button")
addButton.type = "submit"
addButton.textContent = "AddItem"

const clearButton = document.createElement("button")
clearButton.type = "button"
clearButton.textContent = "ClearAll"

const list = document.createElement("ul")

function addItem() {
	shoppingList.push(input.value)
	input.value = ""
	renderList()
}

function clearAll() {
	shoppingList.length = 0
	renderList()
}

function renderList() {
	list.innerHTML = ""

	shoppingList.forEach((item) => {
		const listItem = document.createElement("li")
		listItem.textContent = item
		list.appendChild(listItem)
	})
}

form.addEventListener("submit", (event) => {
	event.preventDefault()
	addItem()
})

clearButton.addEventListener("click", clearAll)

form.append(input, addButton)
root.append(form, clearButton, list)