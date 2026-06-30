const words = ["ABOUT", "ABOVE", "ADULT", "AFTER", "AGENT", "BASIC", "BEACH", "BEGIN", "BLACK", "BLIND",
  "CABLE", "CAMEL", "CHAIN", "CHAIR", "CLEAR", "DANCE", "DEATH", "DELAY", "DEPTH", "EARLY",
  "EARTH", "EIGHT", "EMPTY", "FAITH", "FIELD", "FIRST", "FOCUS", "GIANT", "GLASS", "GLOVE",
  "GRACE", "HABIT", "HEART", "HEAVY", "HOUSE", "IDEAL", "IMAGE", "IMPLY", "INDEX", "JOINT",
  "JUDGE", "JUICE", "JUMBO", "KNIFE", "KNOCK", "KNOWN", "KOALA", "LABOR", "LAUGH", "LEMON",
  "LIGHT", "MAGIC", "MAJOR", "MATCH", "METAL", "NEVER", "NIGHT", "NOISE", "NORTH", "OCEAN",
  "OFFER", "OFTEN", "ORDER", "PAPER", "PEACE", "PHONE", "PILOT", "QUEEN", "QUICK", "QUIET",
  "QUOTE", "RADIO", "RAISE", "REACH", "RELAX", "SCALE", "SHARE", "SHIRT", "SMART", "TABLE",
  "TASTE", "THEME", "THING", "UNCLE", "UNDER", "UNION", "UNTIL", "VALID", "VALUE", "VIDEO",
  "VOICE", "WASTE", "WATCH", "WATER", "WORLD", "YACHT", "YOUNG", "YOUTH", "ZEBRA", "ZONES"]
let currentWord = 0;
let currentLetter = 0;
let gameOver = false;
const wordLength = 5;
const numOfTries = 6;
let guess = '';
let correctWord = words[Math.floor(Math.random() * words.length)] 
const ans = document.querySelector('#answer')
const reset = document.querySelector('#play-again')
// let letterCount = {};
const darkModeBtn = document.querySelector('#dark-mode')
const main = document.querySelector('body')
const squares = document.querySelectorAll('.tile')
const startGameBtn = document.querySelector('#start-btn')
const page = document.querySelector('#welcome-page')
const gameContainer = document.querySelector('#game')
const msg = document.querySelector('#message')

// function darkMode(){
//     main.style.backgroundColor = 'black';
//     const title0 = document.querySelector('#title')
//     title0.style.color = 'grey';
//     const squares = document.querySelectorAll('.tile')
//     for (let i = 0; i<numOfTries; i++){
//         for (let r = 0; r<wordLength; r++){
//             let currentTile = document.getElementById(`${i}-${r}`)
//             currentTile.style.backgroundColor = 'grey';
//         }
//     }
//     ans.style.color = 'white';
//     darkModeBtn.style.backgroundColor = 'grey';
//     darkModeBtn.style.color = 'white';
//     darkModeBtn.style.border = 'solid dark grey';
//     reset.style.backgroundColor = 'grey';
//     reset.style.color = 'white';
//     reset.style.border = 'none';
// }

function startGame(){
    page.classList.add('hidden')
    gameContainer.classList.remove('hidden')

}

function darkMode(){
    main.classList.toggle("dark-mode-class")
    darkModeBtn.classList.toggle("dark-mode-btns")
    reset.classList.toggle("dark-mode-btns")
    // squares.classList.add("dark-mode-tile")
    for (let i = 0; i<numOfTries; i++){
         for (let r = 0; r<wordLength; r++){
            let currentTile = document.getElementById(`${i}-${r}`)
            currentTile.classList.toggle("dark-mode-tile")
         }
    }
    if (main.classList.contains("dark-mode-class")){
        darkModeBtn.innerHTML = 'Light Mode'
    } else {
        darkModeBtn.innerHTML = "Dark Mode"
    }
}

darkModeBtn.addEventListener('click', darkMode)

function playAgain(){
    for (let i = 0; i<numOfTries; i++){
        for (let r = 0; r<wordLength; r++){
            let currentTile = document.getElementById(`${i}-${r}`)
            currentTile.innerHTML = '';
            currentTile.classList.remove('correct','includes','absent');
        }
    }
    correctWord = words[Math.floor(Math.random() * words.length)]
    gameOver = false;
    currentLetter = 0;
    currentWord = 0;
    guess = '';
    ans.innerHTML = '';
}

function addLetter(e) {
    if (gameOver){return}
    console.log(`${currentWord}-${currentLetter}`)
    let currentTile = document.getElementById(`${currentWord}-${currentLetter}`)
    let w = e.key.toUpperCase();
    if (currentLetter == 5 && e.key == 'Enter') {
        checkWord()
        gameOverF()
        if (guess == correctWord) {
            gameOver = true
            // ans.innerHTML = word
            console.log("You Won!")
            message.innerHTML = 'You lost, why not try again?'

        }
        else {
            console.log("IN IF")
            currentWord++;
            currentLetter = 0;
            guess = '';
            return
        }
    }
    if (currentLetter > 0 && e.key === 'Backspace') {
        deleteLetters();
        return
    }
    if (e.code.startsWith('Key') && currentLetter < 5) {
        if (w >= 'A' && w <= 'Z') {
            console.log(currentTile)
            currentTile.innerHTML = w
            currentLetter++
            guess = guess + w
            // guess.push(w)
            console.log(guess)
            return
        }
    }
}

// function countLetters(){
    
// }
function checkWord() {
    for (let i = 0; i < wordLength; i++) {
        let currentTile = document.getElementById(`${currentWord}-${i}`)
        let guessedLetter = guess[i];
        if (guessedLetter === correctWord[i]) {
            currentTile.classList.add("correct")
        } else if (correctWord.includes(guessedLetter)) {
            currentTile.classList.add("includes")
        } else {
            currentTile.classList.add("absent")
        }
    }
}

function gameOverF() {
    console.log('currentWord', currentWord)
    if (currentWord === 5) {
        gameOver = true;
        ans.innerHTML = correctWord;
        message.innerHTML = 'You lost, why not try again?'
    }
}

function deleteLetters(){
        currentLetter--
        let currentTile = document.getElementById(`${currentWord}-${currentLetter}`)
        currentTile.innerHTML = ''
        guess = guess.slice(0, -1);
}



addEventListener('keyup', addLetter);
reset.addEventListener('click', playAgain)
startGameBtn.addEventListener('click', startGame)