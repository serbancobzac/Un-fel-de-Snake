$(document).ready(function () {
    var mySquare = $("#my-square");
    var gameBoard = $("#game-board");
    var keys = {};
    var speed = 7;
    var keysArray = Object.keys(keys);
    var direction = {
        37: { left: "-=" + speed }, //left
        38: { top: "-=" + speed }, //up
        39: { left: "+=" + speed}, //right
        40: { top: "+=" + speed}, //down
    };
    var moving;

    var ballSize = 150;
    var nrOfBalls = 0;
    var redBalls = 0;
    var redBallsInterval = setInterval(function () {
        generateBall("#red-balls", "red", 4);
    }, 1000);
    var yellowBalls = 0;
    var yellowBallsInterval = setInterval(function () {
        generateBall("#yellow-balls", "yellow", 2);
    }, 2000);
    // var blackBallsInterval;
    

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

    function generateBall(here, _color, max) {
        nrOfBalls = _color === "red" ? redBalls : yellowBalls;
        if (nrOfBalls < max) {

            newBall = $("<div/>").css({
                "width": ballSize + "px",
                "height": ballSize + "px",
                "border-radius": "50%",
                "background": _color
            });

            var posX = (Math.random() * (gameBoard.width() - ballSize)).toFixed();
            var posY = (Math.random() * (gameBoard.height() - ballSize)).toFixed();

            newBall.css({
                "position": "absolute",
                "left": posX + "px",
                "top": posY + "px",
                "display": "none"
            }).appendTo($(here)).fadeIn(100);

            if (_color === "red") redBalls += 1;
            else yellowBalls += 1;
        }
        else if (_color === "yellow") {
            $("#yellow-balls div:nth-child(" + (Math.random() * (yellowBalls - 1)).toFixed() + ")").css({
                "width": "+=30",
                "height": "+=30",
            });
        }
    }

    var isColliding = (function () {
        function getPositions(elem) {
            var pos, width, height;
            pos = $(elem).position();
            width = $(elem).width();
            height = $(elem).height();
            return [ [pos.left, pos.left + width], [pos.top, pos.top + height] ];
        }
    
        function comparePositions(pos1, pos2) {
            var r1, r2;
            r1 = pos1[0] < pos2[0] ? pos1 : pos2;
            r2 = pos1[0] < pos2[0] ? pos2 : pos1;
            return r1[1] > r2[0] || r1[0] === r2[0];
        }
    
        return function ( elem1, elem2 ) {
            var pos1 = getPositions( elem1 ),
                pos2 = getPositions( elem2 );
            return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
        };
    }());

    function detectCollisions(thisBalls) {
        $(thisBalls).children()
        .map(function (i) {
            if (isColliding(mySquare, this)) {
                $(thisBalls + " div:nth-child(" + (i + 1) + ")").remove();
                
                if (thisBalls === "#red-balls") redBalls -= 1;
                else yellowBalls -= 1;
            }
        });
    }

    var redBallsCollision = setInterval(function () {
        detectCollisions("#red-balls");
    }, 25);

    var yellowBallsCollision = setInterval(function () {
        detectCollisions("#yellow-balls");
    }, 25);
});