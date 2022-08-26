const input = document.querySelector("#_input");
const user1Answer = document.querySelector("#_user1Answer");
const user2Answer = document.querySelector("#_user2Answer");

let arrAnswers1P = [];
let arrAnswers2P = [];
let firstPlayer = true;

input.addEventListener("keydown", function (event) {
  if (event.key == "Enter") {
    if (firstPlayer) {
      let newAnswer = document.createElement("p");
      newAnswer.textContent = input.value;
      user1Answer.append(newAnswer);

      input.value = "";
      arrAnswers1P.push(newAnswer.textContent);
      console.log(arrAnswers1P);

      firstPlayer = false;
    } else {
      let newAnswer = document.createElement("p");
      newAnswer.textContent = input.value;
      user2Answer.append(newAnswer);

      input.value = "";
      arrAnswers2P.push(newAnswer.textContent);
      console.log(arrAnswers2P);

      firstPlayer = true;
    }
  }
});
