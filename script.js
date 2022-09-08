const inputForLetter = document.querySelector("#_inputForLetter");
const input = document.querySelector("#_input");
const user1Answer = document.querySelector("#_user1Answer");
const user2Answer = document.querySelector("#_user2Answer");
const gameHint = document.querySelector("#_gameHint");
const timer = document.querySelector("#_timer");
const resetBtn = document.querySelector("#_resetBtn");
const hideBtn = document.querySelector("#_hideBtn");
const showConditionsBtn = document.querySelector("#_showConditionsBtn");
const gameRules = document.querySelector("#_gameRules");
const choosenLetter = document.querySelector("#_choosenLetter");
const gameContainer1 = document.querySelector("#_gameContainer1");
const gameContainer2 = document.querySelector("#_gameContainer2");
const gameContainer3 = document.querySelector("#_gameContainer3");
const gameContainerAnswers = document.querySelector("#_gameContainerAnswers");
const chooseUser = document.querySelector("#_chooseUser");
const winText = document.querySelector("#_winText");
let winUser = document.querySelector("#_winUser");

// массив для ответов юзера 1
let arrAnswers1P = [];

// массив для ответов юзера 2
let arrAnswers2P = [];

// переменная для определения списка ответов юзеров
let firstPlayerTurn = true;

// переменная айди таймера для аннулирования таймера
let timerId;

// счетчик для таймера
let timerCounter = 120;

// переменнная для кнопки скрыть ответы
let showAnswers = true;

// переменная для скрытий условий игры по умолчанию
let showConditions = false;
// functions

// функция для проверки длины ввода
function checkLength(inputValue) {
  let inputValueSplit = inputValue.split("");
  if (inputValueSplit.length > 1) {
    inputValue.value = "";
    alert("Нужно ввести одну букву для игры");

    return false;
  } else return true;
}

function checkFirstLetter(str, firstLetter) {
  if (str[0].toLowerCase() == firstLetter.toLowerCase()) {
    return true;
  } else {
    alert("Вы вводите слово не на ту букву");
  }
}

// функция для проверки повторного использования слова
function checkRepeat(word) {
  if (arrAnswers1P.includes(word) || arrAnswers2P.includes(word)) {
    alert("Это слово уже было");
    return false;
  } else return true;
}

// функция для определения победителя
function checkResultGame() {
  if (timerCounter == 0) {
    timerCounter = 0;
    input.setAttribute("disabled", true);
    resetBtn.style.backgroundColor = "floralwhite";

    chooseUser.classList.add("game__hint_inactive");
    winText.classList.remove("game__hint_inactive");

    if (firstPlayerTurn == true) {
      winUser.textContent = 2;
    } else {
      winUser.textContent = 1;
    }
  }
}

showConditionsBtn.addEventListener("click", function () {
  if (!showConditions) {
    gameRules.classList.remove("rules__texts_inactive");
    this.textContent = "Скрыть условия игры";
    showConditions = true;
  } else {
    gameRules.classList.add("rules__texts_inactive");
    this.textContent = "Показать условия игры";
    showConditions = false;
  }
});

// слушатель для инпута с вводом буквы
inputForLetter.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    if (checkLength(this.value)) {
      choosenLetter.textContent = this.value.toUpperCase();
      this.value = "";
      gameContainer1.classList.add("game__container_inactive");
      chooseUser.classList.remove("game__hint_inactive");

      gameContainer2.classList.remove("game__container_inactive");
      gameContainer3.classList.remove("game__container_inactive");
      gameContainerAnswers.classList.remove("answers_inactive");

      startTimer();
    }
  }
});

// слушатель для главного инпута игры
input.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    // проверяем не было ли уже использовано слово
    if (checkFirstLetter(this.value, choosenLetter.textContent)) {
      if (checkRepeat(this.value)) {
        if (firstPlayerTurn) {
          let newAnswer = document.createElement("p");
          newAnswer.textContent = this.value.toLowerCase();
          newAnswer.classList.add("answers__text");
          user1Answer.append(newAnswer);

          this.value = "";
          arrAnswers1P.push(newAnswer.textContent);
          // console.log(arrAnswers1P);

          firstPlayerTurn = false;
          gameHint.textContent = 2;
        } else {
          let newAnswer = document.createElement("p");
          newAnswer.textContent = this.value.toLowerCase();
          newAnswer.classList.add("answers__text");
          user2Answer.append(newAnswer);

          this.value = "";
          arrAnswers2P.push(newAnswer.textContent);
          // console.log(arrAnswers2P);

          firstPlayerTurn = true;
          gameHint.textContent = 1;
        }
        timerCounter = 120;
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
    checkResultGame();
  }, 1000);

  // удаляем listener чтоб таймер не запускался несколько раз
  timer.removeEventListener("click", startTimer);
}

// функция для сброса всех данных, чтоб начать игру заново
resetBtn.addEventListener("click", function () {
  arrAnswers1P = [];
  arrAnswers2P = [];
  clearInterval(timerId);
  timerCounter = 120;
  timer.addEventListener("click", startTimer);

  // удаляем каждый созданный список с ответами
  let gameAnswerAll = document.querySelectorAll(".answers__text");
  for (let gameAnswer of gameAnswerAll) {
    if (user1Answer.contains(gameAnswer)) {
      user1Answer.removeChild(gameAnswer);
    } else {
      user2Answer.removeChild(gameAnswer);
    }
  }

  gameContainer1.classList.remove("game__container_inactive");
  choosenLetter.textContent = "";
  input.removeAttribute("disabled");
  resetBtn.style.backgroundColor = "rgb(236, 236, 236)";

  chooseUser.classList.remove("game__hint_inactive");
  winText.classList.add("game__hint_inactive");
  winUser = "";

  // возвращаем блоки в первончальное скрытое положение
  gameContainer2.classList.add("game__container_inactive");
  gameContainer3.classList.add("game__container_inactive");
  gameContainerAnswers.classList.add("answers_inactive");
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
});
