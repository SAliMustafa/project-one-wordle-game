const letter = document.querySelector(".tile")

let word = "BREAK";
let currentWord = 0;
let currentLetter = 0;
let gameOver = false;
const wordLength = 5;
const numOfTries = 6;

function addLetter (e) {
    // for (let w = 0; w <= wordLength; w++){
    //     for(let t = 0; t <= numOfTries; t++){
            letter.innerHTML = e.key
//             return
//         }
//     }
}

// function nextLetter(){
//     const nextOne = document.querySelector('#0-0')
//     nextOne = nextOne + 1;
// }
addEventListener('keyup', addLetter);
