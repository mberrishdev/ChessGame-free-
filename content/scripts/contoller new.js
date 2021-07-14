
var fromid;
var toid;
var cheker = 0;
var step = 0;
var board;
const ConnectionArray = {
    "King": King,
    "Queen": Queen,
    "Rook": Rook,
    "Bishop": Bishop,
    "Knight": Knight,
    "Pawn": Pawn
};

board = new Board(8, 8);
var piece = new Piece();

function createBoard(boardHorizontalSize, boardverticalSize) {



    boardDrowing(boardHorizontalSize, boardverticalSize);

    for (var index = 0; index < (boardHorizontalSize * boardverticalSize) / 2; index++) {

        var positionStart = StartingPosition.startPosition[index].position;
        var pieceNameStart = StartingPosition.startPosition[index].pieceType;
        var pieceColorStart = StartingPosition.startPosition[index].color;

        var horizontal = Number(positionStart.split(":")[0]);
        var vertical = Number(positionStart.split(":")[1]);

        //var pieceWhereGo = [pieceNameStart, pieceColorStart, positionStart]


        board.board[vertical - 1][horizontal - 1] = new ConnectionArray[pieceNameStart](pieceNameStart, pieceColorStart, horizontal, vertical);
        //console.log(board.board[vertical - 1][horizontal - 1].name)
    }
    // console.log(board.board)

    addPieceOnBoard(board.board);


}


function mainFunction(startId, name, color) {

    var horizontal = Number(startId.split(":")[0]);
    var vertical = Number(startId.split(":")[1]);

    var returnBoard = createPieceClass(name, horizontal, vertical, color);

    return returnBoard;

}


function createPieceClass(pieceName, horizontalPos, verticalPos, pieceColor) {

    if (pieceName != NoSpace && pieceColor != NoSpace && horizontalPos > 0 && verticalPos > 0) {

        // let exactPiece = new ConnectionArray[pieceName](pieceName, pieceColor, horizontalPos, verticalPos);

        // var returnBoard = exactPiece.special();
        var returnBoard = board.board[verticalPos - 1][horizontalPos - 1].special();
        //kingDAngerous();
        //console.log(returnBoard);
    }

    return returnBoard;

}


function clearArray(array) {
    while (array.length > 0) {
        array.pop();
    }
}


function concatenate(first, second, third) {
    return first + second + third;
}