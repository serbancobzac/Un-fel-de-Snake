class Ball {
    constructor(color, posX, posY, size, visible) {
        this.color = color;
        this.posX = posX;
        this.posY = posY;
        this.size = size;
        this.visible = visible;
    }

    static get size() {
        return 100;
    }

    checkCollision(that) {
        if (isColliding(this, that)) return true;
        return false;
    }
}

// Add balls

    function addBalls(balls) {
        let newBall, pos = [];

        for (let i = 0; i < balls.number; i += 1) {
            pos = randomBallCoordinates();

            newBall = new Ball(balls.color, pos[0], pos[1], Ball.size, false);
            balls.balls.push(newBall);
            addBallToHtml(newBall, balls.location);
        }
    }

    function randomBallCoordinates() {
        let posX = Math.floor(Math.random() * (gameBoard.width() - Ball.size));
        let posY = Math.floor(Math.random() * (gameBoard.height() - Ball.size));

        return [posX, posY];
    }

    function addBallToHtml(ball, location) {
        newBall = $("<div/>").css({
            "width": ball.size + "px",
            "height": ball.size + "px",
            "border-radius": "50%",
            "background": ball.color,
            "position": "absolute",
            "left": ball.posX + "px",
            "top": ball.posY + "px",
            "display": "none"
        }).appendTo($(location));
    }

// Collision check

    function checkCollisionWithBalls(balls, position) {
        let pos = [], good = false;

        while (good === false) {
            pos = randomBallCoordinates();
            balls.balls[position].posX = pos[0];
            balls.balls[position].posY = pos[1];

            if (!collisionFound(balls.balls[position], position, redBalls) &&
                !collisionFound(balls.balls[position], position, yellowBalls) &&
                !collisionFound(balls.balls[position], position, blackBalls)) {
                good = true;
            }
        }

        $(balls.location + " div:nth-child(" + (position + 1) + ")")
            .css("left", balls.balls[position].posX + "px")
            .css("top", balls.balls[position].posY + "px");
    }

    function growYellowBall(position) {
        yellowBalls.balls[position].size += yellowBalls.growth;

        if (collisionFound(yellowBalls.balls[position], position, redBalls) ||
            collisionFound(yellowBalls.balls[position], position, yellowBalls) || 
            collisionFound(yellowBalls.balls[position], position, blackBalls) || 
            (gameBoard.width() - yellowBalls.balls[position].size) < yellowBalls.balls[position].posX || 
            (gameBoard.height() - yellowBalls.balls[position].size) < yellowBalls.balls[position].posY) {
                yellowBalls.balls[position].size -= yellowBalls.growth;
                return false;
        }

        $(yellowBalls.location + " div:nth-child(" + (position + 1) + ")")
            .css("width", yellowBalls.balls[position].size + "px")
            .css("height", yellowBalls.balls[position].size + "px");
        return true;
    }

    function collisionFound(ball, position, balls) {
        for (let i = 0; i < balls.number; i += 1) {
            if (ball != balls.balls[i] && balls.balls[i].visible === true) {
                if (ball.checkCollision(balls.balls[i])) {
                    return true;
                }
            }
        }
        return false;
    }