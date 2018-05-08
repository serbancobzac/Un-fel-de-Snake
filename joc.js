$(document).ready(function () {
    var mySquare = $("#my-square");
    var gameBoard = $("#game-board")
    var keys = {};
    var speed = 10;
    var keysArray = Object.keys(keys);
    var direction = {
        37: { left: "-=" + speed }, //left
        38: { top: "-=" + speed }, //up
        39: { left: "+=" + speed}, //right
        40: { top: "+=" + speed}, //down
    };
    var moving;

    var redBalls = [];
    var redBallsInterval = setInterval(generateRedBall, 300);
    var yellowBallsInterval;
    var blackBallsInterval;
    

    $(document).one("keydown", moveSquare);

    $(document).keydown(function (e) {
        keys[e.which] = true;
        keysArray = Object.keys(keys);
    });

    $(document).keyup(function (e) {
        delete keys[e.which];
        keysArray = Object.keys(keys);

        if(Object.keys(keys).length === 0) {
            clearInterval(moving);
        }
    });

    function moveSquare() {
        $(document).one("keydown", moveSquare);

        if (keysArray.length === 2 || keysArray.length === 1) {
            clearInterval(moving);
            moving = setInterval(keepMoving, 1);
        }

        function keepMoving() {
            if(canMove(keysArray[0])) {
                mySquare.css(direction[keysArray[0]]);
            }
            if (keysArray.length === 2 && canMove(keysArray[1])) {
                mySquare.css(direction[keysArray[1]]);
            }
        }

        function canMove(key) {
            if (key === "37" && mySquare.offset().left - speed < 10) {
                return false;
            }
            if (key === "38" && mySquare.offset().top - speed < 10) {
                return false;
            }
            if (key === "39" && mySquare.offset().left + mySquare.width() + speed > gameBoard.width() + 10) {
                return false;
            }
            if (key === "40" && mySquare.offset().top + mySquare.height() + speed > gameBoard.height() + 10) {
                return false;
            }
            return true;
        }
    }

    function generateRedBall() {
        var ballSize = "100";
        var color = "red";
        $newBall = $("<div/>").css({
            "width": ballSize + "px",
            "height": ballSize + "px",
            "border-radius": "50%",
            "background": color
        });

        var posX = (Math.random() * ($(gameBoard).width() - ballSize)).toFixed();
        var posY = (Math.random() * ($(gameBoard).height() - ballSize)).toFixed();

        $newBall.css({
            "position": "absolute",
            "left": posX + "px",
            "top": posY + "px",
            "display": "none"
        }).appendTo(gameBoard).fadeIn(100);

        if (redBalls.length >= 11) clearInterval(redBallsInterval);
        else redBalls.push($newBall);
    }
});