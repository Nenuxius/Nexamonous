const boardSize = 4;
let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
let goal = 128;

function startGame() {
    goal = parseInt(document.getElementById('goal-select').value);
    resetBoard();
    spawnTile();
    spawnTile();
    updateBoard();
    document.getElementById('message').textContent = `Goal: ${goal}`;
}

function resetBoard() {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(null));
}

function spawnTile() {
    let emptyTiles = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (!board[r][c]) emptyTiles.push({ r, c });
        }
    }
    if (emptyTiles.length > 0) {
        let { r, c } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        board[r][c] = 2;
    }
}

function updateBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    board.forEach(row => {
        row.forEach(value => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.textContent = value || '';
            boardDiv.appendChild(tile);
        });
    });
}

function move(direction) {
    if (direction === 'up') slideUp();
    else if (direction === 'down') slideDown();
    else if (direction === 'left') slideLeft();
    else if (direction === 'right') slideRight();

    spawnTile();
    updateBoard();
    checkWin();
}

function slideLeft() {
    for (let r = 0; r < boardSize; r++) {
        let newRow = board[r].filter(num => num !== null);
        for (let i = 0; i < newRow.length - 1; i++) {
            if (newRow[i] === newRow[i + 1]) {
                newRow[i] *= 2;
                newRow.splice(i + 1, 1);
            }
        }
        board[r] = [...newRow, ...Array(boardSize - newRow.length).fill(null)];
    }
}

function slideRight() {
    for (let r = 0; r < boardSize; r++) {
        let newRow = board[r].filter(num => num !== null);
        for (let i = newRow.length - 1; i > 0; i--) {
            if (newRow[i] === newRow[i - 1]) {
                newRow[i] *= 2;
                newRow.splice(i - 1, 1);
            }
        }
        board[r] = [...Array(boardSize - newRow.length).fill(null), ...newRow];
    }
}

function slideUp() {
    for (let c = 0; c < boardSize; c++) {
        let newCol = [];
        for (let r = 0; r < boardSize; r++) if (board[r][c]) newCol.push(board[r][c]);
        for (let i = 0; i < newCol.length - 1; i++) {
            if (newCol[i] === newCol[i + 1]) {
                newCol[i] *= 2;
                newCol.splice(i + 1, 1);
            }
        }
        for (let r = 0; r < boardSize; r++) board[r][c] = newCol[r] || null;
    }
}

function slideDown() {
    for (let c = 0; c < boardSize; c++) {
        let newCol = [];
        for (let r = 0; r < boardSize; r++) if (board[r][c]) newCol.push(board[r][c]);
        for (let i = newCol.length - 1; i > 0; i--) {
            if (newCol[i] === newCol[i - 1]) {
                newCol[i] *= 2;
                newCol.splice(i - 1, 1);
            }
        }
        for (let r = 0; r < boardSize; r++) board[r][c] = newCol[boardSize - r - 1] || null;
    }
}

function checkWin() {
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === goal) {
                document.getElementById('message').textContent = `Congratulations! You reached ${goal}`;
                return;
            }
        }
    }
}

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') move('up');
    else if (e.key === 'ArrowDown') move('down');
    else if (e.key === 'ArrowLeft') move('left');
    else if (e.key === 'ArrowRight') move('right');
});
