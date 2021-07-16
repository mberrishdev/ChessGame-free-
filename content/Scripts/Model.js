var boardArray = [];
var possibleMoveArray = [];
var moveArray = [];
var whereGoArray = [];
var dangerousBoard = [];
var whereAllPieceCanGo = []
var maxLoop;
var maxstep;
var horizontalstep;
var verticalstep;
var array = [];


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

                    possibleMoveArray.push([horizontal + Colon + vertical, Green]);

                } else if (this.isEnemyPiece(horizontal, vertical, pieceColor)) {

                    possibleMoveArray.push([horizontal + Colon + vertical, Red]);
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

                    possibleMoveArray.push([horizontal + Colon + vertical, Green]);

                    if (horizontal - 1 > 0 && step == 1) {
                        if (this.isEnemyPiece(horizontal - 1, vertical, pieceColor)) {
                            possibleMoveArray.push([(horizontal - 1) + Colon + vertical, Red]);
                        }
                    }
                    if (horizontal + 1 < 9 && step == 1) {
                        if (this.isEnemyPiece(horizontal + 1, vertical, pieceColor)) {
                            possibleMoveArray.push([(horizontal + 1) + Colon + vertical, Red]);
                        }
                    }
                } else if (true) {
                    if (horizontal - 1 > 0 && step == 1) {
                        if (this.isEnemyPiece(horizontal - 1, vertical, pieceColor)) {
                            possibleMoveArray.push([(horizontal - 1) + Colon + vertical, Red]);
                        }
                    }
                    if (horizontal + 1 < 9 && step == 1) {
                        if (this.isEnemyPiece(horizontal + 1, vertical, pieceColor)) {
                            possibleMoveArray.push([(horizontal + 1) + Colon + vertical, Red]);
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
        //console.log(possibleMoveArray)
        possibleMoveArray[0] = concatenate(this.name, Colon, this.color);
        possibleMoveArray[1] = concatenate(this.horizontalCordinate, Colon, this.verticalCordinate);


        whereGoArray = [[0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1]]
        maxLoop = 1;


        if (possibleMoveArray[1] == "5:1" && this.board[0][7].name == "Rook") {
            this.kingAndRook(this.horizontalCordinate, this.verticalCordinate, false, 1);

        }

        if (possibleMoveArray[1] == "5:1" && this.board[0][0].name == "Rook") {
            this.kingAndRook(this.horizontalCordinate, this.verticalCordinate, true, -1);
        }

        if (possibleMoveArray[1] == "5:8" && this.board[7][7].name == "Rook") {
            this.kingAndRook(this.horizontalCordinate, this.verticalCordinate, false, 1);
        }

        if (possibleMoveArray[1] == "5:8" && this.board[0][0].name == "Rook") {
            this.kingAndRook(this.horizontalCordinate, this.verticalCordinate, true, -1);
        }

        for (var counter = 0; counter < whereGoArray.length; counter++) {
            this.wherePieceCanGo(this.horizontalCordinate, this.verticalCordinate, whereGoArray[counter][0], whereGoArray[counter][1], maxLoop, this.color);
        }

        return possibleMoveArray
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


                    possibleMoveArray.push([horizontal + Colon + vertical, Green]);

                } else if (this.isEnemyPiece(horizontal, vertical, pieceColor)) {
                    possibleMoveArray.push([horizontal + Colon + vertical, Red]);


                } else {
                    //return possibleMoveArray;
                }

            }
        }
        step = 0;

        return possibleMoveArray;
    }
}


