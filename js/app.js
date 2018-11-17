window.onload = init;

HTMLtarget = document.getElementById('target');
HTMLscore = document.getElementById('score');
HTMLtime = document.getElementById('time');
HTMLdifficulty = document.getElementById('diff');

// Initial Score / Fault
var score = 0,
    fault = 0;

// Power to increase number of blocks
var powerBy = 2;

// Default Dimensions (width,height) which later change
var defDimen = 150;

// To define that blocks count needs to increase every 2 times (after 3 times in the beginning)
var blocksIncrease = 2;

// Default timer duration (Changes depending on difficulty)
var timer = 800;

// Time until clearInterval
var newTime = 15;

// Difficulty - how much to add to trans variable (for transparecny)
var multipliColorBy = 0.1;

//  Return difficulty in text
function difficulty(){
  switch(multipliColorBy){
    case 0.1: return 'Difficulty: Eazzy';
    case 0.065: return 'Difficulty: Medium';
    case 0.04: return 'Difficulty: Difficult';
    case 0.03: return 'Difficulty: Hardcore!';
  }
}

// Generate a new shade
function newShade(){
  
  let a = Math.floor(Math.random() * 100);  // between 0 - 100
  
  // Array to store two newly generated colors
  shades = [];
  let trans = 0.5;
  let x = 0;

  while(x < 2){
    
    let r = Math.floor((255 * a) / 100);  
    let g = Math.floor((255 * (100 - a)) / 100);
    let b = Math.floor((255 * a) / 100);

    let finalRGB = `rgb(${r}, ${g}, ${b}, ${trans})`;
    shades.push(finalRGB);
    trans = trans + multipliColorBy;

    x++;

  }
      
}
  
  // Run the countdown (pass id to decide function)
  function countDown(){
    HTMLtime.innerHTML = `<span class="timeLeft">Time left: ${newTime}</span>`;
    newInt = setInterval(() => {
      newTime--;
      HTMLtime.innerHTML = `<span class="timeLeft">Time left: ${newTime}</span>`;

      if(newTime < 1){
        clearInterval(newInt);
        HTMLtarget.innerHTML = `<h1 style="color: red;">GAME OVER!</h1>`;
      }

    }, timer);
  }
  
  // Decide whether clicked on special or not and more...
  function decide(id){

    if(id == special){
      score++;

      if (score == 5){
        clearInterval(newInt);
        HTMLtarget.innerHTML = `<h1 style="color: red;">You Won!</h1>`;
      }
      
      else {
        clearInterval(newInt);
        if(newTime == 14) newTime += 1;
        if(newTime < 14) newTime += 2;
        init();
      }

    }

    else {
      fault++;
      clearInterval(newInt);

      if (fault == 5){
        HTMLtarget.innerHTML = `<h1 style="color: red;">You failed too many times!</h1>`;
        return;
      }

      if(newTime == 1) newTime -= 1;
      if(newTime > 1) newTime -= 2;

      countDown();
    }

    HTMLscore.innerHTML = `<h4>Score: <span>${score}</span></h4><h4>Fault: <span>${fault}</span></h4>`;
  }
  
  function init(){

    HTMLscore.innerHTML = `<h4>Score: <span>${score}</span></h4><h4>Fault: <span>${fault}</span></h4>`;
    HTMLdifficulty.innerHTML = difficulty();

    // Start timer
    countDown();

    // Get amount of blocks depending on powerBy
    let blocksCount = Math.pow(powerBy, 2);

    if(score > blocksIncrease && powerBy < 5){
        blocksIncrease = blocksIncrease + 2; 
        powerBy++;
    }

    // Generate a new shade each time the correct shade is clicked
    newShade();

    let arr = [];

    let output = '';

    // Generating special var each round (after clicking listItem / after reloading page)
    special = Math.floor(Math.random() * blocksCount);

    // Filling arr with objects and saving listItems to output
    for(let x=0 ; x<blocksCount ; x++){

      if(x == special)
        arr.push({ id: x, color: shades[0] });

      else
        arr.push({ id: x, color: shades[1] });

      output += `<li><div class="block" onclick=decide(this.id) id="${x}"></div></li>`;

    }

    // Change width of a block depending on blocksCount
    switch(blocksCount){
      case 4: defDimen = '150px'; break;
      case 9: defDimen = '100px'; break;
      case 16: defDimen = '80px';  break;
      case 25: defDimen = '70px'; break;
    }

    // Output actual blocks
    HTMLtarget.innerHTML = output;

    // Change width of all blocks displayed depending on switch results above
    for(let idNum=0 ; idNum<arr.length ; idNum++){
      document.getElementById(idNum).style.width = defDimen;
      document.getElementById(idNum).style.height = defDimen;
    }

    // Finally, giving background colors to divs
    for(let y=0 ; y<arr.length ; y++)
      document.getElementById(arr[y].id).style.backgroundColor = arr[y].color;
  }