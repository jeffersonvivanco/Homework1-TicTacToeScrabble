/**
 * Created by jeffersonvivanco on 9/25/16.
 */
/**
 * game.js
 * @author Jefferson Vivanco
 */
    //Adding required files
var tic  = require('./tic-tac-toe.js');
var readlineSync = require('readline-sync');



console.log('Shall we play a game of tic-tac-toe?');
var computerMoves = process.argv[2] ? JSON.parse(process.argv[2]) : undefined;

console.log("The computer will make the following moves: "+computerMoves);

var width = readlineSync.question("How wide should the board be? (1-26)\n");

while(isNaN(width)){
    width = readlineSync.question("How wide should the board be? (1-26)\n");
}
while(width<1 || width >26){
    width = readlineSync.question("How wide should the board be? (1-26)\n");
}

var userLetter = readlineSync.question("Pick a letter: X or O\n");
var check  = true;
while(check){
    if(userLetter ==="X")
        check = false;
    else if (userLetter==="O") {
        check = false;
    }
    else {
        userLetter = readlineSync.question("Pick a letter: X or O\n");
    }
}
console.log("\nPlayer is "+userLetter+"\n");
var board = tic.generateBoard(width, width, " ");
console.log(tic.boardToString(board));

var gameOn = true;
var validUserMove = true;
var computerLetter;
var computerMove;

//If the user picked X, then the code below will run.
if(userLetter ==="X"){
    var rowWinner;
    var colWinner;
    var diaWinner;
    computerLetter = "O";
    while(gameOn){

        var userMove = readlineSync.question("What's your move?\n");
        while(validUserMove){
            if(!tic.isValidMoveAlgebraicNotation(board, userMove)){
                userMove = readlineSync.question("Your move must be in a format, and it must specify an existing empty cell! \n"+
                    "What's your move?\n");
            }
            else {
                validUserMove = false;
            }
        }
        board = tic.placeLetter(board, userLetter, userMove);
        console.log(tic.boardToString(board));

        rowWinner = tic.getWinnerRows(board);
        colWinner = tic.getWinnerCols(board);
        diaWinner = tic.getWinnerDiagonals(board);
        if(rowWinner ===userLetter || colWinner===userLetter || diaWinner===userLetter){
            console.log("You Won!!!");
            break;
        }
        if(tic.isBoardFull(board)){
            console.log("It's a draw");
            break;
        }
        readlineSync.question('Press <ENTER> to show computer\'s move\n');
        if(computerMoves!=undefined && computerMoves.length>0){
            var computerMove2 = computerMoves[0];
            if(tic.isValidMove(board, computerMove2[0],computerMove2[1])){
                computerMove2 = tic.rowColToIndex(board, computerMove2[0],computerMove2[1]);
                computerMove = computerMove2;
            }
            computerMoves.splice(0,1);
        }
        else {
            computerMove = tic.getRandomEmptyCellIndex(board);
        }
        board[computerMove] = computerLetter;
        console.log(tic.boardToString(board));

        rowWinner = tic.getWinnerRows(board);
        colWinner = tic.getWinnerCols(board);
        diaWinner = tic.getWinnerDiagonals(board);
        if(rowWinner ===computerLetter || colWinner===computerLetter || diaWinner===computerLetter){
            console.log("Computer Won :(");
            break;
        }
        if(tic.isBoardFull(board)){
            console.log("It's a draw");
            break;
        }

    }
}
//If the user picked O, then the code below will return
if(userLetter ==="O"){
    var rowWinner;
    var colWinner;
    var diaWinner;
    computerLetter = "X";
    while(gameOn){
        readlineSync.question('Press <ENTER> to show computer\'s move\n');
        if(computerMoves!=undefined && computerMoves.length>0){
            var computerMove2 = computerMoves[0];
            if(tic.isValidMove(board, computerMove2[0],computerMove2[1])){
                computerMove2 = tic.rowColToIndex(board, computerMove2[0],computerMove2[1]);
                computerMove = computerMove2;
            }
            computerMoves.splice(0,1);
        }
        else {
            computerMove = tic.getRandomEmptyCellIndex(board);
        }
        board[computerMove] = computerLetter;
        console.log(tic.boardToString(board));

        rowWinner = tic.getWinnerRows(board);
        colWinner = tic.getWinnerCols(board);
        diaWinner = tic.getWinnerDiagonals(board);
        if(rowWinner ===computerLetter || colWinner===computerLetter || diaWinner===computerLetter){
            console.log("Computer Won :(");
            break;
        }
        if(tic.isBoardFull(board)){
            console.log("It's a draw");
            break;
        }
        var userMove = readlineSync.question("What's your move?\n");
        while(validUserMove){
            if(!tic.isValidMoveAlgebraicNotation(board, userMove)){
                userMove = readlineSync.question("Your move must be in a format, and it must specify an existing empty cell! \n"+
                    "What's your move?\n");
            }
            else {
                validUserMove = false;
            }
        }
        board = tic.placeLetter(board, userLetter, userMove);
        console.log(tic.boardToString(board));

        rowWinner = tic.getWinnerRows(board);
        colWinner = tic.getWinnerCols(board);
        diaWinner = tic.getWinnerDiagonals(board);
        if(rowWinner ===userLetter || colWinner===userLetter || diaWinner===userLetter){
            console.log("You Won!!!");
            break;
        }
        if(tic.isBoardFull(board)){
            console.log("It's a draw");
            break;
        }


    }
}
