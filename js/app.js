let word = "BREAK";
let currentWord = 0;
let currentLetter = 0;
let gameOver = false;
const wordLength = 5;
const numOfTries = 6;

function addLetter(e) {
    console.log(`${currentWord}-${currentLetter}`)
    let currentTile = document.getElementById(`${currentWord}-${currentLetter}`)

    if (currentLetter == 5 && e.key == 'Enter') {
        console.log("IN IF")
        currentWord++;
        currentLetter = 0;
        return
    }
    if (e.key === 'Backspace'){
        currentLetter--
        let currentTile = document.getElementById(`${currentWord}-${currentLetter}`)
        currentTile.innerHTML = ''
        return
    }
    if (currentLetter<5){
    console.log(currentTile)
    currentTile.innerHTML = e.key
    currentLetter++
    return
    }
}

addEventListener('keyup', addLetter);
