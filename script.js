"use strict";

// Event Handlers
const boxes = document.querySelectorAll(".box");
const resultMessage = document.querySelector(".result-message");
const playAgainButton = document.querySelector(".btn");
const glassButton = document.querySelector(".glass-button");

class Game {
    #gameRunningStatus = true;
    #noOfMoves = 0;
    #currentPlayer = 1;
    board = [
        ["1", "2", "3"],
        ["4", "5", "6"],
        ["7", "8", "9"],
    ];
    constructor() {
        playAgainButton.addEventListener("click", function () {
            location.reload();
        });
        this._checkResult();
        // Event Listener for All Boxes
        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                this._moveAction(box);
            });
        });
    }
    _resultAction() {
        this.#currentPlayer == 1
            ? this._showPlayerXWin()
            : this._showPlayerOWin();
        this.#gameRunningStatus = false;
        glassButton.classList.remove("hidden");
    }
    // Function to check if condition of ending the game is met.
    _checkResult() {
        for (let i = 0; i < this.board.length; i++) {
            if (
                this.board[i][0] == this.board[i][1] &&
                this.board[i][1] == this.board[i][2]
            ) {
                this._resultAction();
            }
            if (
                this.board[0][i] == this.board[1][i] &&
                this.board[1][i] == this.board[2][i]
            ) {
                this._resultAction();
            }
            if (
                this.board[0][0] == this.board[1][1] &&
                this.board[1][1] == this.board[2][2]
            ) {
                this._resultAction();
            }
            if (
                this.board[0][2] == this.board[1][1] &&
                this.board[1][1] == this.board[2][0]
            ) {
                this._resultAction();
            }
        }
        if (this.#noOfMoves == 9) {
            this.#gameRunningStatus = false;
            this._showDraw();
        }
    }
    // Action to perform a move
    _moveAction(box) {
        if (!this.#gameRunningStatus) return;
        const boxNumber = box.dataset.number;
        const associatedBox = document.querySelector(`.box0${boxNumber}`);
        if (associatedBox.textContent != "") {
            this._showError();
            return;
        } else {
            resultMessage.classList.add("hidden");
        }
        const sign = this.#currentPlayer == 1 ? "X" : "O";
        const color = this.#currentPlayer == 1 ? "purple" : "orange-red";
        associatedBox.textContent = sign;
        associatedBox.classList.add(color);
        this.#noOfMoves++;
        this._updateBoard(boxNumber);
        // Ending player switch logic
        this._checkResult();
        this.#currentPlayer == 1
            ? (this.#currentPlayer = 2)
            : (this.#currentPlayer = 1);
    }

    _updateBoard(boxNumber) {
        boxNumber--;
        const row = parseInt(boxNumber / 3);
        const column = boxNumber % 3;
        console.log("Row: " + row);
        console.log("Column: " + column);
        const sign = this.#currentPlayer == 1 ? "X" : "O";
        this.board[row][column] = sign;
        console.log(this.board);
    }
    _displayMessage(className, msg) {
        resultMessage.classList.remove("hidden");
        resultMessage.classList.remove("draw");
        resultMessage.classList.remove("orange-red");
        resultMessage.classList.remove("purple");
        resultMessage.classList.remove("error");
        resultMessage.textContent = msg;
        resultMessage.classList.add(className);
    }
    _showError() {
        this._displayMessage(
            "error",
            "That box is already checked! Please select another"
        );
    }
    _showDraw() {
        this._displayMessage("draw", "It is a Draw!");
        glassButton.classList.remove("hidden");
    }
    _showPlayerXWin() {
        this._displayMessage("purple", "Player X Wins!");
    }
    _showPlayerOWin() {
        this._displayMessage("orange-red", "Player O Wins!");
    }
}

const game = new Game();
