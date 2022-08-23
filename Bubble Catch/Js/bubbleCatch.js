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

const bubbleAudio1 = new Audio("../Audio/bubble1.mp3");
const bubbleAudio2 = new Audio("../Audio/bubble2.mp3");
const bubbleAudio3 = new Audio("../Audio/bubble3.mp3");
const gameOverAudio2 = new Audio("../Audio/gameOver2.mp3");
const gameStartAudio = new Audio("../Audio/gameStart.mp3");

currentDifficulty = "Medium";
easySpeedOfBubbles = 2000;
mediumSpeedOfBubbles = 1500;
hardSpeedOfBubbles = 1000;

speedOfBubbles = mediumSpeedOfBubbles;
increaseSpeed = 5;

bubbleX = 0;
bubbleY = 0;
bubbleR = 70;
bubbleShrinkR = 20;

playAreaX1 = 0;
playAreaX2 = 0;

playAreaY1 = 0;
playAreaY2 = 0;

score = 0;
expectedScore = 0;

second = 0;
minute = 0;

function setSpeed() {
  if (currentDifficulty == "Medium") speedOfBubbles = mediumSpeedOfBubbles;
  else if (currentDifficulty == "Easy") speedOfBubbles = easySpeedOfBubbles;
  else speedOfBubbles = hardSpeedOfBubbles;
}

function startTest() {
  // set speed
  setSpeed();

  // play start audio
  gameStartAudio.play();

  // switch screens
  $("#startScreen").fadeOut(1000);
  $("#playScreen").fadeIn(1000, function () {
    // time operation
    timeInterval = setInterval(refreshTimer, 1000);
  });
  $("#playScreen").css("display", "flex");

  //arrange start button css properties
  $("#startButton").css({
    "border-radius": "50%",
    width: "125px",
    height: "125px",
    transform: "translate(0%, -25%) rotate(-10deg)",
    border: "5px solid black",
    "box-shadow": "0px 0px 50px red, 0px 0px 100px violet",
  });

  // get play area screen size
  playAreaX1 = parseInt($("#playArea").position().left);
  playAreaX2 = playAreaX1 + parseInt($("#playArea").css("width"));
  playAreaY1 =
    parseInt($("#playArea").position().top) +
    parseInt($("#playArea").css("margin-top"));
  playAreaY2 = playAreaY1 + parseInt($("#playArea").css("height"));

  // start to display bubbles
  displayBubblesTimeOut = setTimeout(displayBubbles, speedOfBubbles);
}

function getRandomPosition() {
  // variable = Math.floor(Math.random() * (max + 1 - min)) + min;
  bubbleX =
    Math.floor(
      Math.random() * (playAreaX2 - bubbleR + 1 - (playAreaX1 + bubbleR))
    ) +
    (playAreaX1 + bubbleR);

  bubbleY =
    Math.floor(
      Math.random() * (playAreaY2 - bubbleR + 1 - (playAreaY1 + bubbleR))
    ) +
    (playAreaY1 + bubbleR);
}

function playRandomBubbleSound() {
  let n = Math.floor(Math.random() * 3);
  console.log(n);
  if (n == 0) bubbleAudio1.play();
  else if (n == 1) bubbleAudio2.play();
  else if (n == 2) bubbleAudio3.play();
}

function clickEventOfBubble() {
  $("#bubble").unbind("click");
  $("#bubble").bind("click", () => {
    playRandomBubbleSound();
    score++;
    console.log("Score: " + score);
    // remove bubble when clicked
    $("#bubble").remove();

    // refresh score
    $("#scoreDiv").html(score);
  });
}

function initializeToNewGame() {
  // clear interval
  clearInterval(timeInterval);

  // set time
  second = 0;
  minute = 0;

  // set score
  score = 0;
  expectedScore = 0;

  // clear last bubble in play area
  $("#bubble").remove();
}

function refreshEndGameInformations() {
  $("#startScreenDifficulty").html(`Difficulty: ${currentDifficulty}`);
  $("#startScreenTime").html(`Time: ${minute}.${second}`);
  $("#startScreenScore").text(`Score: ${score}`);
  setTimeout(function () {
    $("#scoreDiv").html("0");
    $("#timeDiv").html("0.0");
  }, 1500);
}

function finishGame() {
  // play game over audio
  gameOverAudio2.play();

  // refresh end game information
  refreshEndGameInformations();

  // refresh start button
  $("#startButton").css({
    "box-shadow": "none",
    "text-shadow": "5px 5px 2px rgb(102, 255, 0)",
    border: "2px solid black",
    width: "150px",
    height: "50px",
    "background-color": "rgb(102, 255, 0)",
    color: "black",
    "border-radius": "5px",
    transform: "none",
  });

  // make visible end game information
  $("#startInformationContainer").css("display", "flex");

  // change screen
  $("#playScreen").fadeOut(1000);
  $("#startScreen").fadeIn(1000);

  initializeToNewGame();

  console.log("expected: ", expectedScore, "\nscore: ", score);
}

function checkScore() {
  if (expectedScore > score) {
    finishGame();
    return false;
  }
  expectedScore++;
  return true;
}

function changeBubbleColor() {
  let r = Math.floor(Math.random() * 56) + 200;
  let g = Math.floor(Math.random() * 56) + 200;
  let b = Math.floor(Math.random() * 56) + 200;

  $("#bubble").css("background-color", `rgb(${r},${g},${b})`);
}

function placeBubble() {
  $("#bubble").remove();

  $("#playArea").append(
    `<div id="bubble" style=" left: ${bubbleX}px; top:${bubbleY}px; width:${bubbleR}px; height:${bubbleR}px;"></div>`
  );

  // change bubble color
  changeBubbleColor();
}

function shrinkBubble() {
  $("#bubble").animate(
    { width: bubbleShrinkR, height: bubbleShrinkR },
    speedOfBubbles
  );
}

function refreshTimer() {
  second++;
  $("#timeDiv").html(`${minute}.${second}`);

  if (second == 59) {
    second = 0;
    minute++;
  }
}

function displayBubbles() {
  // check the score
  if (checkScore()) {
    // get random position for bubble
    getRandomPosition();

    //place bubble to screen
    placeBubble();

    // shrink animation for bubbles
    shrinkBubble();

    // start click event
    clickEventOfBubble();

    // increase speed and continue with next round
    speedOfBubbles -= increaseSpeed;
    displayBubblesTimeOut = setTimeout(displayBubbles, speedOfBubbles);
  }
}

// var start = new Date();
// setTimeout(function asdf() {
//   var finish = new Date();
//   console.log(
//     String(finish - start) +
//       "  " +
//       String(finish.getMilliseconds() - start.getMilliseconds()) +
//       " " +
//       String(finish.getSeconds() - start.getSeconds()) +
//       " " +
//       String(finish.getMinutes() - start.getMinutes())
//   );
// }, 1000);
