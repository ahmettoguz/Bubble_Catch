function clearCssOfButton(difficulty) {
  $(`#${difficulty}Button`).css({
    "background-color": "red",
    "font-weight": "400",
    "background-color": "rgb(205, 202, 202)",
    "text-decoration": "none",
    outline: "none",
    border: "3px solid black",
    "box-shadow": "1px 1px 1px black",
  });
}

function addCssOfButton(difficulty) {
  if (difficulty == "Easy")
    $(`#${difficulty}Button`).css({ "background-color": " rgb(38, 255, 0)" });
  else if (difficulty == "Medium")
    $(`#${difficulty}Button`).css({ "background-color": " rgb(255, 215, 36)" });
  else $(`#${difficulty}Button`).css({ "background-color": "orangered" });

  $(`#${difficulty}Button`).css({
    outline: "2px solid black",
    "box-shadow": "2.5px 2.5px 2px black",
    "font-weight": "700",
    "text-decoration": "underline",
    "text-decoration-thickness": "3px",
    "text-underline-offset": "4px",
  });
}

function changeDifficulty(element) {
  currentDifficulty = $(element).text();
  console.log(currentDifficulty);
  if (currentDifficulty == "Easy") {
    addCssOfButton(currentDifficulty);
    clearCssOfButton("Medium");
    clearCssOfButton("Hard");

    // play audio
    bubbleAudio1.play();
  } else if (currentDifficulty == "Medium") {
    addCssOfButton(currentDifficulty);
    clearCssOfButton("Easy");
    clearCssOfButton("Hard");

    // play audio
    bubbleAudio3.play();
  } else {
    addCssOfButton(currentDifficulty);
    clearCssOfButton("Easy");
    clearCssOfButton("Medium");

    // play audio
    bubbleAudio2.play();
  }
}
