const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener('click', cellClick, { once: true });
});

resetBtn.addEventListener('click', resetGame);

function cellClick(event) {
    const cellIndex = event.target.id.split('-')[1];
    if (gameState[cellIndex] !== '' || !gameActive) return;
    
    gameState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    event.target.classList.add(currentPlayer); // Agregar clase para cambiar color
    
    if (checkWin()) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        switchPlayer();
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c];
    });
}

function isDraw() {
    return gameState.every(cell => cell !== '');
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Turno de ${currentPlayer}`;
}

function endGame(draw) {
    if (draw) {
        message.textContent = `¡Empate!`;
    } else {
        message.textContent = `¡${currentPlayer} ha ganado!`;
    }
    gameActive = false;
}

function resetGame() {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    message.textContent = `Turno de ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O'); // Eliminar clases de X y O
        cell.addEventListener('click', cellClick, { once: true });
    });
}
