document.getElementById("MyForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let radius = Number(document.getElementById("radius").value);

    let volume = (4 / 3) * Math.PI * Math.pow(radius, 3);

    document.getElementById("volume").value = volume;
});