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
    let posX = Math.ceil(Math.random() * (gameBoard.width() - Ball.size));
    let posY = Math.ceil(Math.random() * (gameBoard.height() - Ball.size));

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