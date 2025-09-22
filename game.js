var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

function nextSequence() {

    userClickedPattern = [];
    
    level++;
    
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

}

function playSound(name) {

    let audio = new Audio("./sounds/" + name + ".mp3");

    audio.play();

}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");

    setTimeout(function() {

        $("#" + currentColour).removeClass("pressed");

    }, 100);

}

function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        console.log("Success");

        if (userClickedPattern.length === gamePattern.length) {
        
            setTimeout(function() {

                nextSequence();

            }, 1000);

        }

    }

    else {

        console.log("Wrong");

        playSound("wrong");
        startOver();

        $("body").addClass("game-over");

        setTimeout(function() {

            $("body").removeClass("game-over");

        }, 200);

        $("#level-title").text("Game Over, Press Any Key To Restart");

    }

}

function startOver() {

    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

}

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

});

$(document).keypress(function() {

    if (started == false) {

        $("#level-title").text("Level " + level);

        nextSequence();

        started = true;

    }

});