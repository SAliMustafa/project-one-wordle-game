let word = "BREAK";
let currentWord = 0;
let currentLetter = 0;
let gameOver = false;
const wordLength = 5;
const numOfTries = 6;

function addLetter(e) {
    // for (let w = 0; w <= wordLength; w++){
    //     for(let t = 0; t <= numOfTries; t++){
    // const letter = document.querySelector(".tile")
    // letter.innerHTML = e.key

    console.log(`${currentWord}-${currentLetter}`)
    let currentTile = document.getElementById(`${currentWord}-${currentLetter}`)
    if (currentLetter == 5 && e.key == 'Enter') {
        console.log("IN IF")
        currentWord++;
        currentLetter = 0;
        return
    }
    console.log(currentTile)
    currentTile.innerHTML = e.key
    currentLetter++

    //         }
    //         currentWord++
    //     }
}
addEventListener('keyup', addLetter);
