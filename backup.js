  
  HTMLtarget = document.getElementById('target');
  HTMLscore = document.getElementById('score');
  HTMLtime = document.getElementById('time');

  score = 0;
  fault = 0;
  powerBy = 2;
  blocksIncrease = 2;
  timer = 750;
  
  // Generate a new shade
  function newShade(){

    multipliColorBy = 2;  // Difficulty

    let a = Math.floor(Math.random() * 100);

    shades = [];

    let x = 0;

    while(x < 2){
      
      let r = Math.floor((255 * a) / 100);  
      let g = Math.floor((255 * (100 - a)) / 100);
      let b = Math.floor((255 * a) / 100);

      a = a + multipliColorBy;

      let finalRGB = `rgb(${r}, ${g}, ${b})`;

      shades.push(finalRGB);

      x++;

    }

  }

  function countDown(){

    // Countdown
    let newTime = 15;

    HTMLtime.innerHTML = newTime;

    newInt = setInterval(() => {

      newTime--;

      HTMLtime.innerHTML = newTime;

      if(newTime < 0){

        clearInterval(newInt);

        HTMLtarget.style.display = 'none';

        HTMLtime.innerHTML = 'FINISH!';

      }

    }, timer);

  }

  function start(){

    // Countdown
    countDown();
    
    // Increasing amount of blocks
    let blocksCount = Math.pow(powerBy, 2);

    if(score > blocksIncrease && powerBy < 6){

        blocksIncrease = blocksIncrease + 2;

        powerBy++;

    }
    console.log(blocksIncrease);

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

      output += `<li>
                  <div onclick=decide(this.id) id="${x}">
                  ${x+1}
                  </div>
                </li>`;

    }

    HTMLtarget.innerHTML = output;

    // Giving background colors to divs
    for(let y=0 ; y<arr.length ; y++)

      document.getElementById(arr[y].id).style.backgroundColor = arr[y].color;

  }

  function decide(id){

    if(id == special){

      clearInterval(newInt);

      if(score == 20){

        console.log('You are a hawk!');

        return;

      }

      score++;
      
      start();

    }

    else fault++;

    HTMLscore.innerHTML = `<h4>Score: ${score}</h4><h4>Fault: ${fault}</h4>`;

  }

  HTMLscore.innerHTML = `<h4>Score: ${score}</h4><h4>Fault: ${fault}</h4>`;
  
  window.onload = start;