
document.getElementById("input").addEventListener("input", (e) => {
    const inputText = e.target.value;
    const cleanedText = inputText.replace(/[^a-zA-Z\s]/g, "");
    e.target.value = cleanedText;
});