var checker = 0;
var returnBoard;
var previousId;
var startWhereGo;
var activePiece = false;
var activePieceTimer = 0;
var activePieceColor = ColorWhite;
var pieceColor = ColorWhite;


$(document).ready(function () {

    createBoard(8, 8);

    $("td").click(function () {


        onClickFunction(this.id);
        //console.log(board.board)


    });
});


function onClickFunction(id) {
    //console.log(possibleMoveArray)
    if (document.getElementById(id).firstChild != null) {
        var pieceColor = document.getElementById(id).firstChild.alt.split(Underscore)[0];
    }

    //console.log(activePieceColor)
    activePieceTimer = false;

    var horizontal = Number(id.split(Colon)[0]);
    var vertical = Number(id.split(Colon)[1]);
    var counter = 0;



    if (checker == 1 && activePiece == true) {
        pieceName = document.getElementById(startId).firstChild.alt.split(Underscore)[1];
        pieceColor = document.getElementById(startId).firstChild.alt.split(Underscore)[0];

        returnBoard = mainFunction(startId, pieceName, pieceColor);


        if (activePieceColor == ColorBlack) {
            activePieceColor = ColorWhite;
        } else if (activePieceColor == ColorWhite) {
            activePieceColor = ColorBlack;
        }

        for (var index = 2; index < returnBoard.length; index++) {
            if (returnBoard[index].indexOf(NoSpace + concatenate(horizontal, Colon, vertical) + NoSpace) == -1) {
                counter++;
            }
        }
        if (counter == returnBoard.length - 2) {
            boardColorReset();
            clearArray(possibleMoveArray);
            checker = 0;
            counter = 0;
            activePiece = false;
            return 0;

        }


    }

    if (checker == 1 && activePiece == true) {
        pieceName = document.getElementById(startId).firstChild.alt.split(Underscore)[0];
        pieceColor = document.getElementById(startId).firstChild.alt.split(Underscore)[0];

        returnBoard = mainFunction(startId, pieceName, pieceColor);

        for (var index = 2; index < returnBoard.length; index++) {


            if (returnBoard[index].indexOf(NoSpace + concatenate(horizontal, Colon, vertical) + NoSpace) == 0) {

                makeMove(previousId, id);
                checker = 0;

                clearArray(possibleMoveArray);

            }

        }

        if (activePieceColor == ColorBlack) {
            activePieceColor = ColorWhite;
        } else if (activePieceColor == ColorWhite) {
            activePieceColor = ColorBlack;
        }

    } else if (checker == 0 && document.getElementById(id).firstChild != null && activePieceColor == pieceColor) {

        returnBoard = mainFunction(id, document.getElementById(id).firstChild.alt.split(Underscore)[1], document.getElementById(id).firstChild.alt.split(Underscore)[0]);
        startId = id;

        boardColorReset();
        pieceMove(returnBoard);
        previousId = id;
        checker = 1;

        activePiece = true;
        activePieceTimer = true;
        activePieceColor = pieceColor;

        if (activePieceColor == ColorBlack) {
            activePieceColor = ColorWhite;
        } else if (activePieceColor == ColorWhite) {
            activePieceColor = ColorBlack;
        }

    }

    //    if (activePieceTimer  == true) {
    //         timer();
    //     } else {
    //         clearInterval(countDown);
    //     }

}


// var countDown
// function timer() {
//     let timeSecond = 120;
//     const timeH = document.querySelector("h1");

//     displayTime(timeSecond);

//     countDown = setInterval(() => {
//         timeSecond--;
//         displayTime(timeSecond);
//         if (timeSecond == 0 || timeSecond < 1) {
//             endCount();
//             clearInterval(countDown);
//         }
//     }, 1000);

//     function displayTime(second) {
//         const min = Math.floor(second / 60);
//         const sec = Math.floor(second % 60);
//         timeH.innerHTML = `
//     ${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}
//     `;
//     }
// }

function boardDrowing(hor, ver) {


    var checkerForhorizontalId = 0;
    var checkerForverticalId = 8 + 1;
    var charCode = -64;

    var numCode = ver + 1;
    var verticalMax = ver + 2;
    var horizontalMax = hor + 1;
    var cheker = 1;

    for (var verticalId = 1; verticalId < verticalMax; verticalId++) {
        //create tr element
        trChild = document.createElement(Tr);

        for (var horizontalId = 0, color = cheker; horizontalId < horizontalMax; horizontalId++, color++) {

            if (horizontalId == 0) {
                if (verticalId == verticalMax - 1) {
                    tdChild = document.createElement(Th);
                    tdChild.id = T01;
                    trChild.append(tdChild);
                    continue;
                }

                tdChild = document.createElement(Th);
                tdChild.id = T01;
                tdChild.innerText = Math.abs((numCode - verticalId));
                trChild.append(tdChild);
                continue;
            }

            if (verticalId == verticalMax - 1 && horizontalId != 0) {
                tdChild = document.createElement(Th);
                tdChild.id = T01;
                tdChild.innerText = String.fromCharCode(Math.abs((charCode - horizontalId)));
                trChild.append(tdChild)
                continue;
            }

            tdChild = document.createElement(Td);

            if (color % 2 == 1) {
                tdChild.className = ColorWhite;
            } else {
                tdChild.className = ColorBlack;
            }

            tdChild.id = Math.abs((checkerForhorizontalId - horizontalId)) + Colon + Math.abs((checkerForverticalId - verticalId));
            trChild.append(tdChild);
        }
        cheker++;

        $(Table).append(trChild);

    }
}


function removePieceFromBoard() {

    for (var horizontal = 1; horizontal < 9; horizontal++) {
        for (var vertical = 1; vertical < 9; vertical++) {

            if (document.getElementById(NoSpace + concatenate(horizontal, Colon, vertical) + NoSpace).firstChild !== null) {

                document.getElementById(NoSpace + concatenate(horizontal, Colon, vertical) + NoSpace).firstChild.remove()
            }
        }
    }

}


function addPieceOnBoard(board) {


    for (var vertical = 0; vertical < 8; vertical++) {
        for (var horizontal = 0; horizontal < 8; horizontal++) {
            //console.log(board[4][3])
            if (board[vertical][horizontal] != 0) {
                //  console.log(board[vertical][horizontal])

                // var pieceName = board[vertical][horizontal][0];
                // var pieceColor = board[vertical][horizontal][1];
                // var position = board[vertical][horizontal][2];

                var pieceName = board[vertical][horizontal].name;
                var pieceColor = board[vertical][horizontal].color;
                var position = board[vertical][horizontal].horizontalCordinate + ":" + board[vertical][horizontal].verticalCordinate;
                drawPieceOnBoard(position, pieceName, pieceColor)
            }

        }

    }

}


function drawPieceOnBoard(positionStart, pieceNameStart, pieceColorStart) {


    var parentId = positionStart;

    var childName = pieceColorStart + Space + pieceNameStart;
    var childAlt = pieceColorStart + Underscore + pieceNameStart;
    var parentElement = document.getElementById(parentId);
    var childElement = document.createElement(Img);


    childElement.src = Location + childName + Png;
    childElement.alt = childAlt;
    childElement.id = "img";
    //console.log(childElement)
    parentElement.appendChild(childElement);
    // $(Img).css({ 'width': '80px', "height": "80px" });
}


function pieceMove(possibleMoveArray) {


    for (var cheker = 1; cheker < possibleMoveArray.length; cheker++) {
        if (possibleMoveArray[cheker] != 0 && possibleMoveArray[cheker] != undefined) {

            var horizontal = possibleMoveArray[cheker][0].split(Colon)[0];
            var vertical = possibleMoveArray[cheker][0].split(Colon)[1];

            if (cheker == 1) {
                changeColor(horizontal, vertical, Yellow);
                // addPiece(horizontal,vertical,pieceType,pieceColor)
                continue;
            }
            var color = possibleMoveArray[cheker][1]
            //console.log(possibleMoveArray[cheker].split(" color:")[1])
            changeColor(horizontal, vertical, color)
        }
    }

    clearArray(possibleMoveArray);
}


function changeColor(horizontal, vertical, color) {

    if (document.getElementById(concatenate(horizontal, Colon, vertical)) != null) {

        document.getElementById(concatenate(horizontal, Colon, vertical)).style.background = color;
        // if (color == Green) {
        //     document.getElementById(horizontal + Colon + vertical).innerText = String.fromCharCode(64+Number(horizontal)) + Colon + Number(vertical);
        // }
    }
}


function boardColorReset() {

    var blackTable = document.getElementsByClassName(ColorBlack);
    var whiteTable = document.getElementsByClassName(ColorWhite);

    for (var index = 0; index < (8 * 8) / 2; index++) {

        if (blackTable[index] != undefined
            && whiteTable[index] != undefined) {

            if (blackTable[index].style.backgroundColor == "green") {

                blackTable[index].style.backgroundColor = BlackTableColor;

            }

            blackTable[index].style.backgroundColor = BlackTableColor;
            whiteTable[index].style.backgroundColor = WhiteTableColor;
        }
    }
}


function makeMove(startId, toId) {

    var horizontalStart = Number(startId.split(":")[0]);
    var verticalStart = Number(startId.split(":")[1]);
    var horizontalTo = Number(toId.split(":")[0]);
    var verticalTo = Number(toId.split(":")[1]);

    console.log(board.board[verticalStart - 1][horizontalStart - 1])

    board.board[verticalTo - 1][horizontalTo - 1] = board.board[verticalStart - 1][horizontalStart - 1]
    board.board[verticalTo - 1][horizontalTo - 1].horizontalCordinate = horizontalTo;
    board.board[verticalTo - 1][horizontalTo - 1].verticalCordinate = verticalTo;

    //console.log(board.board[verticalTo - 1][horizontalTo - 1])

    board.board[verticalStart - 1][horizontalStart - 1] = 0;
    //console.log(board.board[verticalStart - 1][horizontalStart - 1],verticalStart - 1,horizontalStart - 1)

    animate(startId, toId, document.getElementById(startId).firstChild, AnimationSpeed)

}


function animate(starting, ending, piece, speed) {

    var starting = document.getElementById(starting);
    var ending = document.getElementById(ending);

    var startCoordinateTop = starting.offsetTop;
    var endCoordinateTop = ending.offsetTop;
    var startCoordinateLeft = starting.offsetLeft;
    var endCoordinateLeft = ending.offsetLeft;

    var lengthTop = endCoordinateTop - startCoordinateTop;
    var lengthLeft = endCoordinateLeft - startCoordinateLeft;

    boardColorReset();

    $(piece).css("position", "relative")
        .animate(
            {
                top: lengthTop,
                left: lengthLeft
            }
            , speed,
            function () {
                removePieceFromBoard()
                addPieceOnBoard(board.board);

                $(piece).css("position", "static");

            });


}


$(function () {
    $(Img).css({ 'width': '30px', "height": "30px" });
    $(White).css({ 'width': '30px', "height": "30px" });
    $(Black).css({ 'width': '30px', "height": "30px" });
});


$(function () {
    $("#image1").css({ 'top': '22.5px', "left": "10px" });
    $("#player1").css({ 'top': '10.5px', "left": "50px" });
    $("#image2").css({ 'top': '382.5px', "left": "10px" });
    $("#player2").css({ 'top': '370.5px', "left": "50px" });
});

function blackPlayerView() {
    $(".table").css({ "transform": "rotate(180deg)" });
    $("td").css({ "transform": "rotate(180deg)" });
    $("th").css({ "transform": "rotate(180deg)" });
    $("#image2").css({ 'top': '22.5px', "left": "10px" });
    $("#player2").css({ 'top': '10.5px', "left": "50px" });
    $("#image1").css({ 'top': '382.5px', "left": "10px" });
    $("#player1").css({ 'top': '370.5px', "left": "50px" });
}

function whitePlayerView() {
    $(".table").css({ "transform": "rotate(0deg)" });
    $("td").css({ "transform": "rotate(0deg)" });
    $("th").css({ "transform": "rotate(0deg)" });
    $("#image1").css({ 'top': '22.5px', "left": "10px" });
    $("#player1").css({ 'top': '10.5px', "left": "50px" });
    $("#image2").css({ 'top': '382.5px', "left": "10px" });
    $("#player2").css({ 'top': '370.5px', "left": "50px" });
}