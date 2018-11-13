  // Initial Score / Fault
  let score = 0,
      fault = 0;

  // Power to increase number of blocks
  let powerBy = 2;

  // Default Dimensions (width,height) which later change
  let defDimen = 150;

  // To define that blocks count needs to increase every 2 times (after 3 times in the beginning)
  let blocksIncrease = 2;
  
  // Default timer duration (Changes depending on difficulty)
  let timer = 850;

  // Time until timeout
  let newTime = 15;
  
  // Difficulty
  let multipliColorBy = 0.10;

  // Initial score and faults in an object
  let results = {
    "score": 0,
    "fault": 0
  };


  HTMLtarget = document.getElementById('target');
  HTMLscore = document.getElementById('score');
  HTMLtime = document.getElementById('time');
  HTMLdifficulty = document.getElementById('diff');

  //  Return difficulty in text
  function difficulty(){

    if(multipliColorBy == 0.04) return 'Hardcore';
    if(multipliColorBy == 0.065) return 'Medium';
    if(multipliColorBy == 0.10) return 'Eazzy';
    else return 'Not defined';

}

  // Generate a new shade
  function newShade(){

    let a = Math.floor(Math.random() * 100);  // between 0 - 100

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

  // Run the countdown
  function countDown(){

    HTMLtime.innerHTML = newTime;

    newInt = setInterval(() => {

      newTime--;

      HTMLtime.innerHTML = `<span class="timeLeft">${newTime}</span>`;

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

      if (score == 15){

        clearInterval(newInt);

        results.score = score;
        results.fault = fault;

        console.log(results);

        HTMLtarget.innerHTML = `<h1 style="color: red;">You Won!</h1>`;

      }

      else {

        clearInterval(newInt);

        newTime = 15;

        start();

      }

    }

    else {

      fault++;

      if (fault == 5){

        clearInterval(newInt);

        results.score = score;
        results.fault = fault;

        console.log(results);

        HTMLtarget.innerHTML = `<h1 style="color: red;">You failed too many times!</h1>`;

      }

    }  

    HTMLscore.innerHTML = `<h4>Score: <span>${score}</span></h4><h4>Fault: <span>${fault}</span></h4>`;
  
  }

  function start(){

    // Start countdown
    countDown(); 

    // Increasing amount of blocks
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

      case 4:
        defDimen = '150px';
        break;

      case 9:
        defDimen = '100px';
        break;

      case 16:
        defDimen = '80px';
        break;

      case 25:
        defDimen = '70px';
        break;

    }

    // Output actual blocks
    HTMLtarget.innerHTML = output;

    // Change width of all blocks displayed depending on switch results above
    for(let idNum=0 ; idNum<arr.length ; idNum++){
      document.getElementById(idNum).style.width = defDimen;
      document.getElementById(idNum).style.height = defDimen;
    }

    // Giving background colors to divs
    for(let y=0 ; y<arr.length ; y++)
      document.getElementById(arr[y].id).style.backgroundColor = arr[y].color;
  }

  // Always display score
  HTMLscore.innerHTML = `<h4>Score: ${score}</h4><h4>Fault: ${fault}</h4>`;

  // Always display current difficulty
  HTMLdifficulty.innerHTML = difficulty();

  window.onload = start;