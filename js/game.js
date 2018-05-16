$(document).ready(function () {
    var start = confirm("Red Ball -> +1 point\nYellow Ball -> -1 point and reposition Red Ball\nBlack Ball -> -1 life\nWhen all the yellow balls have spawned, they will start to grow in size.\nWhen one of the yellow balls has reached the maximum size, black balls will start to appear.\nYou have 60 seconds. Good Luck! ;)");
    if (start === true) {
        initializeEverything();
        startInterval(redBalls);
        startInterval(yellowBalls);
        startCollision(redBalls, 25);
        startCollision(yellowBalls, 25);
    }
});

function log(message) {
    console.log(message);
}

var gameBoard = $("#game-board");
var square = {
    id: "square", 
    color: "blue", 
    speed: 4, 
    posX: null,
    posY: null,
    size: 40, 
    location: gameBoard
};

var redBalls = {
    balls: [],
    number: 7,
    color: "red",
    generate: null,
    generateTime: 600,
    collision: null,
    location: "#red-balls"
};
var yellowBalls = {
    balls: [],
    number: 14,
    color: "yellow",
    generate: null,
    generateTime: 500,
    collision: null,
    grow: null,
    growth: 25,
    maxGrowth: 200,
    location: "#yellow-balls"
};
var blackBalls = {
    balls: [],
    number: 30,
    color: "black",
    collision: null,
    location: "#black-balls"
};

var stats = {
    score: 0,
    time: 60,
    lives: 3,
    timeInterval: null
};

function initializeEverything() {
    addBalls(redBalls);
    addBalls(yellowBalls);
    addBalls(blackBalls);
    addSquare(square);
    $("#score").text(stats.score);
    $("#lives").text(stats.lives);
    $("#time").text(stats.time);
    startTime();
}

function startInterval(balls) {
    balls.generate = setInterval(function () {
        var i;
        for (i = 0; i < balls.number; i += 1) {
            if (balls.balls[i].visible === false) {
                checkCollisionWithBalls(balls, i);

                balls.balls[i].visible = true;
                $(balls.location + " div:nth-child(" + (i + 1) + ")").toggle();
                break;
            }
        }
        if (i === balls.number) {
            clearInterval(balls.generate);
            balls.generate = null;

            if (balls.color === "yellow") {
                startSizeInterval();
            }
        }
    }, balls.generateTime);
}

function startCollision(balls, time) {
    balls.collision = setInterval(function() {
        for (let i = 0; i < balls.number; i += 1) {
            if (balls.balls[i].checkCollision(square) && balls.balls[i].visible === true) {
                balls.balls[i].visible = false;
                $(balls.location + " div:nth-child(" + (i + 1) + ")").toggle();

                if (balls.color === "red") stats.score += 1;

                if (balls.color === "yellow") {
                    stats.score -= 1;

                    let randomPos;
                    do {
                        randomPos = Math.floor((Math.random() * redBalls.number));
                    } while (redBalls.balls[randomPos].visible === false); //eroare aici daca dau intr'o bila galbena si nu mai sunt rosii vizibile
                    checkCollisionWithBalls(redBalls, randomPos);

                    balls.balls[i].size = Ball.size;
                    $(balls.location + " div:nth-child(" + (i + 1) + ")")
                        .css("width", balls.balls[i].size + "px")
                        .css("height", balls.balls[i].size + "px");
                }

                if (balls.color === "black") {
                    stats.lives -= 1;
                    $("#lives").text(stats.lives);

                    if (stats.lives === 0) {
                        endGame();
                    }
                }

                $("#score").text(stats.score);

                if (balls.color != "black" && !balls.generate){
                    startInterval(balls);
                    
                    if (balls.color === "yellow") {
                        clearInterval(yellowBalls.grow);
                    }
                }
            }
        }
    }, time);
}

function startSizeInterval() {
    let position = 0;

    yellowBalls.grow = setInterval(function() {

        if (yellowBalls.balls[position].size === yellowBalls.maxGrowth) {
            let randomPos;
            do {
                randomPos = Math.floor((Math.random() * blackBalls.number));
            } while (blackBalls.balls[randomPos].visible != false);

            checkCollisionWithBalls(blackBalls, randomPos);
            blackBalls.balls[randomPos].visible = true;
            $(blackBalls.location + " div:nth-child(" + (randomPos + 1) + ")").toggle();
            startCollision(blackBalls, 25);

            position += 1;
            if(position >= yellowBalls.number) position = 0;
        }
        
        while (yellowBalls.balls[position].size < yellowBalls.maxGrowth && !growYellowBall(position)) {
            position += 1;
            if(position >= yellowBalls.number){
                position = 0;
                return;
            }
        }

        position += 1;
        if(position >= yellowBalls.number) position = 0;
        
    }, yellowBalls.generateTime);
}

function startTime() {
    stats.timeInterval = setInterval(function() {
        stats.time -= 1;
        $("#time").text(stats.time);

        if (stats.time === 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(redBalls.generate);
    clearInterval(redBalls.collision);
    clearInterval(yellowBalls.generate);
    clearInterval(yellowBalls.collision);
    clearInterval(yellowBalls.grow);
    clearInterval(blackBalls.collision);
    clearInterval(stats.timeInterval);
    clearInterval(moving);
    
    $(document).unbind("keydown");
    $(document).unbind("keyup");

    $("#red-balls").remove();
    $("#yellow-balls").remove();
    $("#black-balls").remove();
    $("#square").remove();

    $("<div>Gata boss</div>").attr("id", "game-over").appendTo(gameBoard);
}