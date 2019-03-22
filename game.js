var buttonColors = ["red", "blue", "green", "yellow"];


var userClickedPattern = [];
var gamePattern = [];

var level = 0;
var started = false;

$(document).on('keypress', function (){
  if(!started){
    nextSequence();
    $("h1").html("Level " + level);
    started = true;
  }
});

$('.btn').on('click', function handler(event){

  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
  gamePattern.push(randomChosenColor);
}

function playSound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("correct");

    if(gamePattern.length === userClickedPattern.length){
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }

  }else{
    var gameOverSound = new Audio('sounds/wrong.mp3');
    gameOverSound.play();
    $("body").addClass("game-over");
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    console.log("wrong");
  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
