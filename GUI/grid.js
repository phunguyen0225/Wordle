'use strict';

const column = 5;
const row = 6;

let currentColumn = 0;
let currentRow = 0;

let gameOver = false;
const target = 'FAVOR';

window.onload = function () {
    initialize();
};

function initialize() {
    //setting the grid
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            const cell = document.createElement('span');
            cell.id = i.toString() + '-' + j.toString();   //set the id to "0-1"
            cell.classList.add('cell');
            cell.innerText = '';
            document.getElementById('grid').appendChild(cell);
        }
    }
    //listen for key
    document.addEventListener('keyup', (event) => {
        if (gameOver) return;

        if ('KeyA' <= event.code && event.code <= 'KeyZ') { //if between A-Z
            if (currentColumn < column) {       //if not out of bound
                const currentCell = document.getElementById(currentRow.toString() + '-' + currentColumn.toString()); //get the id if currentRow and column
                if (currentCell.innerText === '') {
                    currentCell.innerText = event.code[3];   //KeyA so A is index [3]
                    currentColumn += 1;
                }
            }
        } else if (event.code === 'Backspace') {   //delete inbound and set equal to empty string
            document.getElementById('guess').disabled = true;
            if (0 < currentColumn && currentColumn <= column) {
                currentColumn -= 1;
            }

            const currentCell = document.getElementById(currentRow.toString() + '-' + currentColumn.toString());
            currentCell.innerText = '';
        }

        const filledCell = document.getElementById(currentRow.toString() + '-' + (column - 1).toString()); //geting the id of currentrow and last column

        if (filledCell.innerText !== '') {  //disable guess button if the last column is not empty
            document.getElementById('guess').disabled = false;
            const clicked = document.getElementById('guess');
            clicked.addEventListener('click', update);
            currentRow += 1;     //move to the next row
            currentColumn = 0;   //reset column at the start
        }

        if (!gameOver && currentRow === row) {
            gameOver = true;
        }
    });
}

function readGuess() {
    let guessWord = '';
    for (let col = 0; col < column; col++) {
        const currentCell = document.getElementById((currentRow - 1).toString() + '-' + col.toString());
        guessWord += currentCell.innerText;
    }

    return guessWord;
}

function display(numberOfAttempts, status, matchResponse, message) {
    if (status === 'Won' && numberOfAttempts === 1) {
        for (let col = 0; col < column; col++) {
            const currentCell = document.getElementById((currentRow - 1).toString() + '-' + col.toString());
            currentCell.classList.add('exact');
        }

        console.log(message);
        gameOver = true;

    } else if (status === 'In progress') {
        for (let col = 0; col < column; col++) {
            const currentCell = document.getElementById((currentRow - 1).toString() + '-' + col.toString());

            if (matchResponse[col] === 'Exact') {
                currentCell.classList.add('exact');
            } else if (matchResponse[col] === 'Match') {
                currentCell.classList.add('match');
            } else if (matchResponse[col] === 'NO_MATCH') {
                currentCell.classList.add('noMatch');
            }
        }

    }

}
function update() {
    play(target, readGuess, display);
}
