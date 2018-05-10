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
}

function game() {
    console.log("pla");
}