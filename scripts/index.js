import printDisplay from "./display_manipulation.js";

const API_URL =
  "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";

let drawNumber = 0;

let textResponse = document.getElementById("text-response");
let btnNewGame = document.getElementById("btn-new-game");

let guessForm = document.getElementById("guess-form");
let guessInput = document.getElementById("guess-input");
let guessButton = document.getElementById("guess-button");

// update page to initial state, before game begins
const cleanValues = () => {
  textResponse.innerText = "";
  textResponse.classList.remove("red-textColor");
  textResponse.classList.remove("green-textColor");

  printDisplay(0);

  btnNewGame.classList.add("display-vanish");

  guessInput.value = "";
  guessInput.classList.remove("input-background-gray");

  guessButton.classList.remove("btn-disabled");
};

const startGame = () => {
  cleanValues();

  // get the number from api
  fetch(API_URL)
    .then((response) => response.json())
    .then((response) => {
      console.log(response)

      if (response.Error) {
        textResponse.innerText = "ERRO";
        textResponse.classList.add("red-textColor");
        
        printDisplay(response.StatusCode, "red");

        btnNewGame.classList.remove("display-vanish");

        guessInput.classList.add("input-background-gray");
        guessButton.classList.add("btn-disabled");
      } else {
        drawNumber = response.value;
      }
    });
};

// user submit a guess => respond according to game rules
guessForm.addEventListener("submit", (event) => {
  // prevent page reload
  event.preventDefault();

  // check if the game is still going
  if (drawNumber) {
    let userGuess = Number(guessInput.value);

    // check if user guess is valid
    if (userGuess) {
      if (userGuess === drawNumber) {
        textResponse.innerText = "Você acertou!!!";
        textResponse.classList.add("green-textColor");

        btnNewGame.classList.remove("display-vanish");
        ///////////////// display turn green

        guessInput.classList.add("input-background-gray");
        guessButton.classList.add("btn-disabled");

        drawNumber = 0;
      } else if (userGuess > drawNumber) {
        textResponse.innerText = "É menor";
      } else {
        textResponse.innerText = "É maior";
      }

      printDisplay(userGuess);
    }
  }
});

// user guess is NOT valid => submit button turns gray
guessInput.addEventListener("input", (event) => {
  let userGuess = guessInput.value;
  // check if guess is NOT valid: guess NOT empty and guess is NOT a number
  if (userGuess.length && !Number(userGuess)) {
    guessInput.classList.add("input-background-gray");
    guessButton.classList.add("btn-disabled");
  } else {
    guessInput.classList.remove("input-background-gray");
    guessButton.classList.remove("btn-disabled");
  }
});

// newGame button was pressed => start a new match
btnNewGame.addEventListener("mouseup", (event) => {
  // if left mouse button was pressed
  if (event.button == 0) {
    startGame();
  }
});

startGame();
