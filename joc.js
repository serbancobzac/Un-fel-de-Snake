$(document).ready(function () {
    var mySquare = $("#mySquare");
    var gameBoard = $("#game-board")
    var keys = {};
    var keysArray = Object.keys(keys);
    var direction = {
        37: { left: "-=2" }, //left
        38: { top: "-=2" }, //up
        39: { left: "+=2" }, //right
        40: { top: "+=2" }, //down
    };
    var going;
    

    $(document).one("keydown", moveSquare);

    $(document).keydown(function (e) {
        keys[e.which] = true;
        keysArray = Object.keys(keys);
        
        // printKeys();
    });

    $(document).keyup(function (e) {
        delete keys[e.which];
        keysArray = Object.keys(keys);

        if(Object.keys(keys).length === 0) {
            clearInterval(going);
        }

        // printKeys();
    });

    function moveSquare() {
        $(document).one("keydown", moveSquare);

        if (keysArray.length === 2 || keysArray.length === 1) {
            clearInterval(going);
            going = setInterval(keepGoing, 1);
        }

        function keepGoing() {
            if(canMove(keysArray[0])) {
                mySquare.css(direction[keysArray[0]]);
            }
            if (keysArray.length === 2 && canMove(keysArray[1])) {
                mySquare.css(direction[keysArray[1]]);
            }
        }

        function canMove(key) {
            if (key === "37" && mySquare.offset().left - 2 < 10) {
                return false;
            }
            if (key === "38" && mySquare.offset().top - 2 < 10) {
                return false;
            }
            if (key === "39" && mySquare.offset().left + mySquare.width() + 2 > gameBoard.width() + 10) {
                return false;
            }
            if (key === "40" && mySquare.offset().top + mySquare.height() + 2 > gameBoard.height() + 10) {
                return false;
            }
            return true;
        }
    }

    function printKeys() {
        console.log(Object.keys(keys).length);
    }
});