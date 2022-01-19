const start = document.querySelector(".start button");
const highscores = document.querySelector(".highscores");
const exit_btn = highscores.querySelector(".buttons .reset");
const noStopping = highscores.querySelector(".buttons .restart");
const qFrame = document.querySelector(".qFrame");
const finalDiv = document.querySelector(".finalDiv");
const qChoices = document.querySelector(".qChoices");
const timeText = document.querySelector(".clock .gameover");
const timeCount = document.querySelector(".clock .seconds");

//  gotta make sure the saved scores are there
document.getElementById("p1").innerHTML =
  "<span>" +
  window.localStorage.getItem("Player") +
  "</span> scored <span>" +
  window.localStorage.getItem("Score") +
  "</span>";

start.onclick = () => {
  highscores.classList.add("activeInfo");
};

exit_btn.onclick = () => {
  highscores.classList.remove("activeInfo");
};

noStopping.onclick = () => {
  newExam.onclick();
};

let timeValue = 20;
let questionsPulled = 0;
let questionsScored = 1;
let userScore = 0;
let counter;
let widthValue = 0;

const newExam = finalDiv.querySelector(".buttons .restart");
const endExam = finalDiv.querySelector(".buttons .reset");

newExam.onclick = () => {
  qFrame.classList.add("activeQuiz");
  finalDiv.classList.remove("activeResult");
  timeValue = 20;
  questionsPulled = 0;
  questionsScored = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(questionsPulled);
  queCounter(questionsScored);
  clearInterval(counter);
  countdown(timeValue);
  timeText.textContent = "Time: ";
  //   wrongbuton.classList.remove("show");
};

endExam.onclick = () => {
  finalDiv.classList.remove("activeResult");
  highscores.classList.add("activeInfo");
};

const finalScore = document.querySelector("footer .correctness");

function showQuetions(index) {
  const titles = document.querySelector(".titles");

  let writeQuestions =
    "<span>" + questions[index].qc + ". " + questions[index].title + "</span>";
  let selectChoices =
    '<div class="option"><span>' +
    questions[index].choices[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].choices[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].choices[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].choices[3] +
    "</span></div>";
  titles.innerHTML = writeQuestions;
  qChoices.innerHTML = selectChoices;

  const option = qChoices.querySelectorAll(".option");

  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}
function optionSelected(answer) {
  let yourDecision = answer.textContent;
  let correcAns = questions[questionsPulled].answer;

  if (yourDecision == correcAns) {
    userScore += 1;
    answer.classList.add("correct");
  } else {
    answer.classList.add("incorrect");
  }
  if (questionsPulled < questions.length - 1) {
    questionsPulled++;
    questionsScored++;
    showQuetions(questionsPulled);
    queCounter(questionsScored);
  } else {
    clearInterval(counter);
    showResult();
  }
}

function showResult() {
  highscores.classList.remove("activeInfo");
  qFrame.classList.remove("activeQuiz");
  finalDiv.classList.add("activeResult");
  const scoreText = finalDiv.querySelector(".yourPoints");
  if (userScore >= 2) {
    let writeScore = "<span>You scored <p>" + userScore + "</p> points.</span>";
    scoreText.innerHTML = writeScore;
  } else if (userScore == 1) {
    let writeScore = "<span><p>" + userScore + "</p> pathetic point..</span>";
    scoreText.innerHTML = writeScore;
  } else {
    let writeScore = "<span>Are you mad? <p>" + userScore + "</p> ?</span>";
    scoreText.innerHTML = writeScore;
  }
  if (userScore > window.localStorage.getItem("Score")) {
    const finalName = prompt("Enter your name to save your score", "Player 1");

    window.localStorage.setItem("Player", finalName);
    window.localStorage.setItem("Score", userScore);

    document.getElementById("p1").innerHTML =
      "<span>" +
      window.localStorage.getItem("Player") +
      "</span> scored <span>" +
      window.localStorage.getItem("Score") +
      " points.</span>";
  }
}

function countdown(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 0) {
      clearInterval(counter);
      showResult();
    }
  }
}

function queCounter(index) {
  let howBad = "<span>Correct answers:&nbsp;<p>" + userScore + "</p></span>";
  finalScore.innerHTML = howBad;
}
