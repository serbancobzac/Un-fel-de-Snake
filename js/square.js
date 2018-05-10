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

function addSquare(id, color, speed, size, location) {
    var newSquare = new Square(
        id,
        color,
        (gameBoard.width() / 2).toFixed(),
        (gameBoard.height() / 2).toFixed(),
        speed,
        size
    );

    addSquareToHtml(newSquare, location);

    return newSquare;
}

function addSquareToHtml(square, location) {
    newSquare = $("<div/>").css({
        "width": square.size + "px",
        "height": square.size + "px",
        "background": square.color,
        "position": "absolute",
        "left": square.posX + "px",
        "top": square.posY + "px",
    }).attr("id", square.id).appendTo(location);
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key === "ArrowLeft" && canMove(key)) {
        square.posX -= square.speed;
        $("#square").css({left: square.posX});
    }
    if (key === "ArrowUp" && canMove(key)) {
        square.posY -= square.speed;
        $("#square").css({top: square.posY});
    }
    if (key === "ArrowRight" && canMove(key)) {
        square.posX += square.speed;
        $("#square").css({left: square.posX});
    }
    if (key === "ArrowDown" && canMove(key)) {
        square.posY += square.speed;
        $("#square").css({top: square.posY});
    }
});

function moveSquare() {
    
}

function canMove(key) {
    if (key === "ArrowLeft" && square.posX - square.speed < 0) {
        return false;
    }
    if (key === "ArrowUp" && square.posY - square.speed < 0) {
        return false;
    }
    if (key === "ArrowRight" && square.posX + square.size + square.speed > gameBoard.width()) {
        return false;
    }
    if (key === "ArrowDown" && square.posY + square.size + square.speed > gameBoard.height()) {
        return false;
    }
    return true;
}

// var keys = {};
// var square = $("#square");
// var speed = 7;
// var keysArray = Object.keys(keys);
// var direction = {
//     37: { left: "-=" + speed }, //left
//     38: { top: "-=" + speed }, //up
//     39: { left: "+=" + speed}, //right
//     40: { top: "+=" + speed}, //down
// };
// var moving;

// $(document).one("keydown", moveSquare);

// $(document).keydown(function (e) {
//     keys[e.which] = true;
//     keysArray = Object.keys(keys);
// });

// $(document).keyup(function (e) {
//     delete keys[e.which];
//     keysArray = Object.keys(keys);

//     if(Object.keys(keys).length === 0) {
//         clearInterval(moving);
//     }
// });

// function moveSquare() {
//     $(document).one("keydown", moveSquare);

//     if (keysArray.length === 2 || keysArray.length === 1) {
//         clearInterval(moving);
//         moving = setInterval(keepMoving, 1);
//     }

//     function keepMoving() {
//         if(canMove(keysArray[0])) {
//             square.css(direction[keysArray[0]]);
//         }
//         if (keysArray.length === 2 && canMove(keysArray[1])) {
//             square.css(direction[keysArray[1]]);
//         }
//     }

//     function canMove(key) {
//         if (key === "37" && square.offset().left - speed < 10) {
//             return false;
//         }
//         if (key === "38" && square.offset().top - speed < 10) {
//             return false;
//         }
//         if (key === "39" && square.offset().left + square.width() + speed > gameBoard.width() + 10) {
//             return false;
//         }
//         if (key === "40" && square.offset().top + square.height() + speed > gameBoard.height() + 10) {
//             return false;
//         }
//         return true;
//     }
// }