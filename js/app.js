window.onload = init;

HTMLtarget = document.getElementById('target');
HTMLscore = document.getElementById('score');
HTMLfault = document.getElementById('fault');
HTMLscorePlus = document.getElementById('scorePlus');
HTMLfaultPlus = document.getElementById('faultPlus');
HTMLtime = document.getElementById('time');
HTMLdifficulty = document.getElementById('diff');
HTMLlevels = document.getElementById('levels-bar');
HTMLranks = document.getElementsByClassName('rank-role')

// Initial Score / Fault
var score = 0,
    fault = 0;

var topScore = 25;

// Power to increase number of blocks
var powerBy = 2;

// Default Dimensions (width,height) which later change
var defDimen = 150;

// To define that blocks count needs to increase every 2 times (after 3 times in the beginning)
var blocksIncrease = 4;

// Default timer duration (Changes depending on difficulty)
var timer = 800;

// Time until clearInterval
var newTime = 15;

// Controller for color generating
var genCon = Math.floor(Math.random() * (0, 30));

// How much to add to trans variable (for transparecny)
var multipliColorBy = [0.15, 0.085, 0.06, 0.05, 0.04];

// Initial - Incrementing difficulty in init() function
var difInc = 0;

// Initial - Difficulty is depending on the value of multipliColorBy
var difficulty = multipliColorBy[difInc];

// Value used to increase width of progress bar
var levelIncrease = 100/topScore;

/**
 * 30 static colors to be generated.
 * Only rgb is being used, names are for my referrence.
 * Source: http://www.tayloredmktg.com/rgb/#OR
 */
var shadesToGenerate = [
  { name: 'Hot Pink', rgb: '255,105,180'},
  { name: 'Medium Aquamarine', rgb: '102,205,170'},
  { name: 'Medium Slate Blue', rgb: '123,104,238'},
  { name: 'Peach Puff 3', rgb: '205,175,149'},
  { name: 'Slate Gray', rgb: '112,138,144'},
  { name: 'Forest Green', rgb: '34,139,34'},
  { name: 'Dark Salmon', rgb: '233,150,122'},
  { name: 'Red', rgb: '255,0,0'},
  { name: 'Medium Orchid', rgb: '186,85,211'},
  { name: 'Orange Red', rgb: '255,69,0'},
  { name: 'Indian Red', rgb: '205,92,92'},
  { name: 'Dark Goldenrod', rgb: '184,134,11'},
  { name: 'Light Sea Green', rgb: '32,178,170'},
  { name: 'Cadet Blue', rgb: '95,158,160'},
  { name: 'Deep Sky Blue', rgb: '0,191,255'},
  { name: 'Dark Slate Gray', rgb: '49,79,79'},
  { name: 'Honeydew 4', rgb: '131,139,131'},
  { name: 'Misty Rose', rgb: '255,228,225'},
  { name: 'Dark Olive Green', rgb: '85,107,47'},
  { name: 'Green Yellow', rgb: '173,255,47'},
  { name: 'Forest Green', rgb: '34,139,34'},
  { name: 'Dark Khaki', rgb: '189,183,107'},
  { name: 'Tomato', rgb: '255,99,71'},
  { name: 'Saddle Brown', rgb: '139,69,19'},
  { name: 'Peru', rgb: '205,133,63'},
  { name: 'Sandy Brown', rgb: '244,164,96'},
  { name: 'Tan', rgb: '210,180,140'},
  { name: 'Firebrick', rgb: '178,34,34'},
  { name: 'Brown', rgb: '165,42,42'},
  { name: 'Goldenrod', rgb: '218,165,32'},
];

//  Return difficulty in text
function showDifficulty(){
  switch(difficulty){
    case 0.15: return 'WARM UP';
    case 0.085: return 'EASY';
    case 0.06: return 'MEDIUM';
    case 0.05: return 'HARD';
    case 0.04: return 'HARDCORE!';
  }
}

// Generate a new shade
function newShade(){
  
  /**
   * It turned out that generating static colors works better than using
   * old method by generating colors randomly.
   */

  /**
   * OLD METHOD
   * let a = Math.floor(Math.random() * 100);
   */
  
  // Array to store two newly generated colors
  shadesToUse = [];
  let trans = 0.5;
  let x = 0;

  while(x < 2){
    
    /**
     * OLD METHOD:
     * let r = Math.floor((255 * a) / 100);
     * let g = Math.floor((255 * (100 - a)) / 100);
     * let b = Math.floor((255 * a) / 100);
     * let finalRGB = `rgb(${r}, ${g}, ${b}, ${trans})`;
     */

    let finalRGB = `rgb(${shadesToGenerate[genCon].rgb},${trans})`;
    shadesToUse.push(finalRGB);
    trans = trans + difficulty;
    x++;
  }

  // Temporary value
  tempGenCon = Math.floor(Math.random() * (0, 30));

  // console.log(`
  //   tempGenCon: ${tempGenCon}\n
  //   genCon: ${genCon}\n
  //   name: ${shadesToGenerate[genCon].name}\n
  //   rgb: ${shadesToGenerate[genCon].rgb}
  // `);

  // Measure to prevent generating the same color twice
  if(tempGenCon != genCon)
    genCon = tempGenCon;

  else
    newShade();
}
  
  // Run the countdown
  function countDown(){
    HTMLtime.innerHTML = `<span class="timeLeft">${newTime}</span>`;
    newInt = setInterval(() => {
      if(newTime > 5){
        HTMLtime.style.border = '2px solid #26a65b';
        HTMLtime.style.color = '#26a65b';
      }
  
      if(newTime < 7){
        HTMLtime.style.border = '2px dotted #e74c3c';
        HTMLtime.style.color = '#e74c3c';
      }
      
      if(newTime < 1){
        clearInterval(newInt);
        HTMLtarget.innerHTML = `<h1 style="color: red;">GAME OVER!</h1>`;
      }

      else {
        newTime--;
        HTMLtime.innerHTML = `<span class="timeLeft">${newTime}</span>`;
      }

    }, timer);
  }

  

  // Decide whether clicked on special or not
  function decide(id){
    if(id == special){
      score++;

      // Increasing width of progress bar
      HTMLlevels.style.width = `${levelIncrease}%`;
      levelIncrease += 100/topScore;

      HTMLscorePlus.style.opacity = '1';
      HTMLscorePlus.style.transform = 'translate(15px)';
      setTimeout(function(){
        HTMLscorePlus.style.opacity = '0';
        HTMLscorePlus.style.transform = 'translate(-15px)';
      }, 400);

      if (score == topScore){
        clearInterval(newInt);
        HTMLranks[difInc].style.color = '#e74c3c';
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
      
      HTMLfaultPlus.style.opacity = '1';
      HTMLfaultPlus.style.transform = 'translate(15px)';
      setTimeout(function(){
        HTMLfaultPlus.style.opacity = '0';
        HTMLfaultPlus.style.transform = 'translate(-15px)';
      }, 400);

      if (fault == 5){
        HTMLtarget.innerHTML = `<h1 style="color: red;">You failed too many times!</h1>`;

        HTMLscore.innerHTML = `<h4>Score: <span class="score-fault-output">${score}</span>/25</h4>`;
        HTMLfault.innerHTML = `<h4>Fault: <span class="score-fault-output">${fault}</span>/5</h4>`;
        return;
      }
      
      if(newTime == 1) newTime -= 1;
      if(newTime > 1) newTime -= 2;

      countDown();
    }
    
    HTMLscore.innerHTML = `<h4>Score: <span class="score-fault-output">${score}</span>/25</h4>`;
    HTMLfault.innerHTML = `<h4>Fault: <span class="score-fault-output">${fault}</span>/5</h4>`;
  }
  
  function init(){
    if(difInc > 0)
      HTMLranks[difInc-1].style.color = '#e74c3c';

    HTMLscore.innerHTML = `<h4>Score: <span class="score-fault-output">${score}</span>/25</h4>`;
    HTMLfault.innerHTML = `<h4>Fault: <span class="score-fault-output">${fault}</span>/5</h4>`;
    HTMLdifficulty.innerHTML = showDifficulty();

    // Start timer
    countDown();

    // Get amount of blocks depending on powerBy
    let blocksCount = Math.pow(powerBy, 2);

    if(score == blocksIncrease && powerBy < 6){
        blocksIncrease += 5;
        powerBy++ && difInc++;
        difficulty = multipliColorBy[difInc];
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
        arr.push({ id: x, color: shadesToUse[0] });

      else
        arr.push({ id: x, color: shadesToUse[1] });

      output += `<li><div class="block" onclick=decide(this.id) id="${x}"></div></li>`;

    }

    // Change width of a block depending on blocksCount
    switch(blocksCount){
      case 4: defDimen = '150px'; break;
      case 9: defDimen = '100px'; break;
      case 16: defDimen = '80px';  break;
      case 25: defDimen = '70px'; break;
      case 36: defDimen = '60px'; break;
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