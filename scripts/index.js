const API_URL =
  "https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300";

let drawNumber = 0;

let textResponse = document.getElementById("text-response");
let displayList = document.getElementById("display-list");
let guessForm = document.getElementById("guess-form");
let guessInput = document.getElementById("guess-input");

// update page to initial state, before game begins
const cleanValues = () => {
  textResponse.innerText = "";
  printNumber(0);
  // make the button of nova partida - desaparecer
  guessInput.value = "";

  // make the button orange
};

const startGame = () => {
  cleanValues();

  // get the number from api
  fetch(API_URL)
    .then((response) => response.json())
    .then((response) => {
      drawNumber = response.value;
      console.log(`drawNumber is ${drawNumber}`);
    })
    .catch((err) => {
      //   text-response =  "ERRO" fica RED
      //   button nova partida, aparece
      //  button enviar, fica gray
    });
};

const printNumber = (number) => {
  displayList.innerText = number;
};

guessForm.addEventListener("submit", (event) => {
  // prevent page reload
  event.preventDefault();

  // check if the game is still going
  if (drawNumber) {
    userGuess = Number(guessInput.value);

    // check if user guess is valid
    if (userGuess) {
      console.log(`userGuess is ${userGuess}`);

      if (userGuess === drawNumber) {
        textResponse.innerText = "Você acertou!!!";
        // display turn green
        // botton new-game appears
        // guessInput, guessButton turns gray

        drawNumber = 0;
      } else if (userGuess > drawNumber) {
        textResponse.innerText = "É menor";
      } else {
        textResponse.innerText = "É maior";
      }

      printNumber(userGuess)
      
    }
  }
});

// if user guess is NOT valid, submit button turns gray
guessInput.addEventListener("input", (event) => {
  userGuess = guessInput.value;

  // check if guess is NOT valid: guess NOT empty and guess is NOT a number
  if (userGuess.length && !Number(userGuess)) {
    console.log("turn the enviar button grayyy");
  }
});

startGame();
