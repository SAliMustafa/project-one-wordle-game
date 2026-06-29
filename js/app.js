let word = "BREAK";
let currentWord = 0;
let currentLetter = 0;
let gameOver = false;
const wordLength = 5;
const numOfTries = 6;
let guess = '';

function addLetter(e) {

    console.log(`${currentWord}-${currentLetter}`)
    let currentTile = document.getElementById(`${currentWord}-${currentLetter}`)
    let w = e.key.toUpperCase();

    if (currentLetter == 5 && e.key == 'Enter') {
        if (guess == word) {
            gameOver = true
            console.log("You Won!")
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
        currentLetter--
        let currentTile = document.getElementById(`${currentWord}-${currentLetter}`)
        currentTile.innerHTML = ''
        guess = guess.slice(0, -1);
        return
    }
    if (e.code.startsWith('Key') && currentLetter < 5) {
        if (w >= 'A' && w <= 'Z'){
        console.log(currentTile)
        currentTile.innerHTML = w
        currentLetter++
        guess = guess + w
        // guess.push(w)
        console.log(guess)
        return}
    }
}

// function win(){

// }

addEventListener('keyup', addLetter);
