document.querySelector("input[type='button']").addEventListener("click", function removecolor() {
    const selectedColor = document.getElementById("colorSelect")
    selectedColor.options[selectedColor.selectedIndex].remove()
});