$(document).ready(function () {
    initializeEverything();
    startInterval(redBalls);
    startInterval(yellowBalls);
    startCollision(redBalls, 25);
    startCollision(yellowBalls, 25);
    // startYellowInterval();
});

function log(message) {
    console.log(message);
}

var gameBoard = $("#game-board");
var square = {
    id: "square", 
    color: "blue", 
    speed: 10, 
    size: 40, 
    location: gameBoard
};

var redBalls = {
    balls: [],
    number: 12,
    color: "red",
    generate: null,
    generateTime: 1000,
    collision: null,
    location: "#red-balls"
};
var yellowBalls = {
    balls: [],
    number: 5,
    color: "yellow",
    generate: null,
    generateTime: 2000,
    collision: null,
    location: "#yellow-balls"
};

function initializeEverything() {
    addBalls(redBalls);
    addBalls(yellowBalls);
    square = addSquare("square", "blue", 10, 40, gameBoard);
}

function startInterval(balls) {
    balls.generate = setInterval(function () {
        var i;
        for (i = 0; i < balls.number; i += 1) {
            if (balls.balls[i].visible === false) {
                let pos = [], good = false, j;

                while (good === false) {
                    pos = randomBallCoordinates();
                    balls.balls[i].posX = pos[0];
                    balls.balls[i].posY = pos[1];

                    // debugger;
                    for (j = 0; j < balls.number; j += 1) {
                        if (i != j && balls.balls[j].visible === true) {
                            if (balls.balls[i].checkCollision(balls.balls[j])) {
                                log("found collision");
                                break;
                            }
                        }
                    }

                    if (j === balls.number){
                        good = true;
                        log("no collisions found");
                    }
                }

                $(balls.location + " div:nth-child(" + (i + 1) + ")")
                    .css("left", balls.balls[i].posX + "px")
                    .css("top", balls.balls[i].posY + "px");

                balls.balls[i].visible = true;
                $(balls.location + " div:nth-child(" + (i + 1) + ")").toggle();
                break;
            }
        }
        if (i === balls.number) {
            clearInterval(balls.generate);
            balls.generate = null;
        }
    }, balls.generateTime);
}

function startCollision(balls, time) {
    balls.collision = setInterval(function() {
        for (let i = 0; i < balls.number; i += 1) {
            if (balls.balls[i].checkCollision(square) && balls.balls[i].visible === true) {
                balls.balls[i].visible = false;
                $(balls.location + " div:nth-child(" + (i + 1) + ")").toggle();

                if (!balls.generate){
                    startInterval(balls);
                }
            }
        }
    }, time);
}