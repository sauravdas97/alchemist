var colors=generateRandomColors(6);
var sqr = document.querySelectorAll(".square");
var colorDisplay=document.querySelector("#rgb");
var messageDisplay=document.querySelector("#message"); // IDEA: this is useds to give out a message to convey if it was wrong or right
var pickedColor=random_clr();
var h1=document.querySelector("h1"); // IDEA: this is to change the background color when the user selects the correct color
var playAgain = document.querySelector("#reset");
var easy=document.querySelector("#easybtn");
var hard=document.querySelector("#hardbtn");

colorDisplay.textContent=pickedColor;

// IDEA: easy button
easy.addEventListener("click", function(){
   easy.classList.add("selected");
   hard.classList.remove("selected");
   colors=generateRandomColors(3);
   pickedColor=random_clr();
   colorDisplay.textContent=pickedColor;
   for(var i=0; i<sqr.length; i++){
     if(colors[i]){
       sqr[i].style.background=colors[i];
     }else{
       sqr[i].style.display="none"; // IDEA: this hides the last 3 blocks
     }
   }
})

// IDEA: hard button
hard.addEventListener("click", function(){
   hard.classList.add("selected");
   easy.classList.remove("selected");
   colors=generateRandomColors(6);
   pickedColor=random_clr();
   colorDisplay.textContent=pickedColor;
   for(var i=0; i<sqr.length; i++){
       sqr[i].style.background=colors[i];
       sqr[i].style.display="block"; // IDEA: this shows all the blocks
     }
})

// IDEA: playAgain button
playAgain.addEventListener("click",function(){
  messageDisplay.textContent=""; // IDEA: so that when the play button is clicked the message display goes back to an empth string;
  colors =generateRandomColors(6);
  for(var i=0; i<sqr.length; i++)
  {
    sqr[i].style.background=colors[i];
  }
  pickedColor=random_clr();
  colorDisplay.textContent=pickedColor;
  h1.style.background="steelblue";
})
for(var i=0; i<sqr.length; i++)
{
  sqr[i].style.background=colors[i]; // IDEA: assigning all the colors to the squares from the array

  // adding click listener
  sqr[i].addEventListener("click",function(){
    var clickedColor = this.style.background; // IDEA: this keyword helps to select the color that the user has clicked on and style.background selects the background color
    if(clickedColor === pickedColor){
      messageDisplay.textContent="Correct";
// IDEA: this for loop will iterate through all the blocks and change all the colors of all the blocks of the statement clicked color is true
      for(var i=0; i<sqr.length; i++)
      {
        sqr[i].style.background = clickedColor;
      }
      h1.style.background = clickedColor;
    }
    else{
      this.style.background="#232323"; // IDEA: again we are usng this keyword to select the color block that is clicked by the user
      messageDisplay.textContent="Try Again";
    }
  })
}

// IDEA: this function returns a random color to the variable pickedColor
function random_clr()
{
  var n;
  n =Math.random() * colors.length; // IDEA: returns a number between 0 and 5.999
  var random=Math.floor(n);
  return colors[random];
}

// IDEA: here we create the generateRandomColors() function and pass values
function generateRandomColors(n)
{
  var arr=[];
  for(var i=0; i<n; i++)
  {
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    arr.push("rgb("+r+", "+g+", "+b+")");
  }
  return arr;
}
