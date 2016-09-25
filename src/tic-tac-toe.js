/**
 * tic-tac-toe.js
 * @author Jefferson Vivanco
 */

var tic = {
    repeat: function(value, n){
        //implementation
        var array = [];
        for(var i=0; i<n; i++){
            array.push(value);
        }
        return array;
    },
    generateBoard: function(rows, columns, initialCellValue) {
        //implementation
        return this.repeat(initialCellValue, rows*columns);
    },
    rowColToIndex: function(board, rowNumber, columnNumber){
        var length  = board.length;
        var num = Math.sqrt(length);
        return (rowNumber*num) + (columnNumber);
    },
    indexToRowCol: function(board, i){
        var num = Math.sqrt(board.length);
        var row = Math.floor(i/3);
        var col = i - (row*3);
        return {
            "row" : row,
            "col" : col
        };
    },
    setBoardCell: function(board, letter, row, col){
        var index = this.rowColToIndex(board, row, col);
        var board2 = board.slice(0, board.length);
        board2[index] = letter;
        return board2;
    },
    algebraicToRowCol: function(algebraicNotation){
        var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        var length = algebraicNotation.length;
        if(length < 2)
            return undefined;
        for(var i=0; i<algebraicNotation.length; i++){
            if(isNaN(algebraicNotation.charAt(i)) && !algebraicNotation.charAt(i).match(/[a-z]/i) )
                return undefined;
            if(algebraicNotation.charAt(i)===" ")
                return undefined;
        }

        var row = algebraicNotation.charAt(0);
        var col = algebraicNotation.slice(1, length);

        if(!row.match(/[a-z]/i))
            return undefined;
        if(isNaN(col) || col>26)
            return undefined;
        var rowNumber = alphabet.indexOf(row.toUpperCase());
        return {
            "row" : rowNumber,
            "col" : col-1
        };
    },
    placeLetter : function(board, letter, algebraicNotation){
        var info = this.algebraicToRowCol(algebraicNotation);
        var array = this.setBoardCell(board, letter, info["row"],info["col"]);
        return array;
    },
    boardToString : function(board){
        var stringRep = "     ";
        var alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
        var length = Math.sqrt(board.length);
        var stringCols="";
        for(var x=1; x<=length; x++){
            if(x!=3)
                stringCols = stringCols+x+"   ";
            else{
                stringCols = stringCols+x+"  ";
            }
        }
        //Adding to stringRep
        stringRep = stringRep+stringCols+"\n";

        var stringDashLine = "---+";
        var stringRowLine = "   +";
        for(var x=0; x<length; x++){
            stringRowLine = stringRowLine+stringDashLine;
        }
        //Adding to stringRep
        stringRep = stringRep+stringRowLine+"\n";

        var arrayKeep = 0;
        for(var x=0; x<length; x++){
            var stringRow = " ";

            if((x*x)<=board.length){
                var array = board.slice(arrayKeep, arrayKeep+length);
                stringRow = " "+alphabet[x]+" |";
                for(var i=0; i<array.length; i++){
                    stringRow = stringRow+" "+array[i]+" |";
                }
                //Adding to stringRep
                stringRep = stringRep + stringRow+"\n"+stringRowLine+"\n";
                arrayKeep = arrayKeep+length;
            }
        }
        return stringRep;
    },
    getWinnerRows : function(board){
        var numTimes = Math.sqrt(board.length);
        var keepTrack = 1;
        for(var x=0; x<board.length-1; x++){
            if(board[x] == "X" || board[x] == "O"){
                if(board[x] === board[x+1]){
                    keepTrack++;
                    if(keepTrack == numTimes)
                        return board[x];
                }
                else{
                    var toSkip = numTimes - keepTrack;
                    x = x + toSkip;
                    keepTrack = 1;
                }
            }
        }
        return undefined;
    },
    getWinnerCols : function(board){
        var numTimes = Math.sqrt(board.length);

        for(var x=0; x<numTimes; x++){
            if(board[x] == "X" || board[x]=="O"){
                var keepTrack = 1;
                for(var i=x; i<board.length-3; i = i+3){
                    if(board[i]===board[i+numTimes]){
                        keepTrack++;
                        if(keepTrack == numTimes)
                            return board[i];
                    }
                    else{
                        break;
                    }
                }
            }
        }
        return undefined;
    },
    getWinnerDiagonals : function(board){
        var numTimes = Math.sqrt(board.length);
        var incrementP = Math.sqrt(board.length)+1;
        var incrementN = Math.sqrt(board.length)-1;
        var keepTrack = 1;
        for(var x=0; x<board.length-incrementP; x = x+incrementP){
            if(board[x]=="X" || board[x]=="O"){
                if(board[x] === board[x+incrementP]){
                    keepTrack++;
                    if(numTimes == keepTrack){
                        return board[x];
                    }
                }
                else{
                    keepTrack = 1;
                }
            }
        }
        for(var x=numTimes - 1; x<board.length-incrementN; x = x+incrementN){
            if(board[x]=="X" || board[x]=="O"){
                if(board[x]===board[x+incrementN]){
                    keepTrack++;
                    if(numTimes == keepTrack){
                        return board[x];
                    }
                }
                else{
                    keepTrack = 1;
                }
            }
        }
        return undefined;
    },
    isBoardFull : function(board){
        for(var x=0; x<board.length; x++){
            if(board[x]==" ")
                return false;
        }
        return true;
    },
    isValidMove : function(board, row, col){
        var length = board.length;
        var index = this.rowColToIndex(board, row, col);

        if(index>length || board[index] != " ")
            return false;
        else {
            return true;
        }
    },
    isValidMoveAlgebraicNotation : function(board, algebraicNotation){
        var info = this.algebraicToRowCol(algebraicNotation);
        return this.isValidMove(board, info["row"], info["col"]);
    },
    getRandomEmptyCellIndex: function(board){
        if(this.isBoardFull(board))
            return undefined;
        var numTimes = Math.sqrt(board.length);
        var chosen = true;
        // while(chosen){
        //   var randomInc = Math.floor(Math.random()*(numTimes+1));
        //   for(var x=0; x<board.length; x = x+randomInc){
        //     if(board[x] == " "){
        //       chosen = false;
        //       return x;
        //     }
        //   }
        // }
        var numEmptySpaces = function(board){
            var num = 0;
            for(var x=0; x<board.length; x++){
                if(board[x] == " ")
                    num++;
            }
            return num;
        };
        if(numEmptySpaces(board)>numTimes){
            var correct = true;
            while(correct){
                var random = Math.floor(Math.random()*board.length);
                if(board[random] == " "){
                    correct = false;
                    return random;
                }
            }
        }
        else {
            for(var x=0; x<board.length; x++){
                if(board[x] == " ")
                    return x;
            }
        }
        return undefined;
    }
}

module.exports = tic;
