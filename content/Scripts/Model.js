var boardArray = [];
var possibleMoveArray = [];
var moveArray = [];
var whereGoArray = [];
var dangerousBoard = [];
var whereAllPieceCanGo = [];
var whereKingCanGoArray = [];
var maxLoop;
var maxstep;
var horizontalstep;
var verticalstep;
var array = [];


var whereGoArrayKing = [];

class Board {

    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.board = this.imagineBoard();
    }

    imagineBoard() {

        for (var index = 0; index < this.height; index++) {

            var supporterArray = [];
            for (var verticalIndex = 0; verticalIndex < this.width; verticalIndex++) {
                supporterArray.push(0);
            }
            boardArray.push(supporterArray);
        }
        return boardArray;

    }
}


class Piece extends Board {

    constructor(name, color, height, width) {
        super(height, width)
        this.name = name;
        this.color = color;
    }

    wherePieceCanGo(horizontal, vertical, horizontalstep, verticalstep, maxstep, pieceColor) {

        while (vertical <= 8 && horizontal <= 8
            && vertical > 0 && horizontal > 0) {

            step++;
            horizontal += horizontalstep
            vertical += verticalstep

            if (vertical <= 8 && horizontal <= 8
                && vertical > 0 && horizontal > 0
                && horizontalstep != horizontal && verticalstep != vertical && step <= maxstep) {

                if (this.isEmpty(horizontal, vertical)) {

                    possibleMoveArray.push([horizontal + Colon + vertical, Green, 0]);

                } else if (this.isEnemyPiece(horizontal, vertical, pieceColor)) {

                    possibleMoveArray.push([horizontal + Colon + vertical, Red, 0]);
                    return possibleMoveArray;

                } else if (this.isNotEnemyPiece(horizontal, vertical, pieceColor)) {
                    break;

                }
            }
        }

        step = 0;


        return possibleMoveArray;
    }


    isEmpty(horizontal, vertical) {

        if (this.board[vertical - 1][horizontal - 1] == 0) {
            return true;
        }

    }

    isEnemyPiece(horizontal, vertical, pieceColor) {

        if (this.board[vertical - 1][horizontal - 1] != 0 && this.board[vertical - 1][horizontal - 1].color != pieceColor) {
            return true;
        }

    }

    isNotEnemyPiece(horizontal, vertical, pieceColor) {

        if (this.board[vertical - 1][horizontal - 1] != 0 && this.board[vertical - 1][horizontal - 1].color == pieceColor) {
            return true;
        }

    }
}


class Pawn extends Piece {

    constructor(name, color, horizontalCordinate, verticalCordinate) {

        super(name, color);
        this.horizontalCordinate = horizontalCordinate;
        this.verticalCordinate = verticalCordinate;
    }

    special() {

        possibleMoveArray[0] = concatenate(this.name, Colon, this.color);
        possibleMoveArray[1] = concatenate(this.horizontalCordinate, Colon, this.verticalCordinate);

        if (this.color == ColorWhite) {

            if (this.verticalCordinate == 2) {
                whereGoArray = [[0, 1]];
                maxLoop = 2;
            }
            else if (this.verticalCordinate != 2) {
                whereGoArray = [[0, 1]];
                maxLoop = 1;
            }
        } else {
            if (this.verticalCordinate == board.height - 1) {
                whereGoArray = [[0, -1]];
                maxLoop = 2;
            }
            else if (this.verticalCordinate != board.height - 1) {
                whereGoArray = [[0, -1]];
                maxLoop = 1;
            }
        }

        for (var counter = 0; counter < whereGoArray.length; counter++) {
            this.wherePawnCanGo(this.horizontalCordinate, this.verticalCordinate, whereGoArray[counter][0], whereGoArray[counter][1], maxLoop, this.color);
        }

        return possibleMoveArray
    }

    wherePawnCanGo(horizontal, vertical, horizontalstep, verticalstep, maxstep, pieceColor) {

        while (vertical <= 8 && horizontal <= 8
            && vertical > 0 && horizontal > 0) {

            step++;
            horizontal += horizontalstep
            vertical += verticalstep


            if (vertical <= 8 && horizontal <= 8
                && vertical > 0 && horizontal > 0
                && horizontalstep != horizontal && verticalstep != vertical && step <= maxstep) {

                if (this.isEmpty(horizontal, vertical)) {

                    possibleMoveArray.push([horizontal + Colon + vertical, Green, NotDanger]);

                    if (horizontal - 1 > 0 && step == 1) {
                        if (this.isEnemyPiece(horizontal - 1, vertical, pieceColor)) {
                            possibleMoveArray.push([(horizontal - 1) + Colon + vertical, Red, Danger]);
                        }
                    }
                    if (horizontal + 1 < 9 && step == 1) {
                        if (this.isEnemyPiece(horizontal + 1, vertical, pieceColor)) {
                            possibleMoveArray.push([(horizontal + 1) + Colon + vertical, Red, Danger]);
                        }
                    }
                } else if (true) {
                    if (horizontal - 1 > 0 && step == 1) {
                        if (this.isEnemyPiece(horizontal - 1, vertical, pieceColor)) {
                            possibleMoveArray.push([(horizontal - 1) + Colon + vertical, Red, Danger]);
                        }
                    }
                    if (horizontal + 1 < 9 && step == 1) {
                        if (this.isEnemyPiece(horizontal + 1, vertical, pieceColor)) {
                            possibleMoveArray.push([(horizontal + 1) + Colon + vertical, Red, Danger]);
                        }
                    }
                }
            }
        }

        step = 0;

        return possibleMoveArray;
    }
}


class King extends Piece {

    constructor(name, color, horizontalCordinate, verticalCordinate) {

        super(name, color);
        super.wherePieceCanGo();
        this.horizontalCordinate = horizontalCordinate;
        this.verticalCordinate = verticalCordinate;

    }

    special() {
        possibleMoveArray[0] = concatenate(this.name, Colon, this.color);
        possibleMoveArray[1] = concatenate(this.horizontalCordinate, Colon, this.verticalCordinate);


        whereGoArrayKing = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
        maxLoop = 1;

        console.log(whereGoArrayKing.length)

        // if (possibleMoveArray[1] == "5:1" && this.board[0][7].name == "Rook") {
        //     this.kingAndRook(this.horizontalCordinate, this.verticalCordinate, false, 1);

        // }

        // if (possibleMoveArray[1] == "5:1" && this.board[0][0].name == "Rook") {
        //     this.kingAndRook(this.horizontalCordinate, this.verticalCordinate, true, -1);
        // }

        // if (possibleMoveArray[1] == "5:8" && this.board[7][7].name == "Rook") {
        //     this.kingAndRook(this.horizontalCordinate, this.verticalCordinate, false, 1);
        // }

        // if (possibleMoveArray[1] == "5:8" && this.board[0][0].name == "Rook") {
        //     this.kingAndRook(this.horizontalCordinate, this.verticalCordinate, true, -1);
        // }

        this.kingDangerous();
        return whereKingCanGoArray;
    }
    kingAndRook(horizontal, vertical, checker, direction) {
        if (this.isEmpty(horizontal + direction * 1, vertical) && this.isEmpty(horizontal + direction * 2, vertical)) {
            if (checker == true && this.isEmpty(horizontal + direction * 2, vertical)) {
                whereKingCanGoArray[2][0] = horizontal + ":" + vertical;
                whereKingCanGoArray[2][1] = "Green";
            }
            else {
                whereKingCanGoArray[2][0] = horizontal + ":" + vertical;
                whereKingCanGoArray[2][1] = "Green";
            }
        }

        return whereKingCanGoArray;
    }
    whereKingCanGo(horizontal, vertical, whereGoArrayKing, maxstep, pieceColor) {
        // whereKingCanGoArray[0] = concatenate(this.name, Colon, this.color);
        // whereKingCanGoArray[1] = concatenate(this.horizontalCordinate, Colon, this.verticalCordinate);

        var horizontalCor = horizontal;
        var verticalCor = vertical;
        for (var index = 0; index < 8; index++) {
            //console.log(whereGoArrayKing[index]);
            horizontal += whereGoArrayKing[index][0];
            vertical += whereGoArrayKing[index][1];
            if (vertical <= 8 && horizontal <= 8
                && vertical > 0 && horizontal > 0
                && horizontalstep != horizontal && verticalstep != vertical) {

                if (this.isEmpty(horizontal, vertical)) {

                    whereKingCanGoArray.push([horizontal + Colon + vertical, Green]);

                } else if (this.isEnemyPiece(horizontal, vertical, pieceColor)) {

                    whereKingCanGoArray.push([horizontal + Colon + vertical, Red,]);
                }
            }
            horizontal = horizontalCor;
            vertical = verticalCor;
        }
        console.log(whereKingCanGoArray)
        return whereKingCanGoArray;

    }
    kingDangerous() {
        for (var columnIndex = 0; columnIndex < 8; columnIndex++) {

            for (var rowIndex = 0; rowIndex < 8; rowIndex++) {


                if (board.board[columnIndex][rowIndex].name != "King") {

                    if (board.board[columnIndex][rowIndex] != 0 && board.board[columnIndex][rowIndex].color != this.color) {
                        board.board[columnIndex][rowIndex].special()
                    }
                }
            }
        }

        this.whereKingCanGo(this.horizontalCordinate, this.verticalCordinate, whereGoArrayKing, maxLoop, this.color);

        for (var index = 0; index < whereKingCanGoArray.length; index++) {
            for (var Jindex in possibleMoveArray) {
                //console.log(possibleMoveArray[index][0])

                if (whereKingCanGoArray[index][0] == possibleMoveArray[Jindex][0]) {
                    //console.log(whereKingCanGoArray[index][0], possibleMoveArray[Jindex][2])
                    if (possibleMoveArray[Jindex][2] == Danger) {
                        whereKingCanGoArray[index] = 0;
                        break;
                    }
                }

            }

        }
    }
}


class Queen extends Piece {

    constructor(name, color, horizontalCordinate, verticalCordinate) {

        super(name, color);
        super.wherePieceCanGo();
        this.horizontalCordinate = horizontalCordinate;
        this.verticalCordinate = verticalCordinate;
    }

    special() {

        possibleMoveArray[0] = concatenate(this.name, Colon, this.color);
        possibleMoveArray[1] = concatenate(this.horizontalCordinate, Colon, this.verticalCordinate);


        whereGoArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
        maxLoop = Infinity;

        for (var counter = 0; counter < whereGoArray.length; counter++) {
            this.wherePieceCanGo(this.horizontalCordinate, this.verticalCordinate, whereGoArray[counter][0], whereGoArray[counter][1], maxLoop, this.color);
        }

        return possibleMoveArray
    }
}


class Rook extends Piece {

    constructor(name, color, horizontalCordinate, verticalCordinate) {

        super(name, color);
        super.wherePieceCanGo();
        this.horizontalCordinate = horizontalCordinate;
        this.verticalCordinate = verticalCordinate;
    }
    special() {
        possibleMoveArray[0] = concatenate(this.name, Colon, this.color);
        possibleMoveArray[1] = concatenate(this.horizontalCordinate, Colon, this.verticalCordinate);


        whereGoArray = [[0, 1], [1, 0], [0, -1], [-1, 0]]
        maxLoop = Infinity;

        for (var counter = 0; counter < whereGoArray.length; counter++) {
            this.wherePieceCanGo(this.horizontalCordinate, this.verticalCordinate, whereGoArray[counter][0], whereGoArray[counter][1], maxLoop, this.color);
        }

        return possibleMoveArray
    }

}


class Bishop extends Piece {

    constructor(name, color, horizontalCordinate, verticalCordinate) {

        super(name, color);
        super.wherePieceCanGo();
        this.horizontalCordinate = horizontalCordinate;
        this.verticalCordinate = verticalCordinate;
    }

    special() {
        possibleMoveArray[0] = concatenate(this.name, Colon, this.color);
        possibleMoveArray[1] = concatenate(this.horizontalCordinate, Colon, this.verticalCordinate);


        whereGoArray = [[1, 1], [1, -1], [-1, -1], [-1, 1]]
        maxLoop = Infinity;

        for (var counter = 0; counter < whereGoArray.length; counter++) {
            this.wherePieceCanGo(this.horizontalCordinate, this.verticalCordinate, whereGoArray[counter][0], whereGoArray[counter][1], maxLoop, this.color);
        }

        return possibleMoveArray
    }
}


class Knight extends Piece {


    constructor(name, color, horizontalCordinate, verticalCordinate) {

        super(name, color);
        this.horizontalCordinate = horizontalCordinate;
        this.verticalCordinate = verticalCordinate;
    }

    special() {
        possibleMoveArray[0] = concatenate(this.name, Colon, this.color);
        possibleMoveArray[1] = concatenate(this.horizontalCordinate, Colon, this.verticalCordinate);


        whereGoArray = [[1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]];
        maxLoop = 1;

        for (var counter = 0; counter < whereGoArray.length; counter++) {
            this.whereKnightCanGo(this.horizontalCordinate, this.verticalCordinate, whereGoArray[counter][0], whereGoArray[counter][1], maxLoop, this.color);
        }

        return possibleMoveArray
    }
    whereKnightCanGo(horizontal, vertical, horizontalstep, verticalstep, maxstep, pieceColor) {

        while (vertical <= 8 && horizontal <= 8
            && vertical > 0 && horizontal > 0) {

            step++;
            horizontal += horizontalstep
            vertical += verticalstep


            if (vertical <= 8 && horizontal <= 8
                && vertical > 0 && horizontal > 0
                && horizontalstep != horizontal && verticalstep != vertical && step <= maxstep) {

                if (this.isEmpty(horizontal, vertical)) {


                    possibleMoveArray.push([horizontal + Colon + vertical, Green, 0]);

                } else if (this.isEnemyPiece(horizontal, vertical, pieceColor)) {
                    possibleMoveArray.push([horizontal + Colon + vertical, Red, 0]);


                } else {
                    //return possibleMoveArray;
                }

            }
        }
        step = 0;

        return possibleMoveArray;
    }
}


