const column = 5;
const row = 6;

const currentColumn = 0;
const currentRow = 0;

var gameOver = false;
var word = 'FAVOR';

window.onload = function () {
    initialize();
}

function initialize() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            let cell = document.createElement("span");
            cell.id = i.toString() + "-" + j.toString(); //0-1
            cell.classList("cell");
            cell.innerText = "P";
            document.getElementById("grid").appendChild(cell);
        }
    }
}

