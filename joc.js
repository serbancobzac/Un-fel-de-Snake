$(document).ready(function () {
    var mySquare = $("#mySquare");
    var keys = {};
    var direction = {
        37: { left: "-=2" }, //left
        38: { top: "-=2" }, //up
        39: { left: "+=2" }, //right
        40: { top: "+=2" }, //down
    };
    var going;
    var keysArray = Object.keys(keys);
    

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
            if (keysArray.length === 2)
                mySquare.css(direction[keysArray[0]]).css(direction[keysArray[1]]);
            else {
                mySquare.css(direction[keysArray[0]]);
            }
        }
    }

    function printKeys() {
        console.log(Object.keys(keys).length);
    }
});