document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("gameBoard");
    const statusText = document.getElementById("status");
    const resetButton = document.getElementById("resetButton");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // Winning combinations
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // Create board cells
    function createBoard() {
        board.innerHTML = "";
        gameBoard.forEach((cell, index) => {
            const div = document.createElement("div");
            div.classList.add("cell");
            div.dataset.index = index;
            div.textContent = cell;
            div.addEventListener("click", handleCellClick);
            board.appendChild(div);
        });
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;

        // Check if the cell is already taken or the game is over
        if (gameBoard[index] !== "" || !gameActive) return;

        gameBoard[index] = currentPlayer;
        event.target.textContent = currentPlayer;
        event.target.classList.add("taken");

        if (checkWin()) {
            statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
            gameActive = false;
            return;
        }

        if (gameBoard.every(cell => cell !== "")) {
            statusText.textContent = "It's a Draw! 🤝";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }

    function checkWin() {
        return winPatterns.some(pattern => {
            return pattern.every(index => gameBoard[index] === currentPlayer);
        });
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = `Player X's Turn`;
        createBoard();
    }

    resetButton.addEventListener("click", resetGame);
    
    createBoard();
});
