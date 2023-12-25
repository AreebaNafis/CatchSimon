
const buttonColours =["red", "blue", "green", "yellow"];
let gamePattern =[];


let userClickedPattern =[];
var level = 0;
var started = false;

//keycode for enter is 13
$(document).keypress(function(event){
    let keycode =(event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
        if(!started){
            // $("#level-title").text("Level "+ level);
            started=true;
            nextSequence();
        }  
        event. stopPropagation()
    }
   else{
    let character = String.fromCharCode(keycode);
    if( character=='q'|| character=='w'||character=='a'||character=='s'){
        if( character=='q'){
            chosenOption("green");
        }
        else if( character=='w'){
            chosenOption("yellow");
        }
        else if( character=='a'){
            chosenOption("red");
        }
        else{
            chosenOption("blue");
        }
        event. stopPropagation();
    }
    else{
        wrongOption();
        event. stopPropagation();
    }

   }

})

$(".btn").click(function(){
   if(started){
    chosenOption($(this).attr("id"));
   }
  });

  function chosenOption(userChosenColour){
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    // $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePressed(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    } 
    else{
       wrongOption();
    }   
  }

  function wrongOption(){
    playSound('wrong');
    // console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Enter to Restart");
    setTimeout(function(){
        startOver();
    },500);
  }


  function startOver(){
     level=0;
     userClickedPattern=[];
     gamePattern=[];
     started =false;
  }

function nextSequence(){
    userClickedPattern =[];
    level++;
    $("#level-title").text("Level " + level);

   var randomNumber = Math.floor((Math.random())*4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePressed(currentColour){
    $('#'+currentColour).addClass("pressed");
    setTimeout(function(){
        $('#'+currentColour).removeClass("pressed");
    },100);
}

function toggleHidden(){
    $(".instructions").toggleClass("hidden");
}

$(".instruc").click(toggleHidden);