
//Button Colour Array
var buttonColours = ["red", "blue", "green", "yellow"];
//Log of Randomly generated Button Colours
var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

//Listens to key presses and if keypress is true then the game started is set to true.
//game will then change level to level 1
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//Button Click Function
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

playSound(userChosenColour);

animatePress(userChosenColour);

checkAnswer(userClickedPattern.length-1);
  });

//Checks the key press to the game choice and either proceeds or fails.
  function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function() {
          nextSequence();
        }, 1000);
      }

  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
    }
  }

//--------------//

function nextSequence() {

  userClickedPattern = [];

  level++;  //this increases the level number each time the nextSequence() is called.
  $("#level-title").text("Level " + level);

/*Generates random number, selects random colour from array
with random number and pushes it to gamePattern.*/
  var randomNumber =  Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
/*takes newly randomly selected button colour
 and animates it while playing the corresponding MP3*/
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);


}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}


function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
