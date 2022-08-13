let drawNumber = 0;

textResponse = document.getElementById("text-response");
displayList = document.getElementById("display-list");

const startGame = () => {
  printNumber(0);

  userGuess = document.getElementById("user-guess");
  userGuess.innerText = "";
  textResponse.innerText = "ASDF";
  // get the number from api
  // if (error) {
  //   text-response = "ERRO"
  //   coloca o text-response e o display-list em red
  //   aparece botão, nova partida
  // }
};

const printNumber = (number) => {
  console.log(displayList);
  displayList.innerText = number;
};

startGame();
