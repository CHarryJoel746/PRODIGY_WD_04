
class TicTacToe {
    constructor() {
        this.cells = document.querySelectorAll('.cell');
        this.resetButton = document.getElementById('resetButton');
        this.messageDisplay = document.getElementById('message');
        this.isXNext = true;
        this.gameState = Array(9).fill(null);
        this.winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        this.addEventListeners();
        this.setMessage('Next Player: X');
    }
    
    addEventListeners() {
        this.cells.forEach(cell => cell.addEventListener('click', this.handleCellClick.bind(this)));
        this.resetButton.addEventListener('click', this.resetGame.bind(this));
    }

    handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute('data-index');
        
        if (this.gameState[index] || this.checkWinner()) {
            return;
        }
        
        this.gameState[index] = this.isXNext ? 'X' : 'O';
        cell.textContent = this.gameState[index];
        this.isXNext = !this.isXNext;
        
        const winner = this.checkWinner();
        if (winner) {
            this.setMessage(`${winner} wins!`);
        } else if (!this.gameState.includes(null)) {
            this.setMessage('Draw!');
        } else {
            this.setMessage(`Next Player: ${this.isXNext ? 'X' : 'O'}`);
        }
    }
    
    checkWinner() {
        for (const combination of this.winningCombinations) {
            const [a, b, c] = combination;
            if (this.gameState[a] && this.gameState[a] === this.gameState[b] && this.gameState[a] === this.gameState[c]) {
                return this.gameState[a];
            }
        }
        return null;
    }
    
    resetGame() {
        this.gameState = Array(9).fill(null);
        this.cells.forEach(cell => cell.textContent = '');
        this.isXNext = true;
        this.setMessage('Next Player: X');
    }
    
    setMessage(message) {
        this.messageDisplay.textContent = message;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});
