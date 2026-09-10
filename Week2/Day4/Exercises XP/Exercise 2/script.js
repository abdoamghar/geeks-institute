
const form = document.getElementsByTagName("form")[0];
console.log(form);
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
console.log(fname, lname);

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const fnameValue = fname.value ? fname.value : "First name is empty";
    const lnameValue = lname.value ? lname.value : "Last name is empty";

    let fnameLi = document.createElement("li");
    let lnameLi = document.createElement("li");
    fnameLi.textContent = fnameValue;
    lnameLi.textContent = lnameValue;

    const ul = document.getElementsByTagName("ul")[0];
    ul.appendChild(fnameLi);
    ul.appendChild(lnameLi);
});