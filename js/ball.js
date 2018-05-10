class Ball {
    constructor(id, color, posX, posY, visible) {
        this.id = id;
        this.color = color;
        this.posX = posX;
        this.posY = posY;
        this.visible = visible;
    }

    static get size() {
        return 100;
    }
}

function addBalls(id, color, number, location) {
    var i;
    var newBalls = [], newBall;
    var posX, posY;
    for (i = 0; i < number; ++i) {
        posX = (Math.random() * (gameBoard.width() - Ball.size)).toFixed();
        posY = (Math.random() * (gameBoard.height() - Ball.size)).toFixed();

        newBall = new Ball(id + i, color, posX, posY, true);
        newBalls.push(newBall);
        addBallToHtml(newBall, location);
    }
    return newBalls;
}

function addBallToHtml(ball, location) {
    newBall = $("<div/>").css({
        "width": Ball.size + "px",
        "height": Ball.size + "px",
        "border-radius": "50%",
        "background": ball.color,
        "position": "absolute",
        "left": ball.posX + "px",
        "top": ball.posY + "px",
    }).attr("id", ball.id).appendTo(location);
}