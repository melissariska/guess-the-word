const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const response = await fetch(`https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt`);
    const words = await response.text();
    const wordArray = words.split("\n");
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    symbol(word);
}

// Start game 
getWord();

// Display symbols as placeholders for letters of the word
const symbol = function (word) {
    const symbolLetters = [];
    for (const letter of word) {
        //console.log(letter);
        symbolLetters.push("●");
    }
    wordInProgress.innerText = symbolLetters.join("");
}

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // Empty message
    message.innerText = "";
    // What was entered in the input
    const guess = letterInput.value;
    // Make sure it is a single letter
    const goodGuess = validateInput(guess);

    if (goodGuess) {
        makeGuess(guess);
    }

    letterInput.value = "";
});

const validateInput = function (input) {
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
        updateGuessesRemaining(guess);
        showGuessedLetters();
        wordInProgressUpdate(guessedLetters);
    }
};

const showGuessedLetters = function () {
    guessedLettersList.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    }
};

const wordInProgressUpdate = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    wordInProgress.innerText = showWord.join("");
    checkIfWon();
};

const updateGuessesRemaining = function (guess) {
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
       message.innerText = `Sorry, the word doesn't contain ${guess}.`;
       remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word contains the letter ${guess}.`;
    }

    if (remainingGuesses === 0) {
        message.innerText = `Game over! The word is ${word}.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
}

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    message.innerText = "";

    getWord();

    guessButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
});