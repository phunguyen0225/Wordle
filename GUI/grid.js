var column = 5;
var row = 6;

var currentColumn = 0;
var currentRow = 0;

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
            cell.classList.add("cell");
            cell.innerText = "";
            document.getElementById("grid").appendChild(cell);
        }
    }

    document.addEventListener("keyup", (event) => {
        if (gameOver) return;

        if ("KeyA" <= event.code && event.code <= "KeyZ") {
            if (currentColumn < column) {
                let currentCell = document.getElementById(currentRow.toString() + "-" + currentColumn.toString());
                if (currentCell.innerText == "") {
                    currentCell.innerText = event.code[3];
                    currentColumn += 1;
                }
            }
        } else if (event.code == "Backspace") {
            if (0 < currentColumn && currentColumn <= column) {
                currentColumn -= 1;
            }
            let currentCell = document.getElementById(currentRow.toString() + "-" + currentColumn.toString());
            currentCell.innerText = "";
        }

        let filledCell = document.getElementById(currentRow.toString() + "-" + (column - 1).toString());
        if (filledCell.innerText !== "") {
            document.getElementById("guess").removeAttribute("disabled");
        }

        // else if (document.getElementById("guess").click = true) {
        //     reset();
        //     currentRow += 1;
        //     currentColumn = 0;
        // }

        if (!gameOver && currentRow == row) {
            gameOver = true;
        }
    })
}

function reset() {

}

