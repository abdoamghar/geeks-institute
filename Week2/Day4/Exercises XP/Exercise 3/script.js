var allBoldItems;

function getBoldItems() {
    allBoldItems = document.getElementsByTagName("strong");
}

function highlight(){
    for (item of allBoldItems) {
        item.style.color = "blue"
    }   
}

function returnItemsToDefault() {
    for (item of allBoldItems) {
        item.style.color = "black"
    } 
}

getBoldItems()
const p = document.getElementsByTagName("p")[0]
p.addEventListener("mouseover", highlight)
p.addEventListener("mouseout", returnItemsToDefault)