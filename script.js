const input = document.querySelector("#_input");
const user1Answer = document.querySelector("#_user1Answer");
const user2Answer = document.querySelector("#_user2Answer");
const gameHint = document.querySelector("#_gameHint");
const timer = document.querySelector("#_timer");
const resetBtn = document.querySelector("#_resetBtn");
const hideBtn = document.querySelector("#_hideBtn");
const answersZone = document.querySelector("#_answersZone");

let arrAnswers1P = [];
let arrAnswers2P = [];
let firstPlayer = true;
let timerId;
let timerCounter = 6;

input.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    if (!checkAnswer(input.value)) {
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
    } else {
      return;
    }
  }
});

timer.addEventListener("click", startTimer);

function startTimer() {
  timerId = setInterval(function () {
    timerCounter--;

    timer.textContent = timerCounter + " секунд(ы)";
    if (timerCounter == 0) {
      clearInterval(timerId);
    }
  }, 1000);
  timer.removeEventListener("click", startTimer);
}

function checkAnswer(word) {
  if (arrAnswers1P.includes(word) || arrAnswers2P.includes(word)) {
    alert("Это слово уже было");
    return true;
  }
}

resetBtn.addEventListener("click", function () {
  arrAnswers1P = [];
  arrAnswers2P = [];
  clearInterval(timerId);
  timer.textContent = "кликните для запуска таймера";

  let gameAnswerAll = document.querySelectorAll(".game__answer");
  for (let gameAnswer of gameAnswerAll) {
    user1Answer.removeChild(gameAnswer);
    user2Answer.removeChild(gameAnswer);
  }
});

hideBtn.addEventListener("click", function () {
  user1Answer.classList.add("game__answers_off");
  user2Answer.classList.add("game__answers_off");
});
