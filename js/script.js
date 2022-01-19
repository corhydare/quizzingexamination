//  gotta make sure the saved scores are there
document.getElementById("p1").innerHTML =
  "<span>" +
  window.localStorage.getItem("Player") +
  "</span> scored <span>" +
  window.localStorage.getItem("Score") +
  "</span>";
