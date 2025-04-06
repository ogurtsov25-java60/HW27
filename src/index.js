
const submitBtnElem = document.getElementById("submit-button");
const submitBtnLetter = document.getElementById("submit-button-letter");
const inputWordElem = document.querySelector(".word-input");
const inputLetterElem = document.querySelector(".letter-input")
const playAgainElem = document.getElementById("play-again");
const gameOverElem = document.getElementById("game-over");
const coloredLettersElem = document.querySelector(".colored-letters");
const attempts_number = document.querySelector(".attempts_number")
const BtnGuess = document.querySelector(".guess")
const result =document.querySelector(".result")
const question = document.querySelector(".imgheader")

let letterElems;
let finishMessage;
const questions = {
"Hanukkah lamp?":"hanukkiah",
"Lamp - symbol of Judaism?":"menorah",
"A scroll of parchment containing part of the text of the Shema prayer?":"mezuzah",
"Israeli tank?":"merkava",
"Israeli parliament?":"knesset",
"Jewish holiday of Exodus?":"passover"
}

let word;
let questionsarr
let guessedWord;
let tryels;
let allowedTryels;
let flOver = false;
let flOver_letter= false;
//functions 

function getQuestion() {
    const index = Math.floor(Math.random() * Object.keys(questions).length);
    const res = Object.entries(questions)[index];
    return res;
}

function startGame() {
    questionsarr = getQuestion()
    word = questionsarr[1];
    question.innerHTML = questionsarr[0];
    flOver = false;
    tryels = getAllowedTryels();
    BtnGuess.disabled = true;
    attempts_number.innerHTML = `Numbers of attempts:${tryels}`
    playAgainElem.style.display = "none";
    gameOverElem.innerHTML = "";
    inputWordElem.value = ""
    submitBtnElem.disabled = true;
    coloredLettersElem.innerHTML = getLetterDivs();
    letterElems = document.querySelectorAll(".letter")
    backgroundLetters()
    
 
}
function openLetters(){
    const wordArr = Array.from(word);
    wordArr.forEach((l, i) => {
        let background = 'white';
        letterElems[i].innerHTML = l;
        letterElems[i].style.background = background;
    })
}
function backgroundLetters(){
    const wordArr = Array.from(word);
    wordArr.forEach((l, i) => {
        let background = 'black';
        letterElems[i].innerHTML = l;
        letterElems[i].style.background = background;
    })
}
function checkLetters(){
    const wordArr = Array.from(word);

    wordArr.forEach((l, i) => {
        if (l==inputLetterElem.value){

            letterElems[i].style.background = "white";
        }
        
    })

}

function getAllowedTryels() {
    const res = Math.ceil(Object.keys(questions).length * 0.30);
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
    submitBtnLetter.disabled = inputWordElem.value.length === tryels|| flOver
}
function onSubmit(event) {
    event.preventDefault();
    guessedWord = inputWordElem.value;


    if (guessedWord==word){
        result.innerHTML= "WIN"

    }
    else{
        result.innerHTML= "GAMEOVER"
    }
    openLetters();

   
        finishGame();
    }


function onSubmit_letter(event) {
    event.preventDefault();
    tryels--;
    attempts_number.innerHTML = `Numbers of attempts:${tryels}`
    checkLetters(); 
    if(tryels==0) {
        submitBtnLetter.disabled = true;
        guess.disabled = false;
        BtnGuess.disabled = false;
    }
    

}

function guess(){
    submitBtnElem.disabled = false;
}
function finishGame() {
    playAgainElem.style.display = "block";
    flOver = true;
    submitBtnElem.disabled = true;

}

startGame();