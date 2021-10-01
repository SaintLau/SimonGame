let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

//jQuery to detect when keyboard is pressed:
$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//for when a button is clicked
$("btn").click(function() {
    let userChosenColour = $(this).attr("id"); //-> to store the id that was clicked
    userClickedPattern.push(userChosenColour);
   
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //call after user clicked and chosen answer:
    checkAnswer(userClickedPattern.length-1);
});

//check the user answer:
function checkAnswer(currentLevel) {
    //if-statement to check recent answer
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("sucess");

    if (userClickedPattern.length === gamePattern.length) {
        //call nextSequence after delay
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
    } else {
        console.log("wrong");
        playSound("wrong");
        //add the css for game over 
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        //change title to Game over 
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver(); //-> to restart
    }
}


function nextSequence() {
    //nextSequence is trigger:
    userClickedPattern = [];

    //everytime nextSequence is called, increase 1 level:
    level++;

    //update the h1 according to the level:
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
   
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //-> to animate the button

    //attribute sound to each button
    playSound(randomChosenColour);
    
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() { //-> to remove the effect
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}