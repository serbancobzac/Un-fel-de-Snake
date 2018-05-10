var ball = function(options) {
    //attributes
    var vars = {
        id: undefined,
        color: undefined,
        posX: undefined,
        posY: undefined,
        visible: false,
        size: 100
    };

    var root = this;

    //constructor
    this.construct = function(options) {
        $.extend(vars, options);
    };

    this.construct(options);

    //public methods

    this.getId = function() {
        return vars.id;
    };
    this.getColor = function() {
        return vars.color;
    };
    this.getPosX = function() {
        return vars.posX;
    };
    this.getPosY = function() {
        return vars.posY;
    };
    this.getVisible = function() {
        return vars.visible;
    };
    this.getSize = function() {
        return vars.size;
    };
};

function addBalls(_id, _color, _number, location) {
    var i;
    var newBalls = [];
    var ballSize = new ball().getSize();
    for (i = 0; i < _number; ++i) {
        newBalls.push(
            new ball({
                id: _id + i,
                color: _color,
                posX: (Math.random() * (gameBoard.width() - ballSize)).toFixed(),
                posY: (Math.random() * (gameBoard.height() - ballSize)).toFixed(),
                visible: true
            })
        );
        addBallToHtml(newBalls[i], location);
    }
    return newBalls;
}

function addBallToHtml(ball, location) {
    newBall = $("<div/>").css({
        "width": ball.getSize() + "px",
        "height": ball.getSize() + "px",
        "border-radius": "50%",
        "background": ball.getColor(),
        "position": "absolute",
        "left": ball.getPosX() + "px",
        "top": ball.getPosY() + "px",
    }).attr("id", ball.getId()).appendTo(location);
}