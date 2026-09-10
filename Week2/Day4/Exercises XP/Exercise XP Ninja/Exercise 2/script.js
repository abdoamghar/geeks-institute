function myMove() {
    let box = document.getElementById("animate");
    let position = 0;

    let interval = setInterval(function() {
        if (position == 350) {
            clearInterval(interval);
        } else {
            position++;
            box.style.left = position + "px";
        }
    }, 1);
}