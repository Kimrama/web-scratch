const dragItem = document.querySelectorAll(".drag-item");
const dragList = document.querySelectorAll(".drag-item-list");

let selectItem;

dragItem.forEach((item) => {
    item.addEventListener("dragstart", onDragStart);
});

dragList.forEach((list) => {
    list.addEventListener("dragover", onDragOver);
    list.addEventListener("dragenter", onDragEnter);
    list.addEventListener("drop", onDrop);
});

function onDragStart() {
    selectItem = this;
    console.log(selectItem);
}

function onDrop() {
    this.append(selectItem);
    selectItem = null;
}

function onDragEnter(e) {
    e.preventDefault();
}
function onDragOver(e) {
    e.preventDefault();
}
