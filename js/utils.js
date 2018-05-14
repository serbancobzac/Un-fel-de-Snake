var isColliding = (function () {
    function getPositions(elem) {
        var posX, posY, size;
        posX = elem.posX;
        posY = elem.posY;
        size = elem.size;
        return [ [posX, posX + size], [posY, posY + size] ];
    }

    function comparePositions(pos1, pos2) {
        var r1, r2;
        r1 = pos1[0] < pos2[0] ? pos1 : pos2;
        r2 = pos1[0] < pos2[0] ? pos2 : pos1;
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function (elem1, elem2) {
        var pos1 = getPositions(elem1),
            pos2 = getPositions(elem2);
        return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    };
}());

// function detectCollisions(thisBalls) {
//     $(thisBalls).children()
//     .map(function (i) {
//         if (isColliding(mySquare, this)) {
//             $(thisBalls + " div:nth-child(" + (i + 1) + ")").remove();
            
//             if (thisBalls === "#red-balls") redBalls -= 1;
//             else yellowBalls -= 1;
//         }
//     });
// }