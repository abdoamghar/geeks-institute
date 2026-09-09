let navBar = document.getElementById("navBar");

navBar.setAttribute("id", "socialNetworkNavigation");

let ul = navBar.querySelector("ul");

let newLi = document.createElement("li");

let textNode = document.createTextNode("Logout");

newLi.appendChild(textNode);

ul.appendChild(newLi);

console.log(ul.firstElementChild.textContent);
console.log(ul.lastElementChild.textContent);