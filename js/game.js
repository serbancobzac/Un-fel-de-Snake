$(document).ready(function () {
    initializeEverything();
    // window.setInterval(game, 25);
});

var gameBoard = $("#game-board");
var redBallsLoc = $("#red-balls");
var yellowBallsLoc = $("#yellow-balls");
var redBalls, yellowBalls, square;

function initializeEverything() {
    redBalls = addBalls("rb", "red", 12, redBallsLoc);
    yellowBalls = addBalls("yb", "yellow", 5, yellowBallsLoc);
    square = addSquare("square", "blue", 20, 40, gameBoard);
}

function game() {
    checkGameOver();
    moveSquare();
    updateEverything();
}

function updateEverything() {
    update(square);
    update(redBalls);
    update(yellowBalls);
}