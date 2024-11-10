
function showGame(game) {
    document.getElementById('game-container-2048').style.display = game === '2048' ? 'block' : 'none';
    document.getElementById('game-container-ludo').style.display = game === 'ludo' ? 'block' : 'none';
}

function startGame() {
    let goal = document.getElementById('goal-select').value;
    document.getElementById('message').innerText = 'Reach ' + goal + ' to win!';
}

function move(direction) {
    console.log('Moving:', direction);
}

function rollDice() {
    const result = Math.floor(Math.random() * 6) + 1;
    document.getElementById('dice-result').innerText = 'Rolled: ' + result;
}
