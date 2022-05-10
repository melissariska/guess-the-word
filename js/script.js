const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

const symbol = function (word) {
    const symbolLetters = [];
    for (const letter of word) {
        console.log(letter);
        symbolLetters.push("●");
    }
    wordInProgress.innerText = symbolLetters.join("");
}

symbol(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    message.innerText = "";

    const guess = letterInput.value;
    const goodGuess = validInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
})

const validInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Please enter only one letter";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z";
    } else {
        return input;
    }
}

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already guessed that letter, try again!";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
}
