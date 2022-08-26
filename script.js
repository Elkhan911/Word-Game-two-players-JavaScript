const input = document.querySelector("#_input");
const user1Answer = document.querySelector("#_user1Answer");
const user2Answer = document.querySelector("#_user2Answer");
const gameHint = document.querySelector("#_gameHint");
const timer = document.querySelector("#_timer");
const resetBtn = document.querySelector("#_resetBtn");
const hideBtn = document.querySelector("#_hideBtn");
const answersZone = document.querySelector("#_answersZone");
const showConditionsBtn = document.querySelector("#_showConditionsBtn");
const gameRules = document.querySelector("#_gameRules");
const inputForletter = document.querySelector("#_inputForletter");
const choosenLetter = document.querySelector("#_choosenLetter");
const letterChooseZone = document.querySelector("#_letterChooseZone");
const chooseUser = document.querySelector("#_chooseUser");

// массив для ответов юзера 1
let arrAnswers1P = [];

// массив для ответов юзера 2
let arrAnswers2P = [];

// переменная для определения списка ответов юзеров
let firstPlayer = true;

// переменная айди таймера для аннулирования таймера
let timerId;

// счетчик для таймера
let timerCounter = 121;

// переменнная для кнопки скрыть ответы
let showAnswers = true;

let showConditions = false;
// functions

// функция для проверки повторного использования слова
function checkRepeat(word) {
  if (arrAnswers1P.includes(word) || arrAnswers2P.includes(word)) {
    alert("Это слово уже было");
    return true;
  }
}

// функция для проверки длины ввода
function checkLength(inputValue) {
  inputValueSplit = inputValue.split("");
  if (inputValueSplit.length > 1) {
    inputValue.value = "";
    alert("Нужно ввести одну букву для игры");

    return false;
  } else return true;
}

// слушатель для ввода буквы
inputForletter.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    if (checkLength(inputForletter.value)) {
      choosenLetter.textContent = inputForletter.value.toUpperCase();
      inputForletter.value = "";
      letterChooseZone.classList.add("game__letter-choose_off");
      chooseUser.classList.remove("game__hints_off");
    }
  }
});

input.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    // проверяем не было ли уже использовано слово
    if (checkFirstLetter(input.value, choosenLetter.textContent)) {
      if (!checkRepeat(input.value)) {
        if (firstPlayer) {
          let newAnswer = document.createElement("p");
          newAnswer.textContent = input.value;
          newAnswer.classList.add("game__answerFirst");
          user1Answer.append(newAnswer);

          input.value = "";
          arrAnswers1P.push(newAnswer.textContent);
          console.log(arrAnswers1P);

          firstPlayer = false;
          gameHint.textContent = 2;
        } else {
          let newAnswer = document.createElement("p");
          newAnswer.textContent = input.value;
          newAnswer.classList.add("game__answerSecond");
          user2Answer.append(newAnswer);

          input.value = "";
          arrAnswers2P.push(newAnswer.textContent);
          console.log(arrAnswers2P);

          firstPlayer = true;
          gameHint.textContent = 1;
        }
      }
    }
  }
});

timer.addEventListener("click", startTimer);

// функция для запуска таймера
function startTimer() {
  timerId = setInterval(function () {
    timerCounter--;

    timer.textContent = timerCounter + " секунд(ы)";
    if (timerCounter == 0) {
      clearInterval(timerId);
    }
  }, 1000);

  // удаляем listener чтоб таймер не запускался несколько раз
  timer.removeEventListener("click", startTimer);
}

// функция для сброса всех данных, чтоб начать игру заново
resetBtn.addEventListener("click", function () {
  arrAnswers1P = [];
  arrAnswers2P = [];
  clearInterval(timerId);
  timer.innerHTML = " <u>кликните</u > для запуска таймера";
  timer.addEventListener("click", startTimer);

  letterChooseZone.classList.remove("game__letter-choose_off");
  chooseUser.classList.add("game__hints_off");
  choosenLetter.textContent = "";

  // удаляем каждый созданный список с ответом юзера 1
  let gameAnswerAll1 = document.querySelectorAll(".game__answerFirst");
  for (let gameAnswer1 of gameAnswerAll1) {
    user1Answer.removeChild(gameAnswer1);
  }

  // удаляем каждый созданный список с ответом юзера 2
  let gameAnswerAll2 = document.querySelectorAll(".game__answerSecond");
  for (let gameAnswer2 of gameAnswerAll2) {
    user2Answer.removeChild(gameAnswer2);
  }
});

// функция-переключатель для скрыть/показать ответы юзеров
hideBtn.addEventListener("click", function () {
  if (showAnswers) {
    showAnswers = false;
    user1Answer.classList.add("game__answers_off");
    user2Answer.classList.add("game__answers_off");
    hideBtn.textContent = "Показать ответы";
  } else {
    showAnswers = true;
    user1Answer.classList.remove("game__answers_off");
    user2Answer.classList.remove("game__answers_off");
    hideBtn.textContent = "скрыть ответы";
  }
  console.log(showAnswers);
});

function checkFirstLetter(str, firstLetter) {
  if (str[0].toLowerCase() == firstLetter.toLowerCase()) {
    return true;
  } else {
    alert("Вы вводите слово не на ту букву");
  }
}

showConditionsBtn.addEventListener("click", function () {
  if (!showConditions) {
    gameRules.classList.remove("game__rules-zone_off");
    this.textContent = "Скрыть условия игры";
    showConditions = true;
  } else {
    gameRules.classList.add("game__rules-zone_off");
    this.textContent = "Показать условия игры";
    showConditions = false;
  }
});
