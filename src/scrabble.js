/**
 * Created by jeffersonvivanco on 9/25/16.
 */
/**
 * scrabble.js
 * @author Jefferson Vivanco
 */
var readline  = require('readline');
var fs = require('fs');

var letterValues = {
    "E": 1, "A": 1, "I": 1, "O": 1, "N": 1, "R": 1, "T": 1, "L": 1, "S": 1, "U": 1,
    "D": 2, "G": 2, "B": 3, "C": 3, "M": 3, "P": 3, "F": 4, "H": 4, "V": 4, "W": 4,
    "Y": 4, "K": 5, "J": 8, "X": 8, "Q": 10, "Z": 10
};

var fileName = '../data/enable1.txt';
var wordObjects = [];
var words = ["0"];
// set up a readline object that can be used for reading data from a file
// line by line
fileInput = readline.createInterface({
    input: fs.createReadStream(fileName)
});

// specify what functions to call when the readline object:
// 1. reads a single line from the file
// 2. finishes reading the file
fileInput.on('line', handleLine);
fileInput.on('close', handleClose);
var index = 0;
var word = "";
function handleLine(line) {
    // console.log('line ' + n + ': ' + line);
    // mutating a global
    word = line;
    words[index] = word;
    index++;
}


function handleClose() {
    //do something
}



// set up a readline object that can be used for gathering user input
var userPrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var wordObj = function(word, score){
    return {word:word, score: score}
};
//Checking if the sequence of letters matches the dictionaryWord
var check = function(userLetters,dictionaryWord){
    for(var x=0; x<dictionaryWord.length; x++){
        var result = userLetters.search(dictionaryWord.charAt(x));
        if(result>=0){
            var firstPart = userLetters.slice(0,result);
            var secondPart = userLetters.slice(result+1, userLetters.length);
            userLetters = firstPart + secondPart;
        }
        else{
            return false;
        }
    }
    return true;
};
//Getting score of each word
var getScore = function(word){
    var score = 0;
    for(var x=0; x<word.length; x++){
        var char = word.charAt(x);
        char  = char.toUpperCase();
        score = score + letterValues[char];
    }
    return score;
};
//Return top 5 words
var returnTopFive = function(wordObjects){
    wordObjects.sort(function(a, b){
        if(a.score < b.score)
            return 1;
        else if (a.score > b.score) {
            return -1;
        }else {
            return 0;
        }
    });
    return wordObjects.slice(0, 5);
};
//Asking user for set of letters
userPrompt.question('Please enter some letters:\n', handleUserInput);
function handleUserInput(response){
    var userLetters = response;
    for(var i=0; i<words.length; i++){
        if(check(userLetters, words[i])){
            var score = getScore(words[i]);
            var obj = wordObj(words[i], score);
            wordObjects.push(obj);
        }
    }
    // console.log(wordObjects);
    userPrompt.close();
    console.log("\nThe top scoring words are: \n");
    var topwords = returnTopFive(wordObjects);
    for(var x=0; x<topwords.length; x++){
        console.log(topwords[x].score + " - "+topwords[x].word);
    }
    console.log("\n");
}
