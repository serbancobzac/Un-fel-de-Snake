class Square {
    constructor(id, color, posX, posY, speed, size) {
        this.id = id;
        this.color = color;
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.size = size;
    }
}

// Add square

    function addSquare(square) {
        square.posX = Math.ceil(gameBoard.width() / 2 - square.size / 2);
        square.posY = Math.ceil(gameBoard.height() / 2 - square.size / 2)

        addSquareToHtml(square);
    }

    function addSquareToHtml(square) {
        newSquare = $("<div/>").css({
            "width": square.size + "px",
            "height": square.size + "px",
            "background": square.color,
            "position": "absolute",
            "left": square.posX + "px",
            "top": square.posY + "px",
        }).attr("id", square.id).appendTo(square.location);
    }

// For moving the square

    var keys = {};
    var moving;

    $(document).keydown(function (e) {
        keys[e.key] = true;
    });

    $(document).one("keydown", moveSquare);

    $(document).keyup(function (e) {
        delete keys[e.key];

        if(jQuery.isEmptyObject(keys)) {
            clearInterval(moving);
        }
    });

    function moveSquare() {
        $(document).one("keydown", moveSquare);

        if (!jQuery.isEmptyObject(keys)) {
            clearInterval(moving);
            moving = setInterval(keepMoving, 1);
        }

        function keepMoving() {
            for (var key in keys) {
                move(key);
            }
        }
    }

    function move(key) {
        if (key === "ArrowLeft" && square.posX - square.speed >= 0) {
            square.posX -= square.speed;
            $("#square").css({left: square.posX});
        }
        if (key === "ArrowUp" && square.posY - square.speed >= 0) {
            square.posY -= square.speed;
            $("#square").css({top: square.posY});
        }
        if (key === "ArrowRight" && square.posX + square.size + square.speed <= gameBoard.width()) {
            square.posX += square.speed;
            $("#square").css({left: square.posX});
        }
        if (key === "ArrowDown" && square.posY + square.size + square.speed <= gameBoard.height()) {
            square.posY += square.speed;
            $("#square").css({top: square.posY});
        }
    }