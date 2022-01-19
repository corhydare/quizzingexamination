//  gotta make sure the saved scores are there
document.getElementById("p1").innerHTML =
  "<span>" +
  window.localStorage.getItem("Player") +
  "</span> scored <span>" +
  window.localStorage.getItem("Score") +
  "</span>";

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
