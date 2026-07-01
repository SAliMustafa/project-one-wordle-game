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
const darkModeBtn = document.querySelector('#dark-mode')
const main = document.querySelector('body')
const squares = document.querySelectorAll('.tile')
const startGameBtn = document.querySelector('#start-btn')
const page = document.querySelector('#welcome-page')
const gameContainer = document.querySelector('#game')
const msg = document.querySelector('#message')
const closingMsg = document.querySelector('#closing-message')

function startGame() {
    page.classList.add('hidden')
    gameContainer.classList.remove('hidden')

}

function darkMode() {
    main.classList.toggle("dark-mode-class")
    darkModeBtn.classList.toggle("dark-mode-btns")
    reset.classList.toggle("dark-mode-btns")
    for (let i = 0; i < numOfTries; i++) {
        for (let r = 0; r < wordLength; r++) {
            let currentTile = document.getElementById(`${i}-${r}`)
            currentTile.classList.toggle("dark-mode-tile")
        }
    }
    if (main.classList.contains("dark-mode-class")) {
        darkModeBtn.innerHTML = 'Light Mode'
    } else {
        darkModeBtn.innerHTML = "Dark Mode"
    }
    document.activeElement.blur();
}

darkModeBtn.addEventListener('click', darkMode)

function playAgain() {
    for (let i = 0; i < numOfTries; i++) {
        for (let r = 0; r < wordLength; r++) {
            let currentTile = document.getElementById(`${i}-${r}`)
            currentTile.innerHTML = '';
            currentTile.classList.remove('correct', 'includes', 'absent');
        }
    }
    correctWord = words[Math.floor(Math.random() * words.length)]
    gameOver = false;
    currentLetter = 0;
    currentWord = 0;
    guess = '';
    ans.innerHTML = '';
    msg.innerHTML = ''
    document.activeElement.blur();
}

function addLetter(e) {
    if (gameOver) { return }
    let currentTile = document.getElementById(`${currentWord}-${currentLetter}`)
    let w = e.key.toUpperCase();
    if (currentLetter == 5 && e.key == 'Enter') {
        checkWord()
        gameOverF()
        if (guess == correctWord) {
            gameOver = true
            winMessage()

        }
        else {
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
            currentTile.innerHTML = w
            currentLetter++
            guess = guess + w
            return
        }
    }
}

function checkWord() {
    // for (let i = 0; i < wordLength; i++) {
    // let currentTile = document.getElementById(`${currentWord}-${i}`)
    //     let guessedLetter = guess[i];
    //     if (guessedLetter === correctWord[i]) {
    //         currentTile.classList.add("correct")
    //     } else if (correctWord.includes(guessedLetter)) {
    //         currentTile.classList.add("includes")
    //     } else {
    //         currentTile.classList.add("absent")
    //     }
    // }
    const letterValidation = {}
    for (let i = 0; i < wordLength; i++) {
        let letter = correctWord[i];
        // if (letterValidation[letter] === 'undefined') {
        //     letterValidation[letter] = 1
        // } else {
        //     letterValidation[letter]++
        // }
        letterValidation[letter] = (letterValidation[letter] || 0) + 1
            console.log(letterValidation)
    }
    let tileStatus = ['','','','','']
    for (let i = 0; i < wordLength; i++) {
        let guessedLetter = guess[i];
        if (guessedLetter === correctWord[i]) {
            tileStatus[i] = 'correct'
            letterValidation[guessedLetter]--
        }
        guessedLetter = guess[i];
    }
    for (let i = 0; i < wordLength; i++) {
        if (tileStatus[i] === 'correct') { continue }
        let guessedLetter = guess[i];
        if (letterValidation[guessedLetter] > 0) {
            tileStatus[i] = 'includes'
            letterValidation[guessedLetter]--
        } else {
            tileStatus[i] = 'absent'
        }
    }
    for (let i = 0; i < wordLength; i++) {
        let currentTile = document.getElementById(`${currentWord}-${i}`)
        currentTile.classList.add(tileStatus[i])
        console.log(tileStatus[i])

    }
}
function gameOverF() {
    if (currentWord === 5) {
        gameOver = true;
        lossMessage()
    }
}

function deleteLetters() {
    currentLetter--
    let currentTile = document.getElementById(`${currentWord}-${currentLetter}`)
    currentTile.innerHTML = ''
    guess = guess.slice(0, -1);
}

function winMessage() {
    msg.innerHTML = '🎉 Brilliant! You won!'
    closingMsg.classList.remove('hidden')
}

function lossMessage() {
    msg.innerHTML = `💥 Game Over! The word was ${correctWord}`
    closingMsg.classList.remove('hidden')
}

addEventListener('keyup', addLetter);
reset.addEventListener('click', playAgain)
startGameBtn.addEventListener('click', startGame)