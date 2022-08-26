const input = document.querySelector("#_input");
const user1Answer = document.querySelector("#_user1Answer");
const user2Answer = document.querySelector("#_user2Answer");
const gameHint = document.querySelector("#_gameHint");

let arrAnswers1P = [];
let arrAnswers2P = [];
let firstPlayer = true;

input.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    if (firstPlayer) {
      let newAnswer = document.createElement("p");
      newAnswer.textContent = input.value;
      newAnswer.classList.add("game__answer");
      user1Answer.append(newAnswer);

      input.value = "";
      arrAnswers1P.push(newAnswer.textContent);
      console.log(arrAnswers1P);

      firstPlayer = false;
      gameHint.textContent = 2;
    } else {
      let newAnswer = document.createElement("p");
      newAnswer.textContent = input.value;
      newAnswer.classList.add("game__answer");
      user2Answer.append(newAnswer);

      input.value = "";
      arrAnswers2P.push(newAnswer.textContent);
      console.log(arrAnswers2P);

      firstPlayer = true;
      gameHint.textContent = 1;
    }
  }
});
