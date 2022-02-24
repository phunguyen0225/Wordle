'use strict';

const column = 5;
const row = 6;

let currentColumn = 0;
const currentRow = 0;

let gameOver = false;
const target = 'FAVOR';

window.onload = function () {
    initialize();
};

function initialize() {
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < column; j++) {
            const cell = document.createElement('span');
            cell.id = i.toString() + '-' + j.toString(); //0-1
            cell.classList.add('cell');
            cell.innerText = '';
            document.getElementById('grid').appendChild(cell);
        }
    }

    document.addEventListener('keyup', (event) => {
        if (gameOver) return;

        if ('KeyA' <= event.code && event.code <= 'KeyZ') {
            if (currentColumn < column) {
                const currentCell = document.getElementById(currentRow.toString() + '-' + currentColumn.toString());
                if (currentCell.innerText === '') {
                    currentCell.innerText = event.code[3];
                    currentColumn += 1;
                }
            }
        } else if (event.code === 'Backspace') {
            document.getElementById('guess').disabled = true;
            if (0 < currentColumn && currentColumn <= column) {
                currentColumn -= 1;
            }
            const currentCell = document.getElementById(currentRow.toString() + '-' + currentColumn.toString());
            currentCell.innerText = '';
        }

        const filledCell = document.getElementById(currentRow.toString() + '-' + (column - 1).toString());

        if (filledCell.innerText !== '') {
            document.getElementById('guess').disabled = false;
            const clicked = document.getElementById('guess');
            clicked.addEventListener('click', update);
        }

        if (!gameOver && currentRow === row) {
            gameOver = true;
        }
    });
}

function readGuess() {
    let guessWord = '';
    for (let col = 0; col < column; col++) {
        const currentCell = document.getElementById(currentRow.toString() + '-' + col.toString());
        guessWord += currentCell.innerText;
    }
    return guessWord;
}

function display(numberOfAttempts, status, matchResponse, message) {
    if (status === 'Won') {
        for (let item of matchResponse) {
            for (let col = 0; col < column; col++) {
                const currentCell = document.getElementById(currentRow.toString() + '-' + col.toString());
                currentCell.classList.add('exact');
            }
        }
        console.log(message);
        gameOver = true;
    } else if (status === 'In progress') {
        for (let col = 0; col < column; col++) {
            const currentCell = document.getElementById(currentRow.toString() + '-' + col.toString());
            if (matchResponse[col] === 'Exact') {
                currentCell.classList.add('exact')
            } else if (matchResponse[col] === 'Match') {
                currentCell.classList.add('match')
            } else if (matchResponse[col] === 'NO_MATCH') {
                currentCell.classList.add('noMatch')
            }
        }

    }

}
function update() {
    play(target, readGuess, display);
}
