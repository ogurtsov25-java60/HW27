//References to DOM elements
const submitBtnElem = document.getElementById("submit-button");
const submitBtnLetter = document.getElementById("submit-button-letter");
// const formElem = document.getElementById("guess-word");
// const formElemLetter = document.getElementById("guess-letter")
const inputWordElem = document.querySelector(".word-input");
const inputLetterElem = document.querySelector(".letter-input")
const playAgainElem = document.getElementById("play-again");
const gameOverElem = document.getElementById("game-over");
const coloredLettersElem = document.querySelector(".colored-letters");
const attempts_number = document.querySelector(".attempts_number")
let letterElems;
//global variables
let finishMessage;
const words = [
    "const", "script", "java", "cycle", "image", "variable"
]
let word;
let guessedWord;
let tryels;
let allowedTryels;
let flOver = false;
let flOver_letter= false;
//functions 
function getWord() {
    const index = Math.floor(Math.random() * words.length);
    const res = words[index];
    return res;
}
function startGame() {
    word = getWord();
    tryels = 0;
    flOver = false;
    allowedTryels = getAllowedTryels();
    attempts_number.innerHTML = `Количество попыток:${allowedTryels}`
    playAgainElem.style.display = "none";
    gameOverElem.innerHTML = "";
    inputWordElem.value = ""
    submitBtnElem.disabled = true;
    coloredLettersElem.innerHTML = getLetterDivs();
    letterElems = document.querySelectorAll(".letter")
    
 
}
function coloringLetters() {
    const wordArr = Array.from(guessedWord);
    wordArr.forEach((l, i) => {
        let color = 'red';
        if (word.includes(l)) {
           color = guessedWord[i] == word[i] ? "green" : "yellow";
        }
        letterElems[i].innerHTML = l;
        letterElems[i].style.color = color;
    })
}
function getAllowedTryels() {
    const res = Math.ceil(word.length * 0.30);
    return res;
}
function getLetterDivs() {
    const divs = [];
    for(let i = 0; i < word.length; i++) {
        divs.push('<div class="letter"></div>')
    }
    return divs.join("");
}
function onInput() {
    submitBtnElem.disabled = inputWordElem.value.length !== word.length || flOver
}
function onInput_letter() {
    submitBtnLetter.disabled = inputWordElem.value.length ===1 || flOver_letter
}
function onSubmit(event) {
    event.preventDefault();
    guessedWord = inputWordElem.value;
    tryels++;
    coloringLetters();
    const messageGameOver = isGameOver();
    if(messageGameOver) {
        finishMessage = messageGameOver;
        finishGame();
    }

}
function onSubmit_letter(event) {
    event.preventDefault();
    guessedWord = inputLetterElem.value;
    tryels++;
    coloringLetters();
    const messageGameOver = isGameOver();
    if(messageGameOver) {
        finishMessage = messageGameOver;
        finishGame();
    }

}
function isGameOver() {
    let res = "";
    if (word === guessedWord) {
        res = `Congratulations. You are the winner with ${tryels} tryels`;
    } else if (tryels === allowedTryels) {
        res = "Unfortunatly you have used all tryels";
    }
    return res;
}
function finishGame() {
    playAgainElem.style.display = "block";
    gameOverElem.innerHTML = finishMessage;
    flOver = true;
    submitBtnElem.disabled = true;

}
//actions and event handlers definitions
startGame();