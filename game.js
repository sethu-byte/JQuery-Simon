var buttonColours =["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
 
function nextSequence() {
    level=level+1;
    var randomNumber = Math.floor(Math.random() * 4);


   var randomChosenColour=buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);
   $("#"+randomChosenColour).fadeOut(100).fadeIn(100);

   var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
   audio.play();
   console.log("game pattern: "+gamePattern)
};



$(".btn").click(function () { 
    userChosenColour =this.id;
    console.log(userChosenColour);
    userClickedPattern.push(this.id);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}

 function animatePress(currentColour) {

    $('#'+currentColour).addClass("pressed"); 

    setTimeout(function() {
        $('#'+currentColour).removeClass("pressed");
    }, 100); 

}



$("body").keydown(function(){
   if(gamePattern.length==0){
    nextSequence();}
    $("h1").html("level "+level);
    
  });
function startover(){
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
       $("body").removeClass("game-over");
   }, 200);
   gamePattern=[];
   userClickedPattern=[];
   level=0;
   $("h1").text("Game Over, Press Any Key to Restart");
}
function checkAnswer(currentlevel){
   

        if(userChosenColour===gamePattern[currentlevel]){
            console.log("success")
            if(gamePattern.length==userClickedPattern.length){
                setTimeout(function() {
                    nextSequence();
                    userClickedPattern = [];
                    $("h1").html("level "+level);
                }, 1000); 
            }
        }else{
            console.log("wrong")
           startover();
        }
        

}