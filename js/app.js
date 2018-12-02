window.onload = init;

HTMLtarget = document.getElementById('target');
HTMLhistory = document.getElementById('history');
HTMLscore = document.getElementById('score');
HTMLfault = document.getElementById('fault');
HTMLscorePlus = document.getElementById('scorePlus');
HTMLfaultPlus = document.getElementById('faultPlus');
HTMLtime = document.getElementById('time');
HTMLdifficulty = document.getElementById('diff');
HTMLlevels = document.getElementById('levels-bar');
HTMLranks = document.getElementsByClassName('rank-role')
HTMLscoreHistory = document.getElementById('score-history');
HTMLquotes = document.getElementById('quotes');
HTMLquestion = document.getElementById('question');
HTMLstartButton = document.getElementById('start-button');
HTMLclearHistory = document.getElementById('clear-history');

function init(){

  // Initial Score / Fault
  score = 0, fault = 0;

  topScore = 25;

  // Power to increase number of blocks
  powerBy = 2;

  // Default Dimensions (width,height) which later change
  defDimen = 150;

  // To define that blocks count needs to increase every 5 times (if clicked special)
  blocksIncrease = 4;

  // Default timer duration
  timer = 800;

  // Time until clearInterval
  newTime = 15;

  // Controller for color generating
  genCon = Math.floor(Math.random() * (0, 30));

  // How much to add to trans variable (for transparecny)
  multipliColorBy = [0.15, 0.085, 0.06, 0.05, 0.04];

  // Initial - Incrementing difficulty in init() function
  difInc = 0;

  // Initial - Difficulty is depending on the value of multipliColorBy
  difficulty = multipliColorBy[difInc];

  // Value used to increase width of progress bar
  levelIncrease = 100/topScore;

  // To store gaming data in local storage
  historyData = {};

  /**
   * 30 static colors to be generated.
   * Only rgb is being used, names are for my referrence.
   * Source: http://www.tayloredmktg.com/rgb/#OR
   */
  shadesToGenerate = [
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
    { name: 'Lime Green', rgb: '50,205,50'},
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

  // Quotes to print randomly
  quotes = [
    { text: 'Failure will never overtake me if my determination to succeed is strong enough', by: 'Og Mandino' },
    { text: 'Failure is the key to success; each mistake teaches us something.', by: 'Morihei Ueshiba' },
    { text: 'Success consists of going from failure to failure without loss of enthusiasm.', by: 'Winston Churchill' },
    { text: 'Without failure there is no achievement.', by: 'John C. Maxwell' },
    { text: 'You have to be able to accept failure to get better.', by: 'LeBron James' },
    { text: 'If you want to increase your success rate, double your failure rate.', by: 'Thomas J. Watson' },
    { text: 'If things are not failing, you are not innovating enough.', by: 'Elon Musk' },
  ]

  if(localStorage.getItem('history') === null)
  localStorage.setItem('history', '[]');
}

// On click Start button
HTMLstartButton.addEventListener('click', function(){
  this.style.display = 'none';
  HTMLhistory.style.display = 'none';
  HTMLtarget.style.display = 'block';
  HTMLlevels.style.width = '0px';
  for(let x=4 ; x>=0 ; x--)
    HTMLranks[x].style.color = '#000000';
  
  init();
  start();
});

// On click Clear History button
HTMLclearHistory.addEventListener('click', function(){
  let hold = JSON.parse(localStorage.getItem('history'));
  hold = [];
  localStorage.setItem('history', JSON.stringify(hold));
  location.reload();
});

function getRankRole(){
  if(difInc == 0)
    return 'lil baby';

  if(difInc > 0)
    return HTMLranks[difInc-1].innerHTML;

  if(score == topScore)
    return 'hawk';
}

// Get current date
function getDate(){
  let date = new Date();
  let d = date.getDate();
  let m = date.getMonth();
  let y = date.getFullYear();

  return `${d}.${m+1}.${y}`;
}

// Store relevant history data
function storeHistory(){
  historyData = {
    "score": score,
    "fault": fault,
    "rank": getRankRole(),
    "date": getDate()
  };

  showHistory(historyData);
}

function showHistory(data){
  HTMLstartButton.style.display = 'block';
  HTMLtarget.style.display = 'none';
  HTMLhistory.style.display = 'block';

  // Load score history
  let storeHistory = JSON.parse(localStorage.getItem('history'));
  storeHistory.unshift(data);
  
  // If 5 records already exist, remove the last one
  if(storeHistory.length > 5)
    storeHistory.pop();
  
  localStorage.setItem('history', JSON.stringify(storeHistory));
  
  var historyOutput = '';
  for(let hC=0 ; hC<storeHistory.length ; hC++){
    historyOutput += `
    <tr>
    <td>${hC+1}</td>
    <td>${JSON.parse(localStorage.getItem('history'))[hC].date}</td>
    <td>${JSON.parse(localStorage.getItem('history'))[hC].score}</td>
    <td>${JSON.parse(localStorage.getItem('history'))[hC].fault}</td>
    <td>${JSON.parse(localStorage.getItem('history'))[hC].rank}</td>
    </tr>
    `;
  }

  // Finally print history table
  HTMLscoreHistory.innerHTML = `
    <tr><th>#</th><th>Date</th><th>Score</th><th>Fault</th><th>Sight as good as</th></tr>
    ${historyOutput}
  `;

  // Show quote
  let output = Math.floor(Math.random() * 7);
  HTMLquotes.innerHTML = `<p>${quotes[output].text}</p><p>&mdash; ${quotes[output].by}</p>`;
}

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
      if(newTime < 7){
        HTMLtime.style.border = '2px dotted #e74c3c';
        HTMLtime.style.color = '#e74c3c';
      }
      
      if(newTime < 1){
        clearInterval(newInt);

        // Store data to historyData array
        storeHistory();
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

      // Animating +1
      HTMLscorePlus.style.opacity = '1';
      HTMLscorePlus.style.transform = 'translate(15px)';
      setTimeout(function(){
        HTMLscorePlus.style.opacity = '0';
        HTMLscorePlus.style.transform = 'translate(-15px)';
      }, 400);

      if (score == topScore){
        console.log(`
          score: ${score}
          fault: ${fault}
        `);
        HTMLscore.innerHTML = `<h4>Score: <span class="score-fault-output">${score}</span>/25</h4>`;
        HTMLfault.innerHTML = `<h4>Fault: <span class="score-fault-output">${fault}</span>/5</h4>`;
        
        clearInterval(newInt);
        HTMLranks[difInc].style.color = '#e74c3c';

        // Store data to historyData array
        storeHistory();
      }
      
      else {
        clearInterval(newInt);
        if(newTime == 14) newTime += 1;
        if(newTime < 14) newTime += 2;
        start();
      }
    }

    else {
      fault++;
      clearInterval(newInt);
      
      // Animating +1
      HTMLfaultPlus.style.opacity = '1';
      HTMLfaultPlus.style.transform = 'translate(15px)';
      setTimeout(function(){
        HTMLfaultPlus.style.opacity = '0';
        HTMLfaultPlus.style.transform = 'translate(-15px)';
      }, 400);

      if (fault == 5){
        HTMLscore.innerHTML = `<h4>Score: <span class="score-fault-output">${score}</span>/25</h4>`;
        HTMLfault.innerHTML = `<h4>Fault: <span class="score-fault-output">${fault}</span>/5</h4>`;
        clearInterval(newInt);
        
        // Store data to historyData array
        storeHistory();
        return;
      }
      
      if(newTime == 1) newTime -= 1;
      if(newTime > 1) newTime -= 2;

      countDown();
    }
    
    HTMLscore.innerHTML = `<h4>Score: <span class="score-fault-output">${score}</span>/25</h4>`;
    HTMLfault.innerHTML = `<h4>Fault: <span class="score-fault-output">${fault}</span>/5</h4>`;
  }
  
  function start(){
    if(newTime > 5){
      HTMLtime.style.border = '2px solid #26a65b';
      HTMLtime.style.color = '#26a65b';
    }

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
        difficulty = multipliColorBy[0];
        // timer -= 25;
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